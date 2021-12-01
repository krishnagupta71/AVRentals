import TripModel from "../models/trip.js";
import axios from "axios";
import { CARLA_BASE_URL } from "../config/carlaConfig.js";

// get all trips list
export const gettrips = (req, res) => {
  TripModel.getAllTrips((err, trips) => {
    if (err) res.send({ status: false, message: "Trips Not Found" });
    console.log("Trips", trips);
    res.send({ status: true, data: trips });
  });
};

export const getTripByID = (req, res) => {
  TripModel.getTripByID(req.params.id, (err, trip) => {
    if (err) res.send(err);
    console.log("Trip", trip);
    if (trip.length == 0) {
      res.send({ status: false, message: "Trip Not Found" });
    } else res.send({ status: true, data: trip });
  });
};

export const createTrip = (req, res) => {
  const tripReqData = new TripModel(req.body);
  //check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .send(400)
      .send({ status: false, message: "Please fill all the fields" });
  } else {
    tripReqData.iscompleted = 0;
    console.log("TripReqData_iscompleted: ", tripReqData.iscompleted);
    console.log("TripReqData after:", tripReqData);
    TripModel.createTrip(tripReqData, (err, trip) => {
      if (err) res.send({ status: false, message: "Trip Not Created." });
      else if (trip != null && trip.affectedRows != 0) {
        console.log(trip);
        console.log(
          "trip ID:",
          trip.insertId,
          "car ID:",
          tripReqData.carID,
          "pickup:",
          tripReqData.pickup_location,
          "destination:",
          tripReqData.dropoff_location
        );
        axios
          .post(`${CARLA_BASE_URL}/trip/init`, {
            vehicle_id: tripReqData.carID,
            trip_id: trip.insertId,
            pickup_location: tripReqData.pickup_location,
            destination: tripReqData.dropoff_location,
          })
          .then((response) => {
            console.log("Trip details sent to Carla: ", response);
          })
          .catch(function (error) {
            console.log("Promise Rejected:", error);
          });
        res.json({
          status: true,
          message: "Trip Created Successfully",
          data: trip,
        });
      }
    });
  }
};

export const updateTrip = (req, res) => {
  const tripReqData = new TripModel(req.body);
  //check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .send(400)
      .send({ status: false, message: "Please fill all the fields" });
  } else {
    TripModel.updateTrip(req.params.id, tripReqData, (err, trip) => {
      if (err)
        res.send({
          status: false,
          message: "Trip Not Updated. Invalid Values Given.",
        });
      else if (trip.affectedRows == 0)
        res.send({ status: false, message: "Trip Not Found" });
      else res.json({ status: true, message: "Trip Updated Successfully" });
    });
  }
};

export const deleteTrip = (req, res) => {
  TripModel.deleteTrip(req.params.id, (err, trip) => {
    if (err) res.send(err);
    else if (trip.affectedRows == 0)
      res.send({ status: false, message: "Trip Not Found" });
    else res.json({ status: true, message: "Trip Deleted Successfully" });
  });
};

export const updateFinishedTrip = (req, res) => {
  console.log("Trip finished");
  const tripReqData = new TripModel(req.body);
  TripModel.updateFinishedTrip(tripReqData, (err, trip) => {
    if (err)
      res.send({
        status: false,
        message: "Trip Not Updated. Invalid Values Given.",
      });
    else if (trip.affectedRows == 0)
      res.send({ status: false, message: "Trip Not Found" });
    else
      res.json({ status: true, message: "Trip Status Updated to Completed." });
  });
};

export const updateAtPickUP = (req, res) => {
  console.log("Trip finished");
  const tripReqData = new TripModel(req.body);
  TripModel.updateAtPickUP(tripReqData, (err, trip) => {
    if (err)
      res.send({
        status: false,
        message: "AtPickUp Not Updated. Invalid Values Given.",
      });
    else if (trip.affectedRows == 0)
      res.send({ status: false, message: "Trip Not Found" });
    else
      res.json({
        status: true,
        message: "Car Reached at the pickup location.",
      });
  });
};

export const updatePickup = (req, res) => {
  TripModel.getTripByID(req.body.tripID, (err, trip) => {
    if (err) res.send({ statuse: false, message: err });
    console.log("Trip", trip);
    if (trip.length == 0) {
      res.send({
        status: false,
        message: "Pickup not updated. Trip Not Found",
      });
    } else {
      console.log("Pickup Update:", req.body.tripID);
      axios
        .post(`${CARLA_BASE_URL}/trip/pickup`, {
          trip_id: req.body.tripID,
        })
        .then((response) => {
          console.log("tripID sent to Carla: ", response);
        })
        .catch(function (error) {
          console.log("Promise Rejected:", error);
        });
      res.json({ status: true, message: "Updated Pickup Successfully" });
    }
  });
};
