import { models } from '../configs/db.models.config.js'
import { sequelize } from '../configs/db.config.js'
import fs from 'fs'
import { QueryTypes, Op } from 'sequelize'
import { userDTO } from '../dto/user.js'

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
		WHERE (c.fromUserId = :userId OR c.toUserId = :userId) AND n.fromUserId != :userId AND c.status = 'FRIENDS'`,
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
	},
	getFriendsByUserId: async (req, res, next) => {
		const friends = await sequelize.query(`SELECT u.* FROM Users u 
		INNER JOIN Connections c ON u.userId = c.toUserId OR u.userId = c.fromUserId
		WHERE (c.fromUserId = :userId OR c.toUserId = :userId) AND u.userId != :userId AND c.status = 'FRIENDS'`,
			{
				replacements: { userId: req.params.id },
				type: QueryTypes.SELECT
			},
		)
		friends.forEach(friend => {
			delete friend.password
			delete friend.createdAt
			delete friend.updatedAt
		} )
		return friends
	},
	getFriendRequestsByUserId: async (req, res, next) => {
		const friendRequests = await sequelize.query(`SELECT u.* FROM Users u 
		INNER JOIN Connections c ON u.userId = c.fromUserId
		WHERE c.toUserId = :userId AND c.status = 'PENDING'`,
			{
				replacements: { userId: req.params.id },
				type: QueryTypes.SELECT
			},
		)
		friendRequests.forEach(friendRequest => {
			delete friendRequest.password
			delete friendRequest.createdAt
			delete friendRequest.updatedAt
		} )
		return friendRequests
	},
	getAllUsersExceptById: async (req, res, next) => {
		return await models.User.findAll({ attributes: {exclude: ['password', 'createdAt', 'updatedAt']}, where: { userId: { [Op.ne]: req.params.id } } })
	},
	isFriendById: async (req, res, next) => {
		const isFriend = await sequelize.query(`SELECT * FROM Connections WHERE (fromUserId = :userId AND toUserId = :friendId) OR (fromUserId = :friendId AND toUserId = :userId) AND (status = 'FRIENDS' OR status = 'PENDING')`,
			{
				replacements: { userId: req.params.userId, friendId: req.params.friendId },
				type: QueryTypes.SELECT
			}
		)
		return (isFriend.length > 0)
	},
	addFriend: async (req, res, next) => {
		const t = await sequelize.transaction()
		try {
			const connection = await models.Connection.create({
				fromUserId: req.body.userId,
				toUserId: req.body.friendId,
				status: 'PENDING'
			}, { transaction: t })
			await t.commit()
			return connection
		} catch (error) {
			await t.rollback()
			next(error)
		}
	},
	removeFriend: async (req, res, next) => {
		// get the possible connections then delete it
		const connections = await sequelize.query(`SELECT * FROM Connections WHERE (fromUserId = :userId AND toUserId = :friendId) OR (fromUserId = :friendId AND toUserId = :userId)`,
		{
			replacements: { userId: req.params.userId, friendId: req.params.friendId },
			type: QueryTypes.SELECT
		})
		const t = await sequelize.transaction()
		try {
			await models.Connection.destroy({ where: { connectionId: connections[0].connectionId } }, { transaction: t })
			await t.commit()
			return true
		} catch (error) {
			await t.rollback()
			next(error)
		}
	},
	acceptFriendRequest: async (req, res, next) => {
		// get the possible pending connections then update it
		const connections = await sequelize.query(`SELECT * FROM Connections WHERE (fromUserId = :friendId AND toUserId = :userId) AND status = 'PENDING'`,
		{
			replacements: { userId: req.body.userId, friendId: req.body.friendId },
			type: QueryTypes.SELECT
		})
		const t = await sequelize.transaction()
		try {
			await models.Connection.update({ status: 'FRIENDS' }, { where: { connectionId: connections[0].connectionId } }, { transaction: t })
			await t.commit()
			return true
		}
		catch (error) {
			await t.rollback()
			next(error)
		}
	},
	getUserComments: async (req, res, next) => {
		return await sequelize.query(`SELECT c.*, u.firstName, u.lastName FROM Comments c 
		INNER JOIN Users u ON c.fromUserId = u.userId
		WHERE c.toUserId = :userId`,
			{
				replacements: { userId: req.params.userId },
				type: QueryTypes.SELECT
			}
		)
	},
	addComment: async (req, res, next) => {
		const t = await sequelize.transaction()
		try {
			const comment = await models.Comment.create({
				fromUserId: req.body.userFrom,
				toUserId: req.body.userTo,
				message: req.body.comment
			}, { transaction: t })
			// create notification if not the same user
			if (req.body.userFrom !== parseInt(req.body.userTo)) {
				await models.Notification.create({
					fromUserId: req.body.userFrom,
					userId: req.body.userTo,
					message: `${req.body.userFromName} commented on ${req.body.userToName} profile`
				}, { transaction: t })
				// update hasNotification to true
				await models.User.update({ hasNotification: true }, { where: { userId: req.body.userTo } }, { transaction: t })
			}
			await t.commit()
			return comment
		} catch (error) {
			await t.rollback()
			next(error)
		}
	},
	isAFriend: async (req, res, next) => {
		const isFriend = await sequelize.query(`SELECT * FROM Connections WHERE (fromUserId = :userId AND toUserId = :friendId) OR (fromUserId = :friendId AND toUserId = :userId) AND status = 'FRIENDS'`,
			{
				replacements: { userId: req.params.userId, friendId: req.params.friendId },
				type: QueryTypes.SELECT
			}
		)
		return (isFriend.length > 0)
	}
}