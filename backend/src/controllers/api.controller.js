import apiService from '../services/api.service.js'

export default {
	updateProfile: async (req, res, next) => {
		try {
			res.json(await apiService.updateProfile(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	getProfileByUserId: async (req, res, next) => {
		try {
			res.json(await apiService.getProfileByUserId(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	createUser: async (req, res, next) => {
		try {
			return await apiService.createUser(req, res, next)
		} catch (err) {
			next(err)
		}
	},
	getUserByEmail: async (email, next) => {
		try {
			return await apiService.getUserByEmail(email)
		} catch (err) {
			next(err)
		}
	},
	getUserById: async (id, next) => {
		try {
			return await apiService.getUserById(id)
		} catch (err) {
			next(err)
		}
	},
	getHasNotificationByUserId: async (req, res, next) => {
		try {
			res.json(await apiService.getHasNotificationByUserId(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	getNotificationByUserId: async (req, res, next) => {
		try {
			res.json(await apiService.getNotificationByUserId(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	toggleHasNotification: async (req, res, next) => {
		try {
			res.json(await apiService.toggleHasNotification(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	getAllNotificationByUserId: async (req, res, next) => {
		try {
			res.json(await apiService.getAllNotificationByUserId(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	getFullNameByUserId: async (req, res, next) => {
		try {
			res.json(await apiService.getFullNameByUserId(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	getFriendsByUserId: async (req, res, next) => {
		try {
			res.json(await apiService.getFriendsByUserId(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	getFriendRequestsByUserId: async (req, res, next) => {
		try {
			res.json(await apiService.getFriendRequestsByUserId(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	getAllUsersExceptById: async (req, res, next) => {
		try {
			res.json(await apiService.getAllUsersExceptById(req, res, next))
		} catch (err) {
			next(err)
		}
	}
}