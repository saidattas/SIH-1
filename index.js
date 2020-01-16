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
			var rootref = database.ref('PROFILES');
			rootref.child('USERS').on('value', function(snapshot){ // print who was log in
				console.log(snapshot.child(firebaseUser.uid).child('userName').val() + " logged in!");
			});
			res.redirect('/landing');
		} else {
			//res.redirect('/login');
		}
	});
});
app.get('/postProduct', function(req, res){
	res.render('postProduct');
});
app.post('/postProduct', function(req, res){
	// about
	// cat
	// extra
	// maxquantity
	// productdate
	// productname
	// productprice
	// uid
	var about = req.body.productAbout;
	var cat = req.body.productCategory;
	var extra = "";
	var maxquantity = req.body.productQuantity;
	var productdate = req.body.productDate;
	var productname = req.body.productName;
	var productprice = req.body.productPrice;
	auth.onAuthStateChanged((firebaseUser) => {
		if(firebaseUser){
			var uId = firebaseUser.uid;
			obj = {
				about: about,
				cat: cat,
				extra: extra,
				maxquantity: maxquantity,
				proddate: productdate,
				proname: productname,
				proprice: productprice,
				uid: uId,
			};
			var rootref = database.ref('PRODUCTS');
			rootref.child('POSTS').child().set(obj);
			console.log("Product data sent!");
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
			var rootref = database.ref('PROFILES');
			rootref.child('USERS').child(firebaseUser.uid).set(obj); // sending data to database
			console.log("Data Sent!");
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
	console.log("LoggedOut! Redirecting to Login Page");
	res.render('login');
});

app.listen(3000, () => {
	console.log('SERVER IS RUNNING ON PORT 3000!');
});
