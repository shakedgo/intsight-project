import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [message, setMessage] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios("http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all");
			console.log(result.data);
			setMessage(result.data);
		};

		fetchData();
	}, []);

	return <div>{message}</div>;
}

export default App;
