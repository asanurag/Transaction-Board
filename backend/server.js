require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect to MongoDB Atlas", err));

app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
