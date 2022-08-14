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
	}
}