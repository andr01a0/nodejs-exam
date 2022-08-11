<script>
  import "../app.css"
	import { onMount } from 'svelte'
	import { login } from "$lib/functions/auth";
	import Header from "$lib/components/Header.svelte"
	import Footer from "$lib/components/Footer.svelte"
	import { fade } from 'svelte/transition'
	import { classList } from 'svelte-body'
	import { userStore } from "$lib/store"
	import publicRoutes from "$lib/data/publicRoutes.json"
	import { goto } from "$app/navigation"

	let isSiteReadyToLoad = false
	onMount(async() => {
		if($userStore === null && !publicRoutes.includes(window.location.pathname)) {
			await login()
			if($userStore !== null) {
				goto("/feed")
			} else {
				goto("/login")
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

	<main class="bg-white dark:bg-gray-800 mt-20 mb-10 dark:text-white flex justify-center">
		<slot />
	</main>
	 
	<Footer />
</div>
{/if}