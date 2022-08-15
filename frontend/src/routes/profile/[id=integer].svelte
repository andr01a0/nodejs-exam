<script>
  import { Card, Fileupload, Button, Label } from "flowbite-svelte"
	import { showToastAndHideAfter } from "$lib/functions/toast"
	import { userStore } from "$lib/store"
	import backendServer from "$lib/data/backendServer.json"
	import { onMount } from 'svelte'
	import { goto, afterNavigate } from "$app/navigation";
	import { fetchProfilePicture } from "$lib/functions/profile";

	$: profilePicture = '/images/defaultAvatar.png'
	

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
				const profileResponse = await fetch(`${backendServer}/api/profile`, {
					method: "POST",
					body: formData,
					credentials: "include"
				})
				if(profileResponse.ok) {
					profilePicture = await fetchProfilePicture(userProfileId)
					if(profilePicture === false) {
						showToastAndHideAfter("Error", "Could not fetch profile")
						goto('/feed')
					}
				} else showToastAndHideAfter("Error", "Something went wrong")
			}
		} else showToastAndHideAfter("Error", "Please select a file")
  }

  // populated with data from the endpoint
  export let userProfileId

	onMount(async () => {
		profilePicture = await fetchProfilePicture(userProfileId)
		if(profilePicture === false) {
			showToastAndHideAfter("Error", "Could not fetch profile")
			goto('/feed')
		}
	})

	afterNavigate(async ({ from, to }) => {
		if(to.pathname.toString().includes('/profile')) {
			profilePicture = await fetchProfilePicture(userProfileId)
			if(profilePicture === false) {
				showToastAndHideAfter("Error", "Could not fetch profile")
				goto('/feed')
			}
		}
	})

</script>

<Card bind:img={profilePicture} reverse={false} class="text-center p-2">
	{#if $userStore.userId === parseInt(userProfileId)}
  <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{`${$userStore.firstName} ${$userStore.lastName}`}</h5>
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