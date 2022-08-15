<script>
	import {
		Dropdown, DropdownHeader, DropdownItem,
		Avatar
	} from "flowbite-svelte"
  import { showToastAndHideAfter } from "$lib/functions/toast"
  import backendServer from "$lib/data/backendServer.json"
  import { onMount } from "svelte"
  import { userStore } from "$lib/store"
  import { afterNavigate } from '$app/navigation'
  import { howLongAgo } from "$lib/functions/time"
  import { fetchProfilePicture } from "$lib/functions/profile"

  $: hasNotifications = false

  $: notifications = []

  const toggleHasNotifications = async () => {
    // fetch update has notifications
    await fetch(`${backendServer}/api/notification/hasNotification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: $userStore.userId
      })
    })
  }

  const fetchHasNotifications = async () => {
    const hasNotificationsResponse = await fetch(`${backendServer}/api/notification/hasNotification/user/${$userStore.userId}`, {
      method: "GET",
      credentials: "include"
    })
    if(hasNotificationsResponse.ok) {
      hasNotifications = await hasNotificationsResponse.json()
    } else {
      showToastAndHideAfter("Error", "Could not check for notifications")
    }
  }

  const fetchNotifications = async () => {
    const notificationsResponse = await fetch(`${backendServer}/api/notification/user/${$userStore.userId}`, {
      method: "GET",
      credentials: "include"
    })
    if(notificationsResponse.ok) {
      notifications = await notificationsResponse.json()
      let tmpNot = []
      for(let notification of notifications) {
        notification.avatar = await fetchProfilePicture(notification.fromUserId)
        tmpNot.push(notification)
      }
      notifications = tmpNot
    } else {
      showToastAndHideAfter("Error", "Could not get notifications")
    }
  }

  onMount(async () => {
    await fetchHasNotifications()
  })

  afterNavigate(async ({ from, to }) => {
		await fetchHasNotifications()
	})

</script>

<div on:click={async () => {
  await fetchNotifications()
  await toggleHasNotifications()
  await fetchHasNotifications()
}}>
  <Dropdown class="w-full max-w-sm whitespace-normal">
    <div slot="trigger" class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400">
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
      {#if hasNotifications.status}
      <div class="flex relative">
        <div class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
      </div>
      {/if}
    </div>
    <ul slot="content" class="rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700">
      <DropdownHeader class="font-bold text-center"  divider={false}>Notifications</DropdownHeader>
      {#each notifications as notification}
      <DropdownItem class="flex space-x-4">
        <Avatar src={notification.avatar} rounded />
        <div class="pl-3 w-full">
            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notification.message}</div>
            <div class="text-xs text-blue-600 dark:text-blue-500">{howLongAgo(notification.createdAt)}</div>
        </div>
      </DropdownItem>
      {/each}
      {#if notifications.length === 0}
      <DropdownItem class="flex space-x-4">
        <div class="flex-1 text-center text-gray-500">No notifications</div>
      </DropdownItem>
      {/if}
    </ul>
  </Dropdown>
</div>