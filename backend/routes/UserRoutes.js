// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const {
  gettuser,
  updateUser,
  genaraterepo,
  fetchuser,
  deleteUser,
  adduser,
  updaterole
  
} = require("../controllers/testController");





//update user profile
router.get('/api/user/getuser/:userid',gettuser)//get user data
router.put('/api/user/updateuser',updateUser);//update user data
//-------------


//genarate report
router.get('/api/usersre',fetchuser);
router.delete('/api/delete-users/:id', deleteUser  );
router.get('/api/users/reports',genaraterepo);
router.put('/users/:userId',updaterole)
//----------------

//searchuser
router.post('/api/add-user',adduser);

//-------
//admin
//router.post('/api/users',);


module.exports = router;