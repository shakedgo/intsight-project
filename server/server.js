const express = require("express");
const cors = require("cors");
const path = require("path");
const { scrape } = require("./scraper");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { throws } = require("assert");

const uri = "mongodb+srv://shakedgo:1234567890@cluster0.7rxdu3v.mongodb.net/?retryWrites=true&w=majority";
// should be in .env or vault if was super secret.
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (_req, res) => {
	res.json({ username: "shakedgo" });
});

app.get("/scrape-paste", (_req, res) => {
	const pasteScrape = async () => {
		let result = await scrape();
		res.send(result);
	};
	pasteScrape();
});

app.get("/get-pastes", (_req, res) => {
	client.connect(async (err) => {
		if (err) throw err;
		const collection = client.db("DarkPaste").collection("pastes");
		const result = await collection.find({}).toArray();
		res.send(result);
		client.close();
	});
});

app.get("/get", (_req, res) => {
	res.sendFile(path.join(process.cwd(), "./main.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
