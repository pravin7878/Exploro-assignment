const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Trip name is required"],
    trim: true,
    minlength: [3, "Trip name must be at least 3 characters long"],
    maxlength: [100, "Trip name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [2000, "Description cannot exceed 2000 characters"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
    validate: {
      validator: function (value) {
        return value >= Date.now();
      },
      message: "Start date must be in the future",
    },
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "End date must be after the start date",
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be greater than or equal to 0"],
  },
  slotsAvailable: {
    type: Number,
    required: [true, "Number of slots available is required"],
    min: [0, "Slots available must be greater than or equal to 0"],
  },
  cancellationPolicy: {
    type: String,
    enum: ["full refund", "50% refund", "no refund"],
    default: "no refund",
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Organizer ID is required"],
  },
});

module.exports = mongoose.model("Trip", tripSchema);
