import axios from "axios";
import { useEffect, useState } from "react";
import PasteCard from "./PasteCard";

export default function App() {
	const [pastes, setPastes] = useState();
	const [searchTerm, setSearchTerm] = useState();
	const [allPastes, setAllPastes] = useState();

	useEffect(() => {
		axios.get("/get-pastes").then((res) => {
			setPastes(res.data);
			setAllPastes(res.data);
		});
	}, []);

	useEffect(() => {
		const search = () => {
			let newPaste = [];
			allPastes.forEach((res) => {
				if (res.title.includes(searchTerm)) newPaste.push(res);
			});
			setPastes(newPaste);
		};
		const timeoutId = setTimeout(() => {
			if (searchTerm !== undefined) search();
		}, 300);
		return () => clearTimeout(timeoutId);
	}, [searchTerm, allPastes]);
	return (
		<>
			{pastes !== undefined ? (
				<div className="post">
					<input key="inpt" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
