import Razorpay from 'razorpay'
import crypto from 'crypto'
import Stripe from 'stripe';
import bookingModel from '../models/BookingModel.js';
import userModel from '../models/UserModel.js';
import propertyModel from '../models/PropertyModel.js';
import hostModel from '../models/HostModel.js';

const stripe = Stripe(process.env.STRIPE_SECERET_KEY)
let instance = new Razorpay({
  key_id: process.env.STRIPE_KEY_ID,
  key_secret: process.env.STRIPE_KEY_SECERET,
});

export default {
// Perform the checkout process
postCheckout: async (req, res) => {
  try {
    const { checkInDate, hostId, checkOutDate, listingId, guests, numberOfNights, userId, totalAmount } = req.body;
    const cancelUrl = `http://localhost:3000/reserve?listingId=${listingId}&nights=${numberOfNights}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${guests}`;
    const listing = await propertyModel.findById(listingId);
    const user = await userModel.findById(userId);
    
    // Increment host balance
    await hostModel.findByIdAndUpdate(listing.hostId, { $inc: { balance: +totalAmount } });
    
    // Create a new booking
    const bookingResponse = await bookingModel.create({
      userId, hostId, listingId, checkInDate, checkOutDate, guests, numberOfNights, totalAmount
    });
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        { 
          price_data: {
            currency: "inr",
            product_data: {
              name: listing.title,
              images: [
                listing.images[0]      
              ],
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user.email,
      success_url: `http://localhost:3000/order-success?bookingId=${bookingResponse._id}`,
      cancel_url: cancelUrl,
    });
    
    res.json({ URL: session.url });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'An error occurred while creating the payment.' });
  }
},

// Handle successful payment
getOrderSuccess: async (req, res) => {
  try {
    const { userId, hostId, listingId, checkInDate, checkOutDate, guests, numberOfNights, totalAmount } = req.query;
    const newBooking = new bookingModel({
      userId,
      checkInDate,
      checkOutDate,
      listingId,
      guests,
      numberOfNights,
      totalAmount
    });
    
    const bookingResponse = await newBooking.save();
    res.redirect(`/order-success?bookingId=${bookingResponse._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the successful payment.' });
  }
},
paymentOrder: async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Convert amount to the smallest currency unit
      currency: "INR",
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        res.json({ err: true, message: "Server error" });
      } else {
        res.json({ err: false, order });
      }
    });
  } catch (error) {
    res.status(500).json({ err: true, message: "An unexpected error occurred" });
  }
},

paymentVerify: async (req, res) => {
  try {
    const { userId, listingId, checkInDate, checkOutDate, guests, numberOfNights, totalAmount } = req.body.details;
    const { response } = req.body;
    const body = response.razorpay_order_id + "|" + response.razorpay_payment_id;
    
    // Calculate the signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.STRIPE_KEY_SECERET)
      .update(body)
      .digest('hex');

    if (expectedSignature === response.razorpay_signature) {
      try {
        await hostModel.findByIdAndUpdate(listing.hostId, { $inc: { wallet: +totalAmount } });
        const bookingResponse = await bookingModel.create({
          userId, listingId, hostId, checkInDate, checkOutDate, guests, numberOfNights, totalAmount
        });
        return res.json({
          err: false,
          bookingResponse
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          err: true,
          message: "Error while saving booking"
        });
      }
    } else {
      return res.json({
        err: true,
        message: "Payment verification failed"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      err: true,
      message: "An unexpected error occurred"
    });
  }
}


}