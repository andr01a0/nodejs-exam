import { DataTypes } from 'sequelize'
import { sequelize } from '../configs/db.config.js'

const Like = sequelize.define('Like', {
  likeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
}, 
{})

export default Like
