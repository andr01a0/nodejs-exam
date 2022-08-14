import { DataTypes } from 'sequelize'
import { sequelize } from '../configs/db.config.js'

const Profile = sequelize.define('Profile', {
  profileId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
	imageBlob: {
		type: DataTypes.BLOB('long'),
		allowNull: false
	},
  imageMIME: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, 
{})

export default Profile
