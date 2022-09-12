import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
	const [pastes, setPastes] = useState();
	useEffect(() => {
		axios.get("/get-paste").then((res) => setPastes(res.data));
	}, []);
	let count = 0;
	return (
		<>
			{pastes !== undefined ? (
				<div className="paste">
					{pastes.map((paste) => {
						return (
							<div key={count++}>
								<div>id: {paste.id}</div>
								<div>Author: {paste.author}</div>
								<div>Title: {paste.title}</div>
								<div>
									Text:
									<div className="pastebox">{paste.text}</div>
								</div>
								<div>Date: {paste.date}</div>
								<br />
							</div>
						);
					})}
				</div>
			) : (
				<h1>Loading</h1>
			)}
		</>
	);
}
