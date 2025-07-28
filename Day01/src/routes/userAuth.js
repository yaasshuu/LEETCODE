const express = require('express');

const  authRouter = express.Router();

//Register
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/getProfile', getProfile);

//login
//logout
//Getprofile
