#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.js'
import debug from 'debug'
debug('backend:server')
import http from 'http'
import { Server } from 'socket.io'
import onConnection from '../src/middlewares/socket.middleware.js'

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Create Socket server.
 */

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/* const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)

io.use(wrap(passport.initialize()))

io.use(wrap(passport.authenticate('jwt', { session: false })))

io.use((socket, next) => {
  console.log(socket.request)
  if (socket.request.user) {
    next()
  } else {
    next(new Error('unauthorized'))
  }
}) */

io.on('connection', onConnection)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}