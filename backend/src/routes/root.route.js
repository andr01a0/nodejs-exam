import express from 'express'
const router = express.Router()
import apiController from '../controllers/api.controller.js'
import issueJWT from '../utils/jwt.utils.js'
import { userDTO } from '../dto/user.js'

router
.post('/login', async (req, res, next) => {
	const user = await apiController.getUserByEmail(req.body.email, next)

	if (!user) {
		return res.status(401).json({ ok: false, message: 'Wrong email and/or password' })
	}
	
	const validPassword = user.validatePassword(req.body.password, user.password)

	if (!validPassword) {
		return res.status(401).json({ ok: false, message: 'Wrong email and/or password' })
	}

	const tokenObject = issueJWT(user)

	res.cookie('jwt', tokenObject.token.replace('Bearer ', ''), { httpOnly: true, maxAge: tokenObject.expires })

	return res.status(200).json({
		ok: true,
		token: tokenObject.token,
		expiresIn: tokenObject.expires
	})
})
.post('/signup', async (req, res, next) => {
	const user = await apiController.createUser(req, res, next)
	res.json({ ok: true, user: userDTO(user) })
})
.get('/logout', (req, res) => {
	if (req.cookies['jwt']) {
		res.clearCookie('jwt').status(200).json({ ok: true, message: 'You have logged out' })
	} else {
		res.status(401).json({ ok: false, message: 'Invalid jwt' })
	}
})

export default router
