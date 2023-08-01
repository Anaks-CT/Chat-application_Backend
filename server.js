// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const path = require("path");
import dotenv from 'dotenv'
import connectDB from './conifg/database.js';
import express, { urlencoded } from 'express';
import user from './routes/user.js';


dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data
app.use('/api/user', user)

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`) 
);