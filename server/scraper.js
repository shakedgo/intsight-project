const axios = require("axios");
const cheerio = require("cheerio");
const chrono = require("chrono-node");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { resolve } = require("path");

const uri = "mongodb+srv://shakedgo:1234567890@cluster0.7rxdu3v.mongodb.net/?retryWrites=true&w=majority";
// should be in .env or vault if was super secret.
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

const scrape = () => {
	return new Promise(async (res, rej) => {
		let author = [];
		let title = [];
		let date = [];
		let text = [];
		let ids = [];
		let page = await axios({
			url: "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists",
			proxy: {
				host: "localhost",
				port: 8118,
			},
		});

		const $ = cheerio.load(page.data);
		$(".first").each((i, element) => {
			title.push($(element).text().trimStart().trimEnd());
			ids.push($(element).find("a").attr("href").split("/")[4]);
			$(element)
				.siblings("td")
				.each((siblingIndex, sibling) => {
					if (siblingIndex === 0) author.push($(sibling).text());
					if (siblingIndex === 2) {
						date.push(chrono.parseDate($(sibling).text()).toUTCString());
					}
				});
		});

		let count = 0;
		ids.forEach(async (id, index) => {
			let textFetch = await axios({
				url: `http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/view/raw/${id}`,
				proxy: {
					host: "localhost",
					port: 8118,
				},
			});
			text[index] = textFetch.data;
			count++;
			if (count === 50) {
				console.log("Starting to add data to database");
				client.connect(async (err) => {
					if (err) throw err;
					const collection = client.db("DarkPaste").collection("pastes");
					for (let i = 0; i < text.length; i++) {
						await collection.updateMany(
							{ _id: ids[i] },
							{
								$set: {
									_id: ids[i],
									author: author[i],
									title: title[i],
									text: text[i],
									date: date[i],
								},
							},
							{ upsert: true }
						);
					}
				});
				client.close();
				res("Added pastes to database");
			}
		});
	});
};
module.exports = { scrape };
