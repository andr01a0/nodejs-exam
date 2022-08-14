import { sequelize } from '../configs/db.config.js'
import User from '../models/user.model.js'
import Profile from '../models/profile.model.js'
import Notification from '../models/notification.model.js'
/* import HasNotification from '../models/hasNotification.model.js'
import Connection from '../models/connection.model.js'
import Comment from '../models/comment.model.js'
import Like from '../models/like.model.js' */

Profile.User = Profile.belongsTo(User)
Notification.User = Notification.belongsTo(User)

await sequelize.sync()

export const models = {
	User,
	Profile,
	/* Notification,
	HasNotification,
	Connection,
	Comment,
	Like */
}