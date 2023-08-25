// Import necessary modules
import cloudinary from '../constant/config.js';
import bookingModel from '../models/BookingModel.js';
import hostModel from '../models/HostModel.js';
import propertyModel from '../models/PropertyModel.js';
import WithdrawModel from '../models/WithdrawModel.js';

export default {
  // Add a new property to the database
  postAddProperty: async (req, res) => {
    try {
      const propertyDetails = req.body;
      let images = [];

      for (let item of propertyDetails.images) {
        const result = await cloudinary.uploader.upload(item, {
          folder: 'property'
        });
        images.push(result.url);
      }

      const newProperty = await propertyModel.create({
        structure: propertyDetails.structure,
        privacyType: propertyDetails.privacyType,
        location: propertyDetails.location,
        images,
        coordinates: {
          latitude: propertyDetails.coordinates[1],
          longitude: propertyDetails.coordinates[0],
        },
        address: {
          country: propertyDetails.address.country,
          city: propertyDetails.address.city,
          postCode: propertyDetails.address.postCode,
          region: propertyDetails.address.region,
          houseNumber: propertyDetails.address.houseNumber,
          area: propertyDetails.address.area,
          streetAddress: propertyDetails.address.streetAddress,
          landMark: propertyDetails.address.landMark,
        },
        floorPlan: propertyDetails.floorPlan.map((plan) => ({
          type: plan.type,
          count: plan.count,
        })),
        amenities: propertyDetails.amenities,
        minimumStay: propertyDetails.minimumStay,
        maximumStay: propertyDetails.maximumStay,
        availableDates: {
          startDate: propertyDetails.availability[0],
          endDate: propertyDetails.availability[1],
        },
        title: propertyDetails.title,
        description: propertyDetails.description,
        pricePerNight: propertyDetails.pricePerNight,
        hostId: propertyDetails.hostId,
      });

      res.json({ error: false, property: newProperty });
    } catch (error) {
      console.error("Error occurred while adding property:", error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  },

  // Update dates for all properties in the database
  setDates: async (req, res) => {
    try {
      const { startDate, endDate, minimumStay, maximumStay } = req.body;

      await propertyModel.updateMany({}, {
        $set: {
          startDate,
          endDate,
          minimumStay,
          maximumStay
        }
      });

      res.status(200).json({ success: true, message: 'Dates updated successfully' });
    } catch (error) {
      console.error('Error occurred during updating dates:', error);
      res.status(500).json({ success: false, message: 'Error occurred during updating dates' });
    }
  },
  // Get all properties associated with a specific host
  getProperties: async (req, res) => {
    try {
      const hostId = req.params.hostId;
      const properties = await propertyModel.find({ hostId: hostId });
      res.json({ properties });
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  },

  // Get property details based on propertyId
  getProperty: async (req, res) => {
    try {
      const propertyId = req.params.propertyId;
      const propertyDetails = await propertyModel.findOne({ _id: propertyId });
      res.json({ propertyDetails });
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  },

  // Update basic details (title, description, and status) of a property
  postPropertyEditBasics: async (req, res) => {
    try {
      const { propertyId, title, description, status } = req.body;
      await propertyModel.findByIdAndUpdate(propertyId, {
        title,
        description,
        status,
      });
      res.status(200).json({ success: true, message: 'Listing basics updated successfully' });
    } catch (error) {
      console.error('Error occurred during updating listing basics:', error);
      res.status(500).json({ success: false, message: 'Error occurred during updating listing basics' });
    }
  },

  // Update specific property fields (structure, floorPlan, privacyType)
  postPropertyEditProperty: async (req, res) => {
    try {
      const { propertyId, fieldName, fieldValue } = req.body;
      const allowedFields = ["structure", "floorPlan", "privacyType"];

      if (!allowedFields.includes(fieldName)) {
        return res.status(400).json({ success: false, message: 'Invalid field name' });
      }

      const updateData = { [fieldName]: fieldValue };
      const updatedProperty = await propertyModel.findByIdAndUpdate(propertyId, updateData, { new: true });

      if (!updatedProperty) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }

      res.status(200).json({ success: true, message: 'Field updated successfully', data: updatedProperty });
    } catch (error) {
      console.error('Error occurred during updating field:', error);
      res.status(500).json({ success: false, message: 'Error occurred during updating field' });
    }
  },
  // Update property price per night
  postPropertyEditPrice: async (req, res) => {
    try {
      const { propertyId, pricePerNight } = req.body;
      const updatedProperty = await propertyModel.findByIdAndUpdate(
        propertyId,
        { pricePerNight },
        { new: true }
      );

      if (!updatedProperty) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }

      res.status(200).json({ success: true, message: 'Price per night updated successfully', data: updatedProperty });
    } catch (error) {
      console.error('Error occurred during updating price per night:', error);
      res.status(500).json({ success: false, message: 'Error occurred during updating price per night' });
    }
  },

  // Get bookings by hostId
  getBookingByHostId: async (req, res) => {
    try {
      const { hostId } = req.params;
      const booking = await bookingModel.find({ hostId: hostId });
      res.json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update booking status
  updateBookingStatus: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { status } = req.body;
      const updatedBooking = await bookingModel.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
      );

      if (status === "CheckOut completed") {
        const { hostId } = req.body;
        const updatedHost = await hostModel.findByIdAndUpdate(
          hostId,
          {
            $inc: {
              wallet: +updatedBooking.totalAmount,
              balance: -updatedBooking.totalAmount,
            },
          }
        );
      }

      res.json(updatedBooking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  // Request withdrawal
  withdrawRequest: async (req, res) => {
    try {
      const {
        amount,
        accountHolderName,
        accountNumber,
        ifscCode,
        branch,
        hostId
      } = req.body.withdrawalRequest;

      const response = await WithdrawModel.insertMany([{
        amount,
        accountHolder: accountHolderName,
        accountNo: accountNumber,
        ifscCode,
        branch,
        hostId
      }]);

      // Update host's wallet balance by deducting the withdrawal amount
      // await hostModel.findByIdAndUpdate(hostId, { $inc: { wallet: -amount } });

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get withdrawal requests by hostId
  getWithdrawById: async (req, res) => {
    try {
      const { hostId } = req.params;
      const withdraw = await WithdrawModel.find({ hostId: hostId });
      res.json(withdraw);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  },

};
