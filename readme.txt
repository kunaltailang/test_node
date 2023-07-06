
// function it contain a callback function which has two args req, res 

// MVC
// config -> dataabase connection
// models  -> schema for database
// routes  -> routing
// middleware -> authentication and authrisation



// nodejs -> server-side rendering
// http server -> complicated
// frameworks are-> express,nestjs,fastfy,koa\

// GET -> To retrive data and send it to client
// app, endpoint url, callback function -> we have 2 params (req , res)

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.post('/login', (req, res) => {
  // Assuming you have authenticated the user and retrieved their user_id
  const user_id = '123456';

  // Set the user_id in a cookie
  res.cookie('user_id', user_id);

  res.send('Login successful');
});
app.get('/protected', (req, res) => {
  // Access the user_id from the cookie
  const user_id = req.cookies.user_id;

  if (user_id) {
    // User is authenticated, perform further operations
    res.send(`User ID: ${user_id}`);
  } else {
    // User is not authenticated, redirect to login or send an error response
    res.status(401).send('Unauthorized');
  }
});

app.get('/logout', (req, res) => {
  // Clear the user_id cookie
  res.clearCookie('user_id');

  res.send('Logged out successfully');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
