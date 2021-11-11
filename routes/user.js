import express from 'express'
import { getusers, getUserByID, createUser, updateUser, deleteUser } from '../controllers/user.js';
//import user from '../models/user.js' ;
const router = express.Router() ;

//get all users
router.get('/', getusers) ;

//get UserByID
router.get('/:id', getUserByID);

//Create New User
router.post('/', createUser) ;

//Update User
router.put('/:id', updateUser);

//Delete user
router.delete('/:id',deleteUser);

export default router ;