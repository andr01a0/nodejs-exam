/** @type {import('@sveltejs/kit').RequestHandler} */

import backendServer from "$lib/data/backendServer.json"

export async function GET() {

  try {
		const response = await fetch(`${backendServer}/logout`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"credentials": "include"
			}
		})
		
		if (response.status === 200) {
			return true
		}
	} catch (error) {
		return false
	}

  return {
    headers: { Location: '/login' },
    status: 302
  }
}