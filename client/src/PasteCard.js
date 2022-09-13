import React from "react";
import { useState } from "react";

export default function PasteCard({ paste }) {
	const [showPaste, togglePaste] = useState(false);

	return (
		<div key={paste._id} className="paste" onClick={() => togglePaste(!showPaste)}>
			<div>id: {paste._id}</div>
			<div>Author: {paste.author}</div>
			<div>Title: {paste.title}</div>
			{showPaste ? (
				<div>
					Text:
					<div className="pastebox">{paste.text}</div>
				</div>
			) : (
				<></>
			)}
			<div>Date: {paste.date}</div>
			<br />
		</div>
	);
}
