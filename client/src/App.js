import axios from "axios";
import { useState } from "react";

export default function App() {
	const [page, setPage] = useState();
	axios.get("/get").then((res) => setPage(res.data));

	if (page === undefined) return <div>App</div>;
	else return <div>{page}</div>;
}
