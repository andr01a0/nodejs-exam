<script>
	import { Toast } from 'flowbite-svelte'
	import { Exclamation } from 'svelte-heros'
	import { hideToast } from "$lib/functions/toast"
	import {
		toastVisible,
		toastColor,
		toastMessage
	} from "$lib/store"

	const closeToast = () => {
		hideToast()
	}

</script>

<div on:click={closeToast}>
	<Toast position="tr" simple transition="slide" bind:color={$toastColor} bind:visible={$toastVisible}>
		<Exclamation  slot="icon"/>
		{$toastMessage}
	</Toast>
</div>