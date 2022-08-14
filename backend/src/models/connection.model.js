import { DataTypes } from 'sequelize'
import { sequelize } from '../configs/db.config.js'

const Connection = sequelize.define('Connection', {
  connectionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'PENDING'
	}
}, 
{})

export default Connection
