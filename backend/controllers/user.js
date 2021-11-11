import UserModel from '../models/user.js'

// get all users list
export const getusers = (req, res) =>{
   UserModel.getAllUsers((err, users)=>{
    if(err)
        res.send(err);
    console.log('Users', users);
    res.send(users)
   })
}

export const getUserByID = (req, res) =>{
    UserModel.getUserByID(req.params.id, (err, user)=>{
     if(err)
         res.send(err);
     console.log('User', user);
     res.send(user)
    })
 }

export const createUser = (req, res) =>{
     const userReqData = new UserModel(req.body)     
     //check null
     if(req.body.constructor === Object && Object.keys(req.body).length === 0){
         res.send(400).send({success:false, message: 'Please fill all the fields' })
     }
     else{  
         UserModel.createUser(userReqData, (err, user) => {
            if(err)
            res.send(err)
            console.log(user)
            res.json({status:true, message:'User Created Successfully', data:user})
         })
     }
 }

export const updateUser = (req, res) =>{
    const userReqData = new UserModel(req.body)     
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success:false, message: 'Please fill all the fields' })
    }
    else{  
        UserModel.updateUser(req.params.id, userReqData, (err, user) => {
           if(err)
           res.send(err)
           console.log(user)
           res.json({status:true, message:'User Updated Successfully'})
        })
    }
} 

export const deleteUser = (req, res) =>{
    UserModel.deleteUser(req.params.id, (err, user)=>{
    if(err)
        res.send(err);
    res.json({status:true, message:'User Deleted Successfully'})
    })
 }