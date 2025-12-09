const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');
const path = require('path');
const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});
// const connection = mysql.createConnection({

// });
// connection.connect((err) => {

// });
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
// Manage session cookies such that after 3 days of inactivity, the session expires.
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitalized: true,
    cookie: {maxAge: 1000*60*60*24*3}
}));
// Routes
app.get('/', (req, res) => {
    res.render('homepage');
});
app.get('/projects', (req, res) => {
    res.render('projects');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
// Starting the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});