import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
  structure: {
    type: String,
    required: true,
  },
  privacyType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  address: {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    houseNumber: String,
    area: String,
    streetAddress: String,
    landMark: String,
  },
  floorPlan: [
    {
      type: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],
  amenities: [String],

  title: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true, 
  },
  hostId: {
    type: String,
    required: true,
  },
  minimumStay: {
    type: Number,
   
  },
 maximumStay: {
    type: Number,
  },
  availableDates:{
   startDate:Date,
   endDate:Date
  },
  hostId: {
    type: String,
    required: true,
  },
  instantBooking: {
    type: String,
    default: "on",
  },

  status: {
    type: String,
    default:"inProgress"
  },
});

const PropertyModel = mongoose.model("propertyDetails", propertySchema);
export default PropertyModel;
 