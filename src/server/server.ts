import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
const axios = require("axios");

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), "client");

app.use(express.static(root));

app.get("/data", (_req, res) => {
	axios({
		url: "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
		proxy: {
			host: "localhost",
			port: 8118,
		},
	}).then(console.log);
	res.send();
});

// app.get("*", (_req, res) => {
// 	res.sendFile(path.join(root, "index.html"));
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
