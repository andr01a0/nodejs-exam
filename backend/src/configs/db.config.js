import Sequelize from "sequelize"

// Override timezone formatting by requiring the Sequelize and doing it here instead
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options)

  // Z here means current timezone, _not_ UTC
  return date.format('YYYY-MM-DDTHH:mm:ssZ')
}

export const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
  dialect: 'sqlite',
  storage: './db.sqlite',
	logging: false
})
