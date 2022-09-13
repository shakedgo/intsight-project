const axios = require("axios");
const cheerio = require("cheerio");
const chrono = require("chrono-node");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://shakedgo:1234567890@cluster0.7rxdu3v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
client.connect();

const scrape = async () => {
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
	$(".first").each(async (i, element) => {
		title.push($(element).text().trimStart().trimEnd());
		$(element)
			.siblings("td")
			.each((siblingIndex, sibling) => {
				if (siblingIndex === 0) author.push($(sibling).text());
				if (siblingIndex === 2) {
					date.push(chrono.parseDate($(sibling).text()).toUTCString());
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
		text.push(textFetch.data);
		ids.push(id);
		if (text.length === 50) {
			for (let i = 0; i < title.length; i++) {
				const collection = client.db("DarkPaste").collection("pastes");
				collection.updateOne(
					{ _id: ids[i] },
					{
						$set: {
							author: author[i],
							title: title[i],
							text: text[i],
							date: date[i],
						},
					},
					{ upsert: true }
				);
			}
			console.log("Added pastes to database");
			return "Added pastes to database";
		}
	});
};
module.exports = { scrape };
