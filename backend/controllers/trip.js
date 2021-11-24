import TripModel from '../models/trip.js'
import axios from 'axios' ;

// get all trips list
export const gettrips = (req, res) =>{
   TripModel.getAllTrips((err, trips)=>{
    if(err)
        res.send(err);
    console.log('Trips', trips);
    res.send(trips)
   })
}

export const getTripByID = (req, res) =>{
    TripModel.getTripByID(req.params.id, (err, trip)=>{
     if(err)
         res.send(err);
     console.log('Trip', trip);
     if(trip.length == 0){
        res.send({status:false, message:'Trip Not Found'})
     }
     else
        res.send(trip)
    })
 }

export const createTrip = (req, res) =>{
     const tripReqData = new TripModel(req.body)     
     //check null
     if(req.body.constructor === Object && Object.keys(req.body).length === 0){
         res.send(400).send({success:false, message: 'Please fill all the fields' })
     }
     else{  
         TripModel.createTrip(tripReqData, (err, trip) => {
            if(err)
                res.send(err)
            else if(trip !=null && trip.affectedRows != 0){
                console.log(trip)
                console.log("trip ID:", trip.insertId, "car ID:", tripReqData.carID, "pickup:",tripReqData.pickup_location,"destination:", tripReqData.dropoff_location )
                 axios.post('http://ac0d-73-15-187-30.ngrok.io/trip/init', {"vehicle_id":tripReqData.carID, "trip_id": trip.insertId, "pickup_location":tripReqData.pickup_location, "destination":tripReqData.dropoff_location}).then((response) => {
                     console.log("Trip details sent to Carla: ", response)
                 }).catch(function (error) {
                         console.log("Promise Rejected:", error);
                      });
                res.json({status:true, message:'Trip Created Successfully', data:trip})
            }
         })
     }
 }

export const updateTrip = (req, res) =>{
    const tripReqData = new TripModel(req.body)     
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success:false, message: 'Please fill all the fields' })
    }
    else{  
        TripModel.updateTrip(req.params.id, tripReqData, (err, trip) => {
        if(err)
            res.send({status:false, message:'Trip Not Updated. Invalid Values Given.'})
        else if(trip.affectedRows == 0) 
            res.send({status:false, message:'Trip Not Found'})
        else    
             res.json({status:true, message:'Trip Updated Successfully'})
        })
    }
} 

export const deleteTrip = (req, res) =>{
    TripModel.deleteTrip(req.params.id, (err, trip)=>{
        if(err)
        res.send(err);
    else if(trip.affectedRows == 0) 
        res.send({status:false, message:'Trip Not Found'})
    else
        res.json({status:true, message:'Trip Deleted Successfully'})
    })
 }

export const updateFinishedTrip = (req, res) =>{
    console.log("Trip finished");
    const tripReqData = new TripModel(req.body)       
        TripModel.updateFinishedTrip(tripReqData, (err, trip) => {
        if(err)
            res.send({status:false, message:'Trip Not Updated. Invalid Values Given.'})
        else if(trip.affectedRows == 0) 
            res.send({status:false, message:'Trip Not Found'})
        else    
             res.json({status:true, message:'Trip Updated Successfully'})
        })
} 

export const updatePickup = (req, res) =>{
    console.log("Pickup Update:", req.body.tripID);
    axios.post('http://ac0d-73-15-187-30.ngrok.io/trip/pickup', {"trip_id": req.body.tripID}).then((response) => {   
                    console.log("tripID sent to Carla: ", response)
                }).catch(function (error) {
                    console.log("Promise Rejected:", error);
                });
    res.json({status:true, message:' Updated Pickup Successfully'})
} 