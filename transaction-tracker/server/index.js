const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactionRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});