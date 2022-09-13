const express = require("express");
const cors = require("cors");
const path = require("path");
const { scrape } = require("./scraper");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (_req, res) => {
	res.json({ username: "shakedgo" });
});

app.get("/get-paste", (_req, res) => {
	const pasteScrape = async () => {
		let result = await scrape();
		res.send(result);
	};
	pasteScrape();
});

app.get("/get", (_req, res) => {
	res.sendFile(path.join(process.cwd(), "./main.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
