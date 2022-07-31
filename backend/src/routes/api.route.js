import express from 'express'
const router = express.Router()
import apiController from '../controllers/api.controller.js'

// user
router
.get('/match', function(req, res, next) {
  apiController.getMatches(req, res, next)
})
.post('/match', function(req, res, next) {
  apiController.createMatch(req, res, next)
})
.get('/match/:id', function(req, res, next) {
  apiController.getMatchById(req, res, next)
})
.put('/match/:id', function(req, res, next) {
  apiController.updateMatchById(req, res, next)
})
.delete('/match/:id', function(req, res, next) {
  apiController.deleteMatchById(req, res, next)
})

export default router
