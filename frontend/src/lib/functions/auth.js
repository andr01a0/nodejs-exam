import backendServer from "$lib/data/backendServer.json"
import { userStore } from "$lib/store"

const validateToken = async() => {
	const response = await fetch(`${backendServer}/api/getCurrentUser`, {
		method: "GET",
		credentials: "include"
	})
	
	try {
		return await response.json()
	}	catch (err) {
		return response
	}
}

export const getCurrentUser = async () => {
	
	const validateTokenResponse = await validateToken()
	if (validateTokenResponse.ok)
		userStore.set(validateTokenResponse.user)
		
}

export const login = async (email, password) => {
	const response = await fetch(`${backendServer}/login`, {
		method: "POST",
		headers:{
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		}),
		credentials: 'include'
	})
	
	try {
		return await response.json()
	}	catch (err) {
		return response
	}
}

export const signup = async (email, password) => {
	const response = await fetch(`${backendServer}/signup`, {
		method: "POST",
		headers:{
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		}),
		credentials: 'include'
	})

	try {
		return await response.json()
	}	catch (err) {
		return response
	}
}

export const logout = async () => {
	const response = await fetch(`${backendServer}/logout`, {
		method: "GET",
		credentials: "include"
	})

	if(response.ok)
		userStore.set(null)

	try {
		return await response.json()
	}	catch (err) {
		return response
	}
}