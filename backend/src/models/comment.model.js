import { DataTypes } from 'sequelize'
import { sequelize } from '../configs/db.config.js'

const Comment = sequelize.define('Comment', {
  commentId: {
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

export default Comment
