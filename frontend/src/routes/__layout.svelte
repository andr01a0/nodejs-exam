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

<svelte:body use:classList={'self-center whitespace-nowrap font-semibold dark:text-white'}/>

{#if isSiteReadyToLoad}
<div transition:fade>
	<Header />

	<Toast />

	<main class="bg-white dark:bg-gray-800 mt-20 mb-10 dark:text-white flex justify-center">
		<slot />
	</main>
	 
	<Footer />
</div>
{/if}