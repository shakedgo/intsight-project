const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

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

// const clientPath = path.join(process.cwd(), "./index.html");
app.get("*", (_req, res) => {
	res.sendFile(path.join(process.cwd(), "./index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Hosted: http://localhost:" + port);
});
