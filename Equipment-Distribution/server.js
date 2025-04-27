const express = require('express');
const {connectDB} = require ('./config/db');
const authRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
})