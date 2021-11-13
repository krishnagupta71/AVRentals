import express from 'express'
import { gettrips, getTripByID, createTrip, updateTrip, deleteTrip } from '../controllers/trip.js';

const router = express.Router() ;

//get all trips
router.get('/alltrips', gettrips) ;

//get TripByID
router.get('/:id', getTripByID);

//Create New Trip
router.post('/addtrip', createTrip) ;

//Update Trip
router.put('/edittrip/:id', updateTrip);

//Delete Trip
router.delete('/:id',deleteTrip);

export default router ;