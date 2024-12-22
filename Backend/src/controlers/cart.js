const Cart = require("../models/Cart");
const Trip = require("../models/Trip")

// Add trip to cart
exports.addToCart = async (req, res, next) => {
  try {
    const { tripId, quantity = 1 } = req.body;
    const userId = req.user.id;

    if (!tripId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid trip ID or quantity." });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found." });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, trips: [{ tripId, quantity }] });
    } else {
      // If cart exists, check if the trip already exists
      const tripIndex = cart.trips.findIndex(
        (item) => item.tripId.toString() === tripId
      );

      if (tripIndex > -1) {
        // If the trip already exists, update its quantity
        cart.trips[tripIndex].quantity += quantity;
      } else {
        // If the trip is new to the cart, add it
        cart.trips.push({ tripId, quantity });
      }
    }

    await cart.save();

    res.status(200).json({ message: "Trip added to cart", cart });
  } catch (error) {
    next(error);
  }
};

// Get user's cart
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "trips.tripId"
    );
    if (!cart || cart.trips.length === 0) {
      return res.status(200).json({ message: "Cart is empty" });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Remove trip from cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.trips = cart.trips.filter((item) => item.tripId.toString() !== tripId);

    await cart.save();
    res.status(200).json({ message: "Trip removed from cart", cart });
  } catch (error) {
    next(error);
  }
};

// Clear user's cart
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};
