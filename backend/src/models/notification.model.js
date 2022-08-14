import { DataTypes } from 'sequelize'
import { sequelize } from '../configs/db.config.js'

const Notification = sequelize.define('Notification', {
  notificationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
	message: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, 
{})

export default Notification
