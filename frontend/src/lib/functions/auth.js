import {user} from "$lib/store"
import publicRoutes from "$lib/data/publicRoutes.json"
import {goto} from "$app/navigation"
import {validateToken} from "$lib/functions/validateToken"

export const auth = async() => {

	// validate token and set user if valid
	const validToken = await validateToken()
	/* if (validToken) {
		user.set(await getUser())
	} */

	// redirect to feed if user is logged in
	if (validToken) {
		goto("/feed")
	}
	
	user.set({})
	goto("/login")
}