import express from 'express'
const router = express.Router()
import User from '../models/user.model.js'
import issueJWT from '../utils/jwt.utils.js'
import { userDTO } from '../dto/user.js'

router
.post('/login', (req, res, next) => {
	User.findOne({where: { username: req.body.username }})
	.then(user => {
		if (!user) {
			return res.status(401).json({ message: 'Wrong username or password' })
		}
		
		const validPassword = user.validatePassword(req.body.password, user.password)

		if (!validPassword) {
			return res.status(401).json({ message: 'Wrong username or password' })
		}

		const tokenObject = issueJWT(user)

		res.cookie('jwt', tokenObject.token.replace('Bearer ', ''), { httpOnly: true, maxAge: tokenObject.expires })

		return res.status(200).json({
			success: true,
			token: tokenObject.token,
			expiresIn: tokenObject.expires
		})
	})
	.catch(err => {
		return next(err)
	})
})
.post('/signup', (req, res, next) => {
	// create new User in sequelize
	User.create(req.body)
	.then(user => {
		// remove password from user object
		res.json({ success: true, user: userDTO(user) })
	})
	.catch(err => {
		return next(err)
	})
})
.get('/logout', (req, res) => {
	if (req.cookies['jwt']) {
			res
			.clearCookie('jwt')
			.status(200)
			.json({
					message: 'You have logged out'
			})
	} else {
			res.status(401).json({
					error: 'Invalid jwt'
			})
	}
})

export default router
