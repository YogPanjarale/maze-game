import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, getUser, verifyUser } from "./models/User";

const KEY =
	"mdkmjvnkjfdnjdfnvkjfnvjfofjiohvb IDHFBON UJFGBCG8YFCIU EBDFCYIBJGTRD XOUCHKJBDG IURTHBNUIRJ";
export const login = async (req: Request, res: Response) => {
	if (!req.body) {
		return res.status(400).json({
			error: "No body",
			status: 400,
		});
	}
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({
			error: "No username or password",
			status: 400,
		});
	}
	const user = await verifyUser(username, password);
	if (user.error) {
        return res.status(user.status).json({
            error: user.error,
            status: user.status,
        });

    }
	return res.json({
		username,
		token: jwt.sign({ username }, KEY),
		// user,
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
