const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectToDatabase = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
connectToDatabase();
const captainroutes = require('./routes/capatin.routes')


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/captain',captainroutes);
app.get('/', (req,res) => {
    res.send('Hello World');
});

app.use('/users',userRoutes);

module.exports = app;
