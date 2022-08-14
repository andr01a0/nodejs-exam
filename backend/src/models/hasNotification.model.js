import { DataTypes } from 'sequelize'
import { sequelize } from '../configs/db.config.js'

const HasNotification = sequelize.define('HasNotification', {
  hasNotificationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false
	}
}, 
{})

export default HasNotification
