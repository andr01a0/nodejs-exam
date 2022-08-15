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
.get('/notification/user/:id', async (req, res, next) => {
  await apiController.getNotificationByUserId(req, res, next)
})
.get('/notification/all/user/:id', async (req, res, next) => {
  await apiController.getAllNotificationByUserId(req, res, next)
})
.post('/notification/hasNotification', async (req, res, next) => {
  await apiController.toggleHasNotification(req, res, next)
})
.get('/user/fullname/:id', async (req, res, next) => {
  await apiController.getFullNameByUserId(req, res, next)
})
.get('/friend/user/:id', async (req, res, next) => {
  await apiController.getFriendsByUserId(req, res, next)
})
.get('/friend/request/user/:id', async (req, res, next) => {
  await apiController.getFriendRequestsByUserId(req, res, next)
})
.get('/user/except/:id', async (req, res, next) => {
  await apiController.getAllUsersExceptById(req, res, next)
})

export default router
