import {
	toastVisible,
	toastMessage,
	toastType,
} from "$lib/store"

// show toast for 3 seconds by default
let toastDuration = 3000

// timeout for toast
let activeTimeout = null

function setToast(message, type, duration) {
	toastMessage.set(message ?? "Hello I am a toast")
	toastType.set(type ?? "Info")
	toastDuration = duration ?? toastDuration
}

export function hideToast() {
	toastVisible.set(false)
}

function showToast () {
	toastVisible.set(true)
}

function hideToastAfter() {
	if(activeTimeout !== null)
		clearTimeout(activeTimeout)
	activeTimeout = setTimeout(() => {
		hideToast()
		activeTimeout = null
	}, toastDuration)
}

export function showToastAndHideAfter(type, message, duration) {
	setToast(message, type, duration)
	showToast()
	hideToastAfter()
}