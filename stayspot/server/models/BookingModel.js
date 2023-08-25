import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userDetails', // Reference to the User model (adjust the model name if needed)
    required: true
  },
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Host', // Reference to the User model (adjust the model name if needed)
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property', // Reference to the Property model (adjust the model name if needed)
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  numberOfNights: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true 
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  review: {
    type: Array,
    default: null
  },
 status: {
    type:String,
    default:"Booked"
  }
});

const BookingModel = mongoose.model('Bookings', bookingSchema);

export default BookingModel;
