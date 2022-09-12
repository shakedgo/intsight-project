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

app.get("/get-paste", (_req, res) => {
	const fetch = async () => {
		let author = [];
		let title = [];
		let date = [];
		let page;
		await axios({
			url: "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists",
			proxy: {
				host: "localhost",
				port: 8118,
			},
		}).then((res) => (page = res.data));

		cheerio.load(page);
		const $ = cheerio.load(page);
		$(".first").each((i, element) => {
			title.push($(element).text().trimStart(s).trimEnd());
			$(element)
				.siblings("td")
				.each((siblingIndex, sibling) => {
					if (siblingIndex === 0) author.push($(sibling).text());
					if (siblingIndex === 2) date.push($(sibling).text());
				});
		});

		console.log(author[1]);
		console.log(title[1]);
		console.log(date[1]);

		// let arrobj = [];
		// for (let i = 0; i < title.length; i++) {
		// 	arrobj.push({ author: author[i], title: title[i], text: text[i], date: date[i] });
		// }
		// console.log(arrobj);
		// res.send(arrobj);
	};
	fetch();
});

app.get("/get", (_req, res) => {
	res.sendFile(path.join(process.cwd(), "./main.html"));
});

// app.get("/get-paste-old", (_req, res) => {
// 	let title = [];
// 	let text = [];
// 	let author = [];
// 	let date = [];

// 	const $ = cheerio.load(page);
// 	$(".col-sm-5").each((i, element) => (title[i] = $(element).text().trimStart().trimEnd()));
// 	$(".text").each((i, element) => (text[i] = $(element).text().trimStart().trimEnd()));
// 	$(".col-sm-6:even").each((i, element) => (author[i] = $(element).text().split(" ")[2]));
// 	$(".col-sm-6:even").each((i, element) => (date[i] = $(element).text().split("at ")[1]));

// 	let arrobj = [];
// 	for (let i = 0; i < title.length; i++) {
// 		arrobj.push({ author: author[i], title: title[i], text: text[i], date: date[i] });
// 	}
// 	console.log(arrobj);
// 	res.send(arrobj);
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
