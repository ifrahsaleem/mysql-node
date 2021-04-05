const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    // port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Database connected');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// Load Routes
const auth = require('./routes/auth');
const product = require('./routes/product');
const order = require('./routes/order');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Serve images
app.use(express.static(path.join(__dirname, '/public')));

// Use Routes
app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/order', order);

app.listen(process.env.PORT, () => console.log('app is running at port 5000'));