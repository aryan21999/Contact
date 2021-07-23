var express = require('express');
var router = express.Router();

var auth = function (req, res, next) {
	if (req.session.email && req.session.isLogged)
		return next();
	else
		return res.redirect('/');
};


router.get('/home', auth, function (req, res, next) {
	if (req.session.isLogged) {
		res.render('home', { title: req.session.email })
	}
});


/* GET login page. */
router.get('/', function (req, res, next) {
	res.render('welcome');
});

router.get('/signin', function (req, res, next) {
	res.render('signin');
});


router.get('/signup', function (req, res, next) {
	res.render('signup');
});


module.exports = router;
