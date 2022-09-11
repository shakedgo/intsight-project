const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const page = require("./index.js");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (_req, res) => {
	res.json({ username: "shakedgo" });
});

app.get("/data", (_req, res) => {
	axios({
		url: "http://rfyb5tlhiqtiavwhikdlvb3fumxgqwtg2naanxtiqibidqlox5vispqd.onion/index.php",
		proxy: {
			host: "localhost",
			port: 8118,
		},
	}).then(console.log);
	res.send();
});

app.get("/get", (_req, res) => {
	res.sendFile(path.join(process.cwd(), "./main.html"));
});

app.get("/get-title", (_req, res) => {
	let title = [];
	let text = [];
	const $ = cheerio.load(page);
	$(".col-sm-5").each(
		(i, element) =>
			(title[i] = $(element)
				.text()
				.replace(/^\s+|\s+$/gm, "")
				.replace("\n", " "))
	);
	$(".text").each(
		(i, element) =>
			(text[i] = $(element)
				.text()
				.replace(/^\s+|\s+$/gm, ""))
	);

	console.log(title.length);
	console.log(text.length);
	let arrobj = [];
	for (let i = 0; i < title.length; i++) arrobj.push({ title: title[i], text: text[i] });
	console.log(arrobj);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
