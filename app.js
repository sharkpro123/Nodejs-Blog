require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const connectDb=require('./server/config/db');

const app=express();
const PORT = 5000 || process.env.PORT;

// Connect to MongoDB
const startApp = async () => {
  try {
    await connectDb(); // Wait until MongoDB is connected
    app.use(express.urlencoded({ extended: true })); 
    app.use(express.json)// Middleware to parse URL-encoded data
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start app:', error.message);
  }
};

startApp();

app.use(express.static('public'));

// Template engine
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

app.use('/',require('./server/routes/main'));

app.listen(PORT,()=>{
  console.log(`App listening on port ${PORT}`);
})