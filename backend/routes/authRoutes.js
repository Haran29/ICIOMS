// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const { addItem, deleteItem, updateItem ,getmenuItem } = require('../controllers/itemController');
//const localVariables = require("../helpers/auth");
const {
  test,
  registerUser,
  LoginUser,
  getProfile,
  logout,
  gettuser,
  updateUser,
  genaraterepo,
  fetchuser,
  deleteUser,
  searchuser,
  resettpassword,
  sendotp
  
} = require("../controllers/authController");

router.get("/", test);
router.post("/SignUpPage", registerUser);
router.post("/LoginPage", LoginUser);
router.get("/api/user/profile", getProfile);
router.post("/logout", logout);
//post
router.post("/register",)//sendemail
router.post("/registerMail",)//
router.post("/authenticate",)//authenticate user


//update user profile
router.get('/api/user/getuser',gettuser)//get user data
router.put('/api/user/updateuser',updateUser);//update user data
//-------------

//reset password
router.post('/api/sendotp',sendotp);
router.post('/api/resetpass',resettpassword );
//router.post('/reset-password/:id/:token',);


//genarate report
router.get('/api/usersre',fetchuser);
router.delete('/api/delete-users/:id', deleteUser  );
router.get('/api/users/reports',genaraterepo);

//----------------

//searchuser
router.get('/api/searchuser?name:name',searchuser);

//-------
//admin
router.post('/api/users',);
// Add Item Route
router.post('/add-item', addItem);

router.get('/get-menuItem',getmenuItem);
// Delete Item Route
router.delete('/delete-item/:id', deleteItem);

// Update Item Route
router.put('/update-item/:id', updateItem);

module.exports = router;

