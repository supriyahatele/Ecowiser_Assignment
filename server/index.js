require('dotenv').config()
const express = require('express');
const cors =require('cors');
const { dbToConnection } = require('./config/dbConnection');

const app = express();
app.use(express.json());
app.use(cors())


app.listen(process.env.PORT,()=>{
  dbToConnection()
    console.log('server is running!')
})