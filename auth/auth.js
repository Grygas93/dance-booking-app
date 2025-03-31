// Function to verify if the user is logged in 
exports.verify = (req, res, next) => {
	if (!req.session.user) {
		return res.redirect('/login')
	}
	next()
}

// Function to verify if the user has admin role
exports.verifyAdmin = (req, res, next) => {
	if (!req.session.user || req.session.user.role !== 'admin') {
		return res.status(403).send('Access denied')
	}
	next()
}

//Function to verify if the user has admin or organiser role
exports.verifyOrganiser = (req, res, next) => {
	if (!req.session.user || (req.session.user.role !== 'admin' && req.session.user.role !== 'organiser')) {
		return res.status(403).send('Access denied')
	}
	next()
}
