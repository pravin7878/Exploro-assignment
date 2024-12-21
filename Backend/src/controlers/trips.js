const Trip = require("../models/Trip");

// Create a new trip
exports.createTrip = async (req, res, next) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    res.status(201).json({ message: "New Trip Added Successfully", savedTrip });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

// Get all trips
exports.getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate("organizerId", "name email");
    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
};

// Get a trip by ID
exports.getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id).populate(
      "organizerId",
      "name email"
    );
    if (!trip) {
      const error = new Error("Trip not found");
      error.statusCode = 404;
      throw error; 
    }
    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

// Update a trip
exports.updateTrip = async (req, res, next) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTrip) {
      const error = new Error("Trip not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(updatedTrip);
  } catch (error) {
    next(error);
  }
};

// Delete a trip
exports.deleteTrip = async (req, res, next) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) {
      const error = new Error("Trip not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    next(error);
  }
};
