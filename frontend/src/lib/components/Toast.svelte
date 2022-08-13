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

<div on:click={closeToast} class="whitespace-normal">
	{#if $toastType === "Error" || $toastType === "Warning"}
	<Toast position="tr" simple transition="slide" bind:color={toastColor} bind:visible={$toastVisible}>
		<Exclamation slot="icon" />
		{$toastMessage}
	</Toast>
	{/if}

	{#if $toastType === "Success"}
	<Toast position="tr" simple transition="slide" bind:color={toastColor} bind:visible={$toastVisible}>
		<CheckCircle slot="icon" />
		{$toastMessage}
	</Toast>
	{/if}

	{#if $toastType === "Info"}
	<Toast position="tr" simple transition="slide" bind:color={toastColor} bind:visible={$toastVisible}>
		<InformationCircle slot="icon" />
		{$toastMessage}
	</Toast>
	{/if}
</div>