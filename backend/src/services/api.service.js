import { models } from '../configs/db.models.config.js'

export default {
	getMatches: async (req, res, next) => {
			return await models.Match.findAll()
	},
	createMatch: async (req, res, next) => {
		const match = await models.Match.create({
			matchName: req.body.matchName,
			leftTeam: req.body.leftTeam,
			rightTeam: req.body.rightTeam,
			score: req.body.score,
			username: req.user.username
		})
		return match
	},
	getMatchById: async (req, res, next) => {
		return await models.Match.findOne({
			where: {
				matchId: req.params.id
			}
		})
	},
	updateMatchById: async (req, res, next) => {
		const data = {}
		if (req.body.matchName) data.matchName = req.body.matchName
		if (req.body.leftTeam) data.leftTeam = req.body.leftTeam
		if (req.body.rightTeam) data.rightTeam = req.body.rightTeam
		if (req.body.score) data.score = req.body.score
		return await models.Match.update(data, {
			where: {
				matchId: req.params.id
			}
		})
	},
	deleteMatchById: async (req, res, next) => {
		return await models.Match.destroy({
			where: {
				matchId: req.params.id
			}
		})
	}
}
