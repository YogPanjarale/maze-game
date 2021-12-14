import { Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { createUser, getUser, updateLogin, verifyUser } from "./models/User";

const KEY =
	"mdkmjvnkjfdnjdfnvkjfnvjfofjiohvb IDHFBON UJFGBCG8YFCIU EBDFCYIBJGTRD XOUCHKJBDG IURTHBNUIRJ";

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string().alphanum().min(3).max(10).required(),
})
export const login = async (req: Request, res: Response) => {
	if (!req.body) {
		return res.status(400).json({
			error: "No body",
			status: 400,
		});
	}
	const { username, password } = req.body;
    const { error } = schema.validate({ username, password });
    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
            status: 400,
        });
    }

	if (!username || !password) {
		return res.status(400).json({
			error: "No username or password",
			status: 400,
		});
	}
	const user = await verifyUser(username, password);
    await updateLogin(username);
	if (user.error) {
        return res.status(user.status).json({
            error: user.error,
            status: user.status,
        });

    }
	return res.json({
		username,
		token: jwt.sign({ username,id:user.user!._id }, KEY),
	});
};
export const signup = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({
            error: "No body",
            status: 400,
        });
    }
    const { username, password } = req.body;
    const { error } = schema.validate({ username, password });
    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
            status: 400,
        });
    }
    if (!username || !password) {
        return res.status(400).json({
            error: "No username or password",
            status: 400,
        });
    }
    const user = await getUser(username);
    if (user) {
        return res.status(409).json({
            error: "username already exists",
            status: 409,
        });
    }
    await createUser(username, password);
    return res.json({
        username,
        token: jwt.sign({ username }, KEY),
    });
}
