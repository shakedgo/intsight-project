import axios from "axios";
export default function App() {
	axios.get("/sda").then((res) => console.log(res.data));
	return <div>App</div>;
}
