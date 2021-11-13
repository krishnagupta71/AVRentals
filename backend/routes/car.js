import express from 'express'
import { getcars, getCarByID, createCar, updateCar, deleteCar } from '../controllers/car.js';

const router = express.Router() ;

//get all cars
router.get('/allcars', getcars) ;

//get carByID
router.get('/:id', getCarByID);

//Create New Car
router.post('/addcar', createCar) ;

//Update Car
router.put('/editcar/:id', updateCar);

//Delete Car
router.delete('/:id', deleteCar);

export default router ;