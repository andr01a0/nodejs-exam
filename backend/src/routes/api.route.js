import express from 'express'
const router = express.Router()
import apiController from '../controllers/api.controller.js'

// user
router
.get('/profile/user/:id', async (req, res, next) => {
  await apiController.getProfileByUserId(req, res, next)
})
.get('/notification/hasnotification/user/:id', async (req, res, next) => {
  await apiController.getHasNotificationByUserId(req, res, next)
})
.post('/profile', async (req, res, next) => {
  await apiController.updateProfile(req, res, next)
})

export default router
