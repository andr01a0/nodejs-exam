<script>
  import "../app.css"
	import { onMount } from 'svelte'
	import { auth } from "$lib/functions/auth";
	import Header from "$lib/components/Header.svelte"
	import Footer from "$lib/components/Footer.svelte"
	import { fade } from 'svelte/transition'
	import { afterNavigate } from '$app/navigation'

	let isSiteReadyToLoad = false
	onMount(async() => {
		await auth()
		isSiteReadyToLoad = true
	})

	afterNavigate(async ({ from, to }) => {
		const possiblePaths = ["/feed","/timeline","/friends"]
		if(possiblePaths.includes(to.pathname.toString()))
			activeNavLink = to.pathname
		else
			activeNavLink = null
		return true;
	})

</script>

<svelte:head>
  <title>Friendster</title>
</svelte:head>

{#if isSiteReadyToLoad}
<div transition:fade>
	<Header />

	<div class="bg-white dark:bg-gray-800 mt-20 mb-10 text-center">
		<slot />
	</div>
	 
	<Footer />
</div>
{/if}