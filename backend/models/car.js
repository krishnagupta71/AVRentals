import dbConn from'../config/db.config.js';

var CarModel = function(car){
    this.carID = car.carID,
    this.manufacture = car.manufacture,
    this.model = car.model,
    this.registration_number= car.registration_number;
    this.userID = car.userID;
}

//get all cars
CarModel.getAllCars = (result)=>{
    dbConn.query('SELECT * FROM car',(err, res)=>{
        if(err){
            console.log('Error while fetching cars', err)
            result(null, err)
        }
        else{
            console.log('Cars fetched successfully')
            result(null, res);
        }
    })
}

//get carByID from DB
CarModel.getCarByID = (id, result)=>{
    dbConn.query(`SELECT * FROM car WHERE carID=?`, id ,  (err, res)=>{
        if(err){
            console.log('Error while fetching cars', err)
            result(null, err)
        }
        else{
            console.log('Car fetched successfully');
            result(null, res);
        }
    })
}


/* POST JSON Details for Insomnia to create a new car
{
	"carID": 111,
	"manufacture":"Honda",
	"model":"2012",
	"registration_number":123456
    "userID":111
}*/


CarModel.createCar = (carReqData, result) => {
    dbConn.query('INSERT INTO car SET ?', carReqData ,  (err, res)=>{
        if(err){
            console.log('Error while inserting carData', err)
            result(null, err)
        }
        else{
            console.log('Car created successfully')
            result(null, res);
        }
    })
}

//Update car
CarModel.updateCar = (id, carReqData, result) => {
   dbConn.query('UPDATE car SET manufacture=?, model = ?, registration_number = ?, userID = ? WHERE carID = ?',[carReqData.manufacture, carReqData.model, carReqData.registration_number, carReqData.carID, id], (err, res)=>{
   if(err){
            console.log('Error while updating car data', err)
            result(null, err)
        }
        else{
            console.log('Car updated successfully')
            result(null, res);
        }
    });
}

//Delete car
CarModel.deleteCar = (id, result) => {
    dbConn.query('DELETE FROM car WHERE carID = ?', id, (err, res)=>{
        if(err){
             console.log('Error while deleting car data', err)
             result(null, err)
         }
         else{
             console.log('Car deleted successfully')
             result(null, res);
         }
     });
 }

//module.exports = car ;
export default CarModel ;
