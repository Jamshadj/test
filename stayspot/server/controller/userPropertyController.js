import propertyModel from '../models/PropertyModel.js';
import hostModel from '../models/HostModel.js';
import userModel from '../models/UserModel.js';
import bookingModel from '../models/BookingModel.js';

export default {
 // Get listings endpoint
getListings: async (req, res) => {
  try {
    const { structure } = req.query;
    const baseQuery = { status: "Listed" };

    const listings = structure
      ? await propertyModel.find({ ...baseQuery, structure })
      : await propertyModel.find(baseQuery);

    res.json({ error: false, listings });
  } catch (error) {
    console.error('Error retrieving listings:', error);
    res.status(500).json({ error: true, message: 'Error retrieving listings' });
  }
},

// Get property by ID endpoint
getListingById: async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

// Get host by ID endpoint
getHostById: async (req, res) => {
  try {
    const { hostId } = req.params;
    const host = await hostModel.findById(hostId).lean();

    if (!host) {
      return res.status(404).json({ error: 'Host not found' });
    }

    res.json(host);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

// Add property to user's wishlist endpoint
addToWishList: async (req, res) => {
  try {
    const { propertyId, userId } = req.body;
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: propertyId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Successfully added to wishlist', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

// Remove property from user's wishlist endpoint
removeFromWishList: async (req, res) => {
  try {
    const { propertyId, userId } = req.body;
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: propertyId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Successfully removed from wishlist', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

// Check if property exists in user's wishlist endpoint
getWishListStatus: async (req, res) => {
  try {
    const { propertyId, userId } = req.params;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const propertyExistsInWishlist = user.wishlist.includes(propertyId);

    res.json({ message: 'Wishlist item status fetched', propertyExistsInWishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

// Get user's wishlist endpoint
getWishList: async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Wishlist fetched', wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

// Get reservations by user ID endpoint
getReservationsById: async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await bookingModel.find({ userId });

    if (!bookings) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking item status fetched', bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},
// Get bookings by property ID endpoint
getBookingByPropertyId: async (req, res) => {
  try {
    const { propertyId } = req.params;
    const bookings = await bookingModel
      .find({ listingId: propertyId })
      .populate('userId', 'firstName lastName image')
      .populate('review');

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    res.json({ message: 'Booking items fetched successfully', bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
},

// Add review to a booking endpoint
addReview: async (req, res) => {
  try {
    const booking = await bookingModel.findOne({ _id: req.body.reviewDetails.bookingId });
    booking.review.push({
      starCount: req.body.reviewDetails.starCount,
      comment: req.body.reviewDetails.comment
    });
    await booking.save();

    res.status(200).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'An error occurred while adding the review' });
  }
}
};
