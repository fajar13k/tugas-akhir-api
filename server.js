const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

// API Routes
const maskerRoutes = require('./routes/api/masker');
const usersRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');

const app = express();

// BodyParoser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Config
const db = config.get('mongoURI');

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected ...'))
  .catch((err) => console.log(err));

// Use Routes
app.use('/api/masker', maskerRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port}`));
