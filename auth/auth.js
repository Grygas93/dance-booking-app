exports.verify = (req, res, next) => {
	if (!req.session.user) {
		return res.redirect('/login')
	}
	next()
}

exports.verifyAdmin = (req, res, next) => {
	if (!req.session.user || req.session.user.role !== 'admin') {
		return res.status(403).send('Access denied')
	}
	next()
}

exports.verifyOrganiser = (req, res, next) => {
	if (!req.session.user || (req.session.user.role !== 'admin' && req.session.user.role !== 'organiser')) {
		return res.status(403).send('Access denied')
	}
	next()
}
