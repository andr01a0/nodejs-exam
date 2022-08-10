import backendServer from "$lib/data/backendServer.json"
import publicRoutes from "$lib/data/publicRoutes.json"

// Check if token is valid
export const validateToken = async() => {
	try {
		const response = await fetch(`${backendServer}/api/getCurrentUser`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include"
		})
		
		if (response.status === 200) {
			return true
		}
	} catch (error) {
		return false
	}
}