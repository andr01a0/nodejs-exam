import {user} from "$lib/store";
import publicRoutes from "$lib/data/publicRoutes.json";
import {goto} from "$app/navigation";

// Check if user is logged in
export const validateUserToken = async() => {
  const response = await fetch("/validateToken", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"credentials": "include"
		}
	})
	const data = await response.json();
	if (data.success) {
		user.set(data.user)
		goto("/feed")
	}
	user.set({});
	goto("/login")
}