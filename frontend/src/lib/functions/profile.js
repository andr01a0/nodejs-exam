import backendServer from "$lib/data/backendServer.json"

function arrayBufferToBase64( buffer ) {
	if(buffer === undefined) return ''
	var binary = ''
	var bytes = new Uint8Array( buffer )
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] )
	}
	return window.btoa( binary )
}

export const fetchProfilePicture = async (userId) => {
	const profileResponse = await fetch(`${backendServer}/api/profile/user/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include"
	})
	if(profileResponse.ok) {
		const profile = await profileResponse.json()
		return `data:${profile.imageMIME};charset=utf-8;base64,${arrayBufferToBase64(profile.imageBlob.data)}`
	} else return false
}