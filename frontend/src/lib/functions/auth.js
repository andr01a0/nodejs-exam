import backendServer from "$lib/data/backendServer.json"
import { userStore } from "$lib/store"

const validateToken = async() => {
	try {
		const response = await fetch(`${backendServer}/api/getCurrentUser`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include"
		})
		
		if (response.status === 200) {
			return await response.json()
		}
		return false
	} catch (error) {
		return false
	}
}

export const login = async () => {
	
	const userFromValidToken = await validateToken()
	if (userFromValidToken !== false) {
		userStore.set(userFromValidToken)
	} else
		userStore.set(null)
		
}

export const logout = async () => {
	const response = await fetch(`${backendServer}/logout`, {
		method: "GET",
		credentials: "include"
	})

	if(response.status === 200) {
		userStore.set(null)
	}
}