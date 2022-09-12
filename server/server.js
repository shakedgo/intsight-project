const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const chrono = require("chrono-node");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (_req, res) => {
	res.json({ username: "shakedgo" });
});

app.get("/get-paste", (_req, res) => {
	let author = [];
	let title = [];
	let date = [];
	let text = [];
	let ids = [];
	axios({
		url: "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists",
		proxy: {
			host: "localhost",
			port: 8118,
		},
	}).then((page) => {
		const $ = cheerio.load(page.data);
		$(".first").each(async (i, element) => {
			title[i] = $(element).text().trimStart().trimEnd();
			$(element)
				.siblings("td")
				.each((siblingIndex, sibling) => {
					if (siblingIndex === 0) author[i] = $(sibling).text();
					if (siblingIndex === 2) {
						date[i] = chrono.parseDate($(sibling).text()).toUTCString();
					}
				});
			const id = $(element).find("a").attr("href").split("/")[4];
			let textFetch = await axios({
				url: `http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/view/raw/${id}`,
				proxy: {
					host: "localhost",
					port: 8118,
				},
			});
			text[i] = textFetch.data.trimStart().trimEnd();
			ids[i] = id;

			let arrobj = [];
			if (text.length === 50) {
				for (let i = 0; i < title.length; i++) {
					arrobj.push({ id: ids[i], author: author[i], title: title[i], text: text[i], date: date[i] });
				}
				res.send(arrobj);
			}
		});
	});
});

app.get("/get", (_req, res) => {
	res.sendFile(path.join(process.cwd(), "./main.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
