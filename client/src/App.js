import axios from "axios";
import { useEffect, useState } from "react";
import PasteCard from "./PasteCard";

export default function App() {
	const [pastes, setPastes] = useState();

	useEffect(() => {
		axios.get("/get-pastes").then((res) => setPastes(res.data));
	}, []);
	return (
		<>
			{pastes !== undefined ? (
				<>
					<button onClick={() => axios.get("/scrape-paste").then()}></button>
					<div className="post">
						{pastes.map((paste) => {
							return <PasteCard paste={paste} />;
						})}
					</div>
				</>
			) : (
				<h1>Loading</h1>
			)}
		</>
	);
}
