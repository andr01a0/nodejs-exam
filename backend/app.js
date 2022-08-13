import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { fileLogger, consoleLogger } from './src/middlewares/logging.middleware.js'
import { error, errorHandler } from './src/middlewares/error.handling.middleware.js'
import passport from 'passport'
import jwtConfig from './src/configs/jwt.config.js'
import apiRoute from './src/routes/api.route.js'
import rootRoute from './src/routes/root.route.js'

const app = express()

// setup the logger
app.use(consoleLogger)
app.use(fileLogger)

// helmet security
app.use('/api/', helmet())

// pass the global passport object to the jwtConfig
jwtConfig(passport)
// passportjs initialization
app.use(passport.initialize())

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// setup cors
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}))

// backend routes
app.use('/api', passport.authenticate('jwt', { session: false }), apiRoute)
app.get('/api/getCurrentUser', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).json({ ok: true, user: req.user })
})
app.use('/', rootRoute)

// catch 404 and forward to error handler
app.use(error)
app.use(errorHandler)

export default app
