const express = require('express');
const mongoose = require('mongoose');

const masker = require('./routes/api/masker');

const app = express();

// BodyParoser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected ...'))
  .catch((err) => console.log(err));

// Use Routes
app.use('/api/masker', masker);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port}`));
