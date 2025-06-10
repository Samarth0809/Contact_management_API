const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

// Import routes BEFORE using them
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Contact Management API is running!');
});

const contactRoutes = require('./routes/contact');
app.use('/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

