import { fetcher } from "@/helpers/axios";

export default function Test() {
	async function handleCurrentUser() {
		const currentUser = await fetcher.get("/auth/current");
	}
	return (
		<div>
			<button onClick={handleCurrentUser}>Click to fetch user</button>
		</div>
	);
}
