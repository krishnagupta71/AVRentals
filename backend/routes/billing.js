import express from 'express'
import { getbilling, getBillingByID, createBilling, updateBilling, deleteBilling } from '../controllers/billing.js';

const router = express.Router() ;

//get all billing
router.get('/allbills', getbilling) ;

//get BillingByID
router.get('/:id', getBillingByID);

//Create New Bill
router.post('/addbill', createBilling) ;

//Update Bill
router.put('/editbill/:id', updateBilling);

//Delete Bill
router.delete('/:id',deleteBilling);

export default router ;