import BillingModel from '../models/billing.js'

// get all billing list
export const getbilling = (req, res) =>{
   BillingModel.getAllBills((err, billing)=>{
    if(err)
        res.send(err);
    console.log('Billings', billing);
    res.send(billing)
   })
}

export const getBillingByID = (req, res) =>{
    BillingModel.getBillingByID(req.params.id, (err, billing)=>{
     if(err)
         res.send(err);
     console.log('Billing', billing);
     res.send(billing)
    })
 }

export const createBilling = (req, res) =>{
     const billingReqData = new BillingModel(req.body)     
     //check null
     if(req.body.constructor === Object && Object.keys(req.body).length === 0){
         res.send(400).send({success:false, message: 'Please fill all the fields' })
     }
     else{  
         BillingModel.createBilling(billingReqData, (err, billing) => {
            if(err)
            res.send(err)
            console.log(billing)
            res.json({status:true, message:'Bill Created Successfully', data:billing})
         })
     }
 }

export const updateBilling = (req, res) =>{
    const billingReqData = new BillingModel(req.body)     
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success:false, message: 'Please fill all the fields' })
    }
    else{  
        BillingModel.updateBilling(req.params.id, billingReqData, (err, billing) => {
           if(err)
           res.send(err)
           console.log(billing)
           res.json({status:true, message:'Billing Updated Successfully'})
        })
    }
} 

export const deleteBilling = (req, res) =>{
    BillingModel.deleteBilling(req.params.id, (err, bill)=>{
    if(err)
        res.send(err);
    res.json({status:true, message:'Billing Deleted Successfully'})
    })
 }