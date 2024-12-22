const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trips: [
    {
      tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);



