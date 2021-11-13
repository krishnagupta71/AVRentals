import TripModel from '../models/trip.js'

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
            console.log(trip)
            res.json({status:true, message:'Trip Created Successfully', data:trip})
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
           res.send(err)
           console.log(trip)
           res.json({status:true, message:'Trip Updated Successfully'})
        })
    }
} 

export const deleteTrip = (req, res) =>{
    TripModel.deleteTrip(req.params.id, (err, trip)=>{
    if(err)
        res.send(err);
    res.json({status:true, message:'Trip Deleted Successfully'})
    })
 }