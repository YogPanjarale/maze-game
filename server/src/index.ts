require('dotenv').config();
import express from "express";
import {login, signup} from "./auth";
import { client } from "./db";
const app = express();
app.use(express.json());
app.post("/login", login);
app.post("/signup",signup)
client.connect(err => {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Connected to MongoDB");
	app.listen(process.env.PORT || 3000, () => {
		console.log("Listening on port 3000");
	});
});