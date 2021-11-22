import express from 'express'
import { gettrips, getTripByID, createTrip, updateTrip, deleteTrip, updateFinishedTrip } from '../controllers/trip.js';

const router = express.Router() ;

//get all trips
router.get('/all', gettrips) ;

//get TripByID
router.get('/:id', getTripByID);

//Create New Trip
router.post('/add', createTrip) ;

//Update Trip
router.put('/edit/:id', updateTrip);

//Delete Trip
router.delete('/:id',deleteTrip);

////Create New Trip
router.post('/finished', updateFinishedTrip) 

export default router ;