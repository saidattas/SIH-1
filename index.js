var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCFCb5gEtIvhnEsmajaz3pQZLE87GuWsk4",
    authDomain: "sih-app-18e73.firebaseapp.com",
    databaseURL: "https://sih-app-18e73.firebaseio.com",
    projectId: "sih-app-18e73",
    storageBucket: "sih-app-18e73.appspot.com",
    messagingSenderId: "741492458591",
    appId: "1:741492458591:web:b74e50dd2f0f330048c7ea",
    measurementId: "G-SNG2EE3MS2"
  };
firebase.initializeApp(firebaseConfig);
//Reference database service
// var database = firebase.database();
// const auth = firebase.auth()

// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
// 	// Handle Errors here.
// 	var errorCode = error.code;
// 	var errorMessage = error.message;
// 	// ...
// });

app.get('/register', function(req, res) {
	res.render('register');
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
		//Handels errors here
		var errorCode = error.code;
		var errorMessage = error.message;
	});
});

app.get('/login', function(req, res) {
	res.render('login');

});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('home');
});
app.get('/register', function(req, res) {
	res.render('register');
});
app.get('/productDetail', function(req, res) {
	res.render('productDetails');
});

app.listen(3000, () => {
	console.log('SERVER IS RUNNING ON PORT 3000!');
});
