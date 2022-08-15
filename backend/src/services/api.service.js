import { models } from '../configs/db.models.config.js'
import { sequelize } from '../configs/db.config.js'
import fs from 'fs'
import { QueryTypes } from 'sequelize'

const defaultProfilePicture = fs.readFileSync('./public/images/friendster.png')

export default {
	updateProfile: async (req, res, next) => {

		const data = {
			imageBlob: fs.readFileSync(req.file.path),
			imageMIME: req.file.mimetype
		}

		return await models.Profile.update(data, { where: { userId: req.body.userId } })
	},
	getProfileByUserId: async (req, res, next) => {
		const profile = await models.Profile.findOne({ where: { userId: req.params.id } })
		if(profile)
			return profile
		else
			throw new Error('Profile not found')
	},
	createUser: async (req, res, next) => {
		const t = await sequelize.transaction()
		try {
			const user = await models.User.create(req.body, { transaction: t })

			await models.Profile.create({
				imageBlob: defaultProfilePicture,
				imageMIME: 'image/png',
				userId: user.dataValues.userId
			}, { transaction: t })

			await models.HasNotification.create({
				userId: user.dataValues.userId
			}, { transaction: t })

			await t.commit()

			return user
		} catch (error) {
			await t.rollback()
			next(error)
		}
	},
	getUserByEmail: async (email) => {
		return await models.User.findOne({ where: { email } })
	},
	getUserById: async (id) => {
		return await models.User.findOne({ where: { userId: id } })
	},
	getHasNotificationByUserId: async (req, res, next) => {
		return await models.HasNotification.findOne({ where: { userId: req.params.id } })
	},
	getNotificationByUserId: async (req, res, next) => {
		return await models.Notification.findAll({ where: { userId: req.params.id }, limit: 5 })
	},
	toggleHasNotification: async (req, res, next) => {
		const data = {status: 0}
		return await models.HasNotification.update(data, { where: { userId: req.body.userId } })
	},
	getAllNotificationByUserId: async (req, res, next) => {
		const notifications = await sequelize.query(`SELECT n.* FROM Notifications n 
		INNER JOIN Connections c ON n.fromUserId = c.toUserId OR n.fromUserId = c.fromUserId
		WHERE (c.fromUserId = :userId OR c.toUserId = :userId) AND n.fromUserId != :userId`,
			{
				replacements: { userId: req.params.id },
				type: QueryTypes.SELECT
			},
		)
		return notifications
	},
	getFullNameByUserId: async (req, res, next) => {
		const fullName = await sequelize.query(`SELECT (firstName || ' ' || lastName) AS fullName FROM Users WHERE userId = :userId`,
			{
				replacements: { userId: req.params.id },
				type: QueryTypes.SELECT
			},
		)
		return fullName[0].fullName
	}
}


/* 	getMatches: async (req, res, next) => {
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
 */