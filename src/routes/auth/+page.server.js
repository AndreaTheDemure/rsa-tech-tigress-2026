/** @import { Actions } from "./$types" */

import { Session, User } from "$lib/sequelize";
import { redirect } from "@sveltejs/kit";

/** @param {import("sequelize").Model<any, any>} session  */
async function validateSession(session) {
	// @ts-ignore
	const expDate = new Date(session.expiration);
	if (expDate < new Date()) {
		session.destroy();
		throw redirect(303, "/auth");
	}
}

export const load = async (event) => {
	const sessionId = event.cookies.get("sessionId");
	if (!sessionId) return;
	const session = await Session.findOne({
		where: {
			id: sessionId,
		},
	});
	if (session) {
		validateSession(session);
		throw redirect(303, "/");
	}
};

/** @satisfies {Actions} */
export const actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const password = formData.get("password"),
			username = formData.get("username");
		const user = await User.findOne({
			where: {
				username,
				password,
			},
		});
		if (!user) {
			return { success: false };
		}
		// @ts-ignore
		const session = await user.createSession({});
		event.cookies.set("sessionId", session.id, { path: "/" });
		throw redirect(303, "/");
	},
	signup: async (event) => {
		const formData = await event.request.formData();
		const password = formData.get("password"),
			username = formData.get("username");
		const existingUser = await User.findOne({
			where: {
				username,
			},
		});
		if (existingUser) {
			return { usernameTaken: true };
		}
		const user = await User.create({
			username,
			password,
		});
		// @ts-ignore
		const session = await user.createSession({});
		event.cookies.set("sessionId", session.id, { path: "/" });
		throw redirect(303, "/");
	},
};
