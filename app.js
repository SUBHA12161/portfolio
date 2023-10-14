const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const contactUsController = require('./controller/contact-us-controller');
const bodyParser = require('body-parser');

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for connection errors
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your routes here
app.get('/', (req, res) => {
  res.render('pages/home');
});

app.get('/success', (req, res) => {
  res.render('pages/success');
});

app.get('/error', (req, res) => {
  res.render('pages/error');
  
});

// Use the contactUsController
app.use('/contact', contactUsController);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
