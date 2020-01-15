var bodyParser = require('body-parser');
var express = require('express');
var app = express();
// var admin = require('firebase-admin');
var firebase = require('firebase');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
require('firebase/auth');
require('firebase/database');

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyCFCb5gEtIvhnEsmajaz3pQZLE87GuWsk4',
	authDomain: 'sih-app-18e73.firebaseapp.com',
	databaseURL: 'https://sih-app-18e73.firebaseio.com',
	projectId: 'sih-app-18e73',
	storageBucket: 'sih-app-18e73.appspot.com',
	messagingSenderId: '741492458591',
	appId: '1:741492458591:web:b74e50dd2f0f330048c7ea',
	measurementId: 'G-SNG2EE3MS2'
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
const rootref = database.ref('PROFILES');

app.get('/', function(req, res) {
	res.redirect('/login');
});
app.get('/login', function(req, res) {
	res.render('login');
});
app.post('/login', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	const auth = firebase.auth();
	const promise = auth.signInWithEmailAndPassword(email, password);
	promise.catch((e) => console.log(e.message));
	auth.onAuthStateChanged((firebaseUser) => {
		if (firebaseUser) {
			console.log('Logged In!');
			res.redirect('/landing');
		} else {
			//res.redirect('/login');
		}
	});
});

app.get('/landing', function(req,res){
	res.render('landing');
});

app.get('/productDetails', function(req, res){
	res.render('productDetails');
});


app.get('/register', function(req, res) {
	res.render('register');
});
app.post('/register', function(req, res) {
	var fname = req.body.fname;
	var lname = req.body.lname;
	var username = fname + ` ` + lname;
	var email = req.body.email;
	var password = req.body.password;
	var date = req.body.datepicker;
	var faddress = req.body.faddress;
	var laddress = req.body.laddess;
	var phone = req.body.phone;
	var location = faddress + ` ` + laddress;
	var pin = req.body.pin;
	const auth = firebase.auth();
	const promise = auth.createUserWithEmailAndPassword(email, password);
	promise.catch((e) => console.log(e.message));
	auth.onAuthStateChanged((firebaseUser) => {
		if (firebaseUser) {
			var obj = {
				dob: date,
				location: location,
				phonenumber: phone,
				pincode: pin,
				userEmail: email,
				userName: username
			};
			rootref.child('USERS').child(firebaseUser.uid).set(obj);
			console.log("Signed In!");
			red.redirect('/login');
		} else {
			console.log('error');
			res.redirect('/register');
		}
	});
	res.redirect('/login');
});

app.get('/myAccount', function(req, res) {
	var ref = database.ref('PROFILES');
	ref.child('USERS').on('value', function(snapshot) {
		console.log(snapshot.val());
	});
});

app.get('/productDetail', function(req, res) {
	res.render('productDetails');
});

app.get('/logout', function(req, res){
	res.render('/login');
});

app.listen(3000, () => {
	console.log('SERVER IS RUNNING ON PORT 3000!');
});
