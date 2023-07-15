import express from "express";
import query from "./db/index.js";
import register from "./controller/auth/register.js";
import login from "./controller/auth/login.js";
import view from "./controller/user/view.js";
import listAll from "./controller/user/listAll.js";
import { check } from "express-validator";
import validatorResponse from "./middleware/validatorResponse.js";
import isAuthenticated from "./middleware/isAuthenticated.js";
import logout from "./controller/auth/logout.js";
import isAdmin from "./middleware/isAdmin.js";
import checkStatus from "./controller/health/checkStatus.js";
import cors from "cors";
import validatePasswordConfirmation from "./middleware/validatePasswordConfirmation.js";
import requestLeave from "./controller/auth/requestLeave.js";



// import node pg .pool
// import pkg from "pg";
// const { Pool } = pkg;


const app = express ();
// nak request json by express
app.use(express.json());

// nak bagi axios function
app.use(cors());



app.get('/', checkStatus);

// private route 
app.get('/public', (req, res) =>{
    res.status(200).json({message: "Public route"});
    });


// private route 
app.get('/private',isAuthenticated, (req, res) =>
    res.status(200).json({message: "Private route", user: req.user})
    );

    // isAdmin
    app.get('/admin',isAuthenticated,isAdmin, (req, res) =>
    res.status(200).json({message: "Admin route", user: req.user})
    );

    


app.get('/api/users',isAuthenticated,listAll);


app.get('/api/users/:username',isAuthenticated,view);



app.post(
    "/api/register",
    check("email").notEmpty().bail().isEmail().bail(),
    check("username").notEmpty().bail().isLength({ min: 4 }).bail(),
    check("password").notEmpty().bail().isLength({ min: 8 }).bail(),
    validatePasswordConfirmation, // Add the new validation middleware
    validatorResponse,
    register
  );
  app.post(
    "/api/login",
    check("identifier").notEmpty().bail(),
    check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
    validatorResponse,
    login
  );

// logout 
app.put ('/api/logout',isAuthenticated, logout);


app.put("/api/leave",isAuthenticated, requestLeave); // Add the leaveRequest route




export default app;
