<script>
  import "../app.css"
	import { onMount } from 'svelte'
	import { getCurrentUser } from "$lib/functions/auth"
	import Header from "$lib/components/Header.svelte"
	import Footer from "$lib/components/Footer.svelte"
	import { fade } from 'svelte/transition'
	import { classList } from 'svelte-body'
	import { userStore } from "$lib/store"
	import { goto } from "$app/navigation"
	import Toast from "$lib/components/Toast.svelte"
	import publicRoutes from "$lib/data/publicRoutes.json"

	let isSiteReadyToLoad = false
	onMount(async() => {
		if($userStore === null) {
			await getCurrentUser()
			if($userStore === null) {
				goto(publicRoutes.includes(window.location.pathname) ? window.location.pathname : "/login")
			} else {
				goto(["/login", "/register"].includes(window.location.pathname) ? "/feed" : window.location.pathname)
			}
		}
		isSiteReadyToLoad = true
	})

</script>

<svelte:head>
  <title>Friendster</title>
</svelte:head>

{#if isSiteReadyToLoad}
<div transition:fade>
	<Header />

	<Toast />

	<main class="bg-gray-50 dark:bg-gray-800 pt-24 pb-10 pl-5 pr-5 lg:pl-0 lg:pr-0 dark:text-white flex justify-center">
		<slot />
	</main>
	 
	<Footer />
</div>
{/if}