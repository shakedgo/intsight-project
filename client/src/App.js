import axios from "axios";
import { useEffect, useState } from "react";
import PasteCard from "./PasteCard";

export default function App() {
	const [pastes, setPastes] = useState();
	const [searchTerm, setSearchTerm] = useState();
	const [allPastes, setAllPastes] = useState();
	const [filter, setFilter] = useState("author");

	useEffect(() => {
		axios.get("/get-pastes").then((res) => {
			setPastes(res.data);
			setAllPastes(res.data);
		});
	}, []);

	useEffect(() => {
		const search = () => {
			let newPaste = [];
			console.log(filter);
			allPastes.forEach((res) => {
				if (filter === "author") {
					if (res.author.includes(searchTerm)) newPaste.push(res);
				} else if (filter === "title") {
					if (res.title.includes(searchTerm)) newPaste.push(res);
				} else if (filter === "text") {
					if (res.text.includes(searchTerm)) newPaste.push(res);
				}
			});
			setPastes(newPaste);
		};
		const timeoutId = setTimeout(() => {
			if (searchTerm !== undefined) search();
		}, 300);
		return () => clearTimeout(timeoutId);
	}, [searchTerm, allPastes, filter]);
	return (
		<>
			{pastes !== undefined ? (
				<div className="post">
					<input key="inpt" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
					<select onChange={(e) => setFilter(e.target.value)}>
						<option value="author" selected>
							Author
						</option>
						<option value="title">Title</option>
						<option value="text">Text</option>
					</select>
					{pastes.map((paste) => {
						return <PasteCard paste={paste} />;
					})}
				</div>
			) : (
				<h1>Loading</h1>
			)}
		</>
	);
}
