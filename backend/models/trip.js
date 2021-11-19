import dbConn from'../config/db.config.js';

var TripModel = function(trip){
    this.tripID = trip.tripID,
    this.dropoff_location = trip.dropoff_location,
    this.start_time = trip.start_time,
    this.end_time = trip.end_time,
    this.current_location = trip.current_location,
    this.pickup_location = trip.pickup_location,
    this.billingID = trip.billingID,
    this.userID = trip.userID
}

//get all tripss
TripModel.getAllTrips = (result)=>{
    console.log("Teached getAllTrips in models.")
    dbConn.query('SELECT * FROM trip',(err, res)=>{
        if(err){
            console.log('Error while fetching trips', err)
            result(err, null)
        }
        else{
            result(null, res);
        }
    })
}

//get tripByID from DB
TripModel.getTripByID = (id, result)=>{
    dbConn.query(`SELECT * FROM trip WHERE tripID=?`, id ,  (err, res)=>{
        if(err){
            console.log('Error while fetching trips', err)
            result(err, null)
        }
        else{
            result(null, res);
        }
    })
}


/* POST JSON Details for Insomnia to create a new trip
{
	"tripID": 111,
	"dropoff_location":"Santa CLara",
	"start_time":"2020-01-01 08:10:10",
	"end_time":"2020-01-01 08:30:10",
	"current_location":"San Jose",
	"pickup_location":"San Jose",
	"billingID":1234,
	"userID":111
}*/


TripModel.createTrip = (tripReqData, result) => {
    dbConn.query('INSERT INTO trip SET ?', tripReqData ,  (err, res)=>{
        if(err){
            console.log('Error while inserting trip data', err)
            result(err, null)
        }
        else{
            result(null, res);
        }
    })
}

//Update Trip
TripModel.updateTrip = (id, tripReqData, result) => {
   dbConn.query('UPDATE trip SET dropoff_location=?, start_time = ?, end_time = ?, current_location = ?, pickup_location = ?, billingID = ?, userID = ? WHERE tripID = ?',[tripReqData.dropoff_location, tripReqData.start_time, tripReqData.end_time, tripReqData.current_location, tripReqData.pickup_location, tripReqData.billingID, tripReqData.userID, id], (err, res)=>{
   if(err){
            console.log('Error while updating trip data', err)
            result(err, null)
        }
        else{
            result(null, res);
        }
    });
}

//Delete Trip
TripModel.deleteTrip = (id, result) => {
    dbConn.query('DELETE FROM trip WHERE tripID = ?', id, (err, res)=>{
        if(err){
             console.log('Error while deleting trip data', err)
             result(err, null)
         }
         else{
             result(null, res);
         }
     });
 }

export default TripModel ;
