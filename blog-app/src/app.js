const path = require('path')
const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user_router');
const blogRouter = require('./routers/blog_router');
const adminRouter = require('./routers/admin_router');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(cookieParser());
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
       title: 'Blog',
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
   res.render('register');
});

app.get('/test', (req, res) => {
    res.render('test');
});







app.use(express.json());

app.use(userRouter);
app.use(blogRouter);
app.use(adminRouter);

module.exports = app;