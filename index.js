var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('home');
});
app.get('/login', function(req, res) {
	res.render('login');
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
