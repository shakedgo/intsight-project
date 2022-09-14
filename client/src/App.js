import axios from "axios";
import { useEffect, useState } from "react";
import PasteCard from "./PasteCard";

export default function App() {
	const [pastes, setPastes] = useState();
	const [paste, reloadPaste] = useState();

	useEffect(() => {
		axios.get("/get-pastes").then((res) => setPastes(res.data));
	}, [paste]);
	return (
		<>
			{pastes !== undefined ? (
				<div className="post">
					<button
						onClick={() => {
							axios.get("/scrape-paste").then((res) => reloadPaste(res));
						}}
					>
						Reload data
					</button>
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
