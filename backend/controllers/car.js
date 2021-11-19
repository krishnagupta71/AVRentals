import CarModel from '../models/car.js'

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
            console.log(Car)
            res.json({status:true, message:'Car Created Successfully', data:Car})
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