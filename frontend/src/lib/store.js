import { writable } from 'svelte/store'

// user login info
export const userStore = writable(null)

// toast message
export const toastVisible = writable(false)
export const toastMessage = writable('')
export const toastType = writable('')