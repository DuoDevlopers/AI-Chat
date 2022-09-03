var express = require('express');
const fileUpload = require("express-fileupload");
var app = express();
const path = require('path');
const fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./api/login');
var usersRouter = require('./api/user');
var con = require('./api/db');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded({ extended: true });
var mysql = require('mysql');
const { token } = require('morgan');
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

var sessionStore = new MySQLStore({}, con);
var store = require('store')


app.use(session({
    key: "key for our science project please don't share this with anyone, just this code",
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2630000
    }
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/'));

app.use(fileUpload());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static('assets'));



app.get('/', function (req, res) {
    res.status(200);
    res.render('themes/default/index', {
    });
});

app.get('/chat', (req, res) => {
    res.status(200);
    res.render('themes/default/chat.ejs', {
    })
})





app.get('/auth/login', (req, res) => {
    res.status(200);
    res.render('themes/default/login.ejs', {
    })
})



app.post("/auth/login", encoder, function (req, res) {
    let username = req.body.username
    let password = req.body.password

    con.query("select * from loginuser where user_name = ? and user_pass = ?", [username, password], function (error, results, fields) {
        app.use(session({
            key: "key for our science project please don't share this with anyone, just this code",
            secret: 'session_cookie_secret',
            store: sessionStore,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 2630000
            }
        }));




        if (results.length > 0) {
            app.use(session({
                key: "key for our science project please don't share this with anyone, just this code",
                secret: 'session_cookie_secret',
                store: sessionStore,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 2630000
                }
            }));
            con.query(`UPDATE loginuser SET session = ? WHERE user_name = ? ;`, [req.sessionID, username])
                res.status(200);
                res.render('themes/default/success.ejs', {
                    TOKEN: req.sessionID,
                    EMAIL: username     
                })
            

        } else {

        }
        res.end();
    })
})



//api section
app.post('/upload', (req, res) => {
    if (!req.files) {
        res.status(404);
        res.render('themes/default/404')
        return;
    }

})



app.use((req, res) => {
    res.status(404).render('themes/default/404')
})

app.listen('6969', (err) => {
    err ? console.log(err) :
        console.log("Webserver Started on Port: " + '6969')
});
