<script>
  import { Card, Fileupload, Button, Label } from "flowbite-svelte"
	import { showToastAndHideAfter } from "$lib/functions/toast"
	import { userStore } from "$lib/store"
	import backendServer from "$lib/data/backendServer.json"
	import { onMount } from 'svelte'
	import { goto } from "$app/navigation";

  const handleOnSubmit = async (e) => {
		e.preventDefault()
		// get the file from the input
		const files = e.target.querySelector("input[type=file]").files
		if (files.length > 0) {
			const fileSize = files[0].size
			const fileMb = fileSize / 1024 ** 2
			if (fileMb > 2) showToastAndHideAfter("Error", "File size is too big")
			else {
				const file = files[0]
				let formData = new FormData()
				formData.append('file', file)
				formData.append('userId', $userStore.userId)
				// fetch endpoint to upload file
				await fetch(`${backendServer}/api/profile`, {
					method: "POST",
					body: formData,
					credentials: "include"
				})
				fetchProfile()
			}
		} else showToastAndHideAfter("Error", "Please select a file")
  }

  // populated with data from the endpoint
  export let userProfileId

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

	$: profilePicture = '/images/defaultAvatar.png'

	const fetchProfile = async () => {
		const profileResponse = await fetch(`${backendServer}/api/profile/user/${userProfileId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		})
		let profile = ''
		if(!profileResponse.ok){
			showToastAndHideAfter("Error", "Could not fetch profile")
			goto('/feed')
		} else profile = await profileResponse.json()
		profilePicture = `data:${profile.imageMIME};charset=utf-8;base64,${arrayBufferToBase64(profile.imageBlob.data)}`
	}

	onMount(async () => {
		await fetchProfile()
	})

</script>

<Card bind:img={profilePicture} reverse={false} class="text-center p-2">
	{#if $userStore.userId === parseInt(userProfileId)}
  <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Profile</h5>
  <form class="flex flex-col space-y-6" on:submit={handleOnSubmit} enctype="multipart/form-data">
		<Label class="space-y-2">
			<span>Change Profile Picture (MAX FILE SIZE = 2MB)</span>
      <Fileupload />
		</Label>
		<Button type="submit" class="w-full1">Submit</Button>
	</form>
	{:else}
	<h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Profile</h5>
	{/if}
</Card>