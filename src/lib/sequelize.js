import { Sequelize, DataTypes } from "sequelize";
import { DB_URL } from "$env/static/private";

const sequelize = new Sequelize(DB_URL);
await sequelize.authenticate();

const User = sequelize.define("User", {
	username: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	password: {
		type: DataTypes.STRING,
	},
});
const Session = sequelize.define("Session", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	expiration: {
		type: DataTypes.STRING,
		defaultValue: () => {
			const val = new Date();
			if (val.getMonth() === 12) {
				val.setMonth(1);
				val.setFullYear(val.getFullYear() + 1);
				return val.toISOString();
			}
			val.setMonth(val.getMonth() + 1);
			return val.toISOString();
		},
	},
});

User.hasMany(Session);
Session.belongsTo(User);

await sequelize.sync();

export { sequelize, User, Session };
