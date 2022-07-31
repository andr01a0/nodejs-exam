import apiService from '../services/api.service.js'

export default {
	getMatches: async (req, res, next) => {
		try {
			res.json(await apiService.getMatches())
		} catch (err) {
			next(err)
		}
	},
	createMatch: async (req, res, next) => {
		try {
			res.json(await apiService.createMatch(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	getMatchById: async (req, res, next) => {
		try {
			res.json(await apiService.getMatchById(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	updateMatchById: async (req, res, next) => {
		try {
			res.json(await apiService.updateMatchById(req, res, next))
		} catch (err) {
			next(err)
		}
	},
	deleteMatchById: async (req, res, next) => {
		try {
			res.json(await apiService.deleteMatchById(req, res, next))
		} catch (err) {
			next(err)
		}
	}
}
