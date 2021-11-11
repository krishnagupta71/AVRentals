import dbConn from'../config/db.config.js';

var UserModel = function(user){
    this.userID = user.userID,
    this.password = user.password,
    this.user_email = user.user_email,
    this.firstname= user.firstname;
    this.lastname = user.lastname;
    this.address = user.address,
    this.phone = user.phone,
    this.username = user.username
}

//get all users
UserModel.getAllUsers = (result)=>{
    dbConn.query('SELECT * FROM users',(err, res)=>{
        if(err){
            console.log('Error while fetching users', err)
            result(null, err)
        }
        else{
            console.log('Users fetched successfully')
            result(null, res);
        }
    })
}

//get userByID from DB
UserModel.getUserByID = (id, result)=>{
    dbConn.query(`SELECT * FROM users WHERE userID=?`, id ,  (err, res)=>{
        if(err){
            console.log('Error while fetching users', err)
            result(null, err)
        }
        else{
            console.log('User fetched successfully')
            result(null, res);
        }
    })
}


/* POST JSON Details for Insomnia to create a new user
{
	"userID": 333,
	"password":"pass3",
	"user_email":"some3@some.com",
	"firstname":"ccc",
	"lastname":"fff",
	"address":"123, sad, dsfs",
	"phone":1234,
	"username":"xdssa"
}*/


UserModel.createUser = (userReqData, result) => {
    dbConn.query('INSERT INTO users SET ?', userReqData ,  (err, res)=>{
        if(err){
            console.log('Error while inserting userData', err)
            result(null, err)
        }
        else{
            console.log('User created successfully')
            result(null, res);
        }
    })
}

//Update User
UserModel.updateUser = (id, userReqData, result) => {
   dbConn.query('UPDATE users SET password=?, user_email = ?, firstname = ?, lastname = ?, address = ?, phone = ?, username = ? WHERE userID = ?',[userReqData.password, userReqData.user_email, userReqData.firstname, userReqData.lastname, userReqData.address, userReqData.phone, userReqData.username, id], (err, res)=>{
   //dbConn.query('UPDATE users SET password=? WHERE userID = ?',[userReqData.password, id], (err, res)=>{
   if(err){
            console.log('Error while updating userData', err)
            result(null, err)
        }
        else{
            console.log('User updated successfully')
            result(null, res);
        }
    });
}

//Delete User
UserModel.deleteUser = (id, result) => {
    dbConn.query('DELETE FROM users WHERE userID = ?', id, (err, res)=>{
        if(err){
             console.log('Error while updating userData', err)
             result(null, err)
         }
         else{
             console.log('User updated successfully')
             result(null, res);
         }
     });
 }

//module.exports = User ;
export default UserModel ;
