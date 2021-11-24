import CarModel from '../models/car.js'
import axios from 'axios' ;

// get all Cars list
export const getcars = (req, res) =>{
   CarModel.getAllCars((err, Cars)=>{
    if(err)
        res.send(err);
    console.log('Cars', Cars);
    res.send(Cars)
   })
}

export const getCarByID = (req, res) =>{
    CarModel.getCarByID(req.params.id, (err, Car)=>{
     if(err)
         res.send(err);
     console.log('Car', Car);
     if(Car.length == 0){
        res.send({status:false, message:'Car Not Found'})
     }
     else
        res.send(Car)
    })
 }

export const createCar = (req, res) =>{
     const CarReqData = new CarModel(req.body)     
     //check null
     if(req.body.constructor === Object && Object.keys(req.body).length === 0){
         res.send(400).send({success:false, message: 'Please fill all the fields' })
     }
     else{  
         CarModel.createCar(CarReqData, (err, Car) => {
            if(err)
                res.send(err)
            
            //axios.post('http://1e72-73-15-187-30.ngrok.io/vehicle', {"vehicle_id":CarReqData.carID}).then((response) => {   
            else if(Car !=null && Car.affectedRows != 0){
                console.log("Car:",Car)
                console.log("carIDSent: ",Car.insertId)
                axios.post('http://ac0d-73-15-187-30.ngrok.io/vehicle', {"vehicle_id": Car.insertId}).then((response) => {   
                    console.log("CarID sent to Carla: ", response)
                }).catch(function (error) {
                    //console.log("Promise Rejected:", error);
                });
                res.json({status:true, message:'Car Created Successfully', data:Car})
            }
            
         })
     }
 }

export const updateCar = (req, res) =>{
    const CarReqData = new CarModel(req.body)     
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success:false, message: 'Please fill all the fields' })
    }
    else{  
        CarModel.updateCar(req.params.id, CarReqData, (err, Car) => {
            if(err)
                res.send({status:false, message:'Car Not Updated. Invalid Values Given.'})
             else if(Car.affectedRows == 0) 
                res.send({status:false, message:'Car Not Found'})
            else    
                 res.json({status:true, message:'Car Updated Successfully'})
            }
        )
    }
} 

export const deleteCar = (req, res) =>{
    CarModel.deleteCar(req.params.id, (err, Car)=>{
        if(err)
        res.send(err);
    else if(Car.affectedRows == 0) 
        res.send({status:false, message:'Car Not Found'})
    else
        res.json({status:true, message:'Car Deleted Successfully'})
    })
 }