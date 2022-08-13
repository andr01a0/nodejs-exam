<script>
	import { Toast } from 'flowbite-svelte'
	import { 
		Exclamation,
		InformationCircle,
		CheckCircle
	} from 'svelte-heros'
	import { hideToast } from "$lib/functions/toast"
	import {
		toastVisible,
		toastType,
		toastMessage
	} from "$lib/store"

	// type of toast defines the color of the toast
	const ToastTypeColorEnum = {
		Success: "green",
		Error: "red",
		Warning: "yellow",
		Info: "blue"
	}

	$: toastColor = ToastTypeColorEnum[$toastType]

	const closeToast = () => {
		hideToast()
	}

</script>

{#if $toastType === "Error" || $toastType === "Warning"}
<div on:click={closeToast}>
	<Toast position="tr" simple transition="slide" bind:color={toastColor} bind:visible={$toastVisible}>
		<Exclamation slot="icon" />
		{$toastMessage}
	</Toast>
</div>
{/if}

{#if $toastType === "Success"}
<div on:click={closeToast}>
	<Toast position="tr" simple transition="slide" bind:color={toastColor} bind:visible={$toastVisible}>
		<CheckCircle slot="icon" />
		{$toastMessage}
	</Toast>
</div>
{/if}

{#if $toastType === "Info"}
<div on:click={closeToast}>
	<Toast position="tr" simple transition="slide" bind:color={toastColor} bind:visible={$toastVisible}>
		<InformationCircle slot="icon" />
		{$toastMessage}
	</Toast>
</div>
{/if}