const passport = require('passport');
const util = require('../util');
const database = require('../data/database');

module.exports = app => {
	app.get('/user/login-check', util.checkAuth, async (req, res, next) => {
		res.json(req.user);
	});

	app.post('/user/login', util.passportAuth, async (req, res, next) => {
		res.sendStatus(200);
	});

//	app.get('/user/logout', util.auth, async (req, res, next) => {
//		req.session.user = null;
//		req.session.save(err => {
//			if (err) next(err);
//			req.session.regenerate(err => {
//				if (err) next(err);
//				req.logout((err) => {
//					if (err) { console.log(err); return next(err); }
//					res.json({ success: true });
//				});
//			})
//		})
//	});

	app.get('/user/favorites', util.checkAuth, async (req, res, next) => {
		try {
			if (!['artist', 'song'].includes(req.body.type) || !util.isValidUuid(req.body.id)) {
				return res.sendStatus(400);
			}
			await database.query(`insert into user_fav_${req.body.type} values (?, ?)`,
				[ req.user.username, req.body.id ]);
			res.json({success: true});
		} catch (err) {
			console.error(err);
			res.sendStatus(500);
		}
	});

	app.post('/user/favorites', util.checkAuth, async (req, res, next) => {
		try {
			if (!['artist', 'song'].includes(req.body.type) || !util.isValidUuid(req.body.id)) {
				return res.sendStatus(400);
			}
			await database.query(`insert into user_fav_${req.body.type} values (?, ?)`,
				[ req.user.username, req.body.id ]);
			res.json({success: true});
		} catch (err) {
			console.error(err);
			res.sendStatus(500);
		}
	});
};