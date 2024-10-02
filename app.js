require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize the Express application
const app = express();

// Use environment variable for port, or default to 3000
const port = process.env.PORT || 3000;

// Controller for the contact page
const contactUsController = require('./controller/contact-us-controller');

// Set up body parser middleware to handle form submissions and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like CSS, JS, images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the views directory and view engine (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MongoDB connection using Mongoose
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.get('/', (req, res) => {
  res.render('pages/home'); // Make sure 'views/pages/home.ejs' exists
});

app.get('/success', (req, res) => {
  res.render('pages/success'); // Make sure 'views/pages/success.ejs' exists
});

app.get('/error', (req, res) => {
  res.render('pages/error'); // Make sure 'views/pages/error.ejs' exists
});

// Use the contactUsController for handling '/contact' routes
app.use('/contact', contactUsController);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
