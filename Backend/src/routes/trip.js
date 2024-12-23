const express = require("express");
const {
  updateTrip,
  getTripById,
  getAllTrips,
  createTrip,
  deleteTrip,
} = require("../controlers/trips");
const protect = require("../middelware/protect");
const checkAccess = require("../middelware/chackAccess");
const { organizer } = require("../utils/constent");
const validateTripBody = require("../middelware/tripBodyValidater");

const router = express.Router();

// Middleware for routes that require protection and access control
const organizerAccess = [protect, checkAccess(organizer),validateTripBody];

// CRUD routes
router
  .route("/")
  .get(getAllTrips)
  .post(...organizerAccess, createTrip);

router
  .route("/:id")
  .get(getTripById)
  .put(...organizerAccess, updateTrip)
  .delete(...organizerAccess, deleteTrip);

module.exports = router;
