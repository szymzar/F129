const express = require('express');
const path = require('path');
const moviesRouter = require('./routes/moviesRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'styles')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', moviesRouter);

module.exports = app;
