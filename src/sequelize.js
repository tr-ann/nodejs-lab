require('dotenv').config();
import Sequelize from 'sequelize'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.HOST,
	dialect: process.env.DIALECT,
	logging: false
})

async function connect() {
	try {
		await sequelize.authenticate();

	} catch (err) {
		console.error('Unable to connect to the database:', err);
	}

	console.log('Connection has been established successfully.');

	await sequelize.sync();
}

export { sequelize, connect }