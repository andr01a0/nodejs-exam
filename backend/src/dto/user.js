export const userDTO = (user) => {
	delete user.dataValues.password
	delete user.dataValues.createdAt
	delete user.dataValues.updatedAt
	return user
}