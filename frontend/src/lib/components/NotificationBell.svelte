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

  $: hasNotifications = false

  const fetchHasNotifications = async () => {
    const hasNotificationsResponse = await fetch(`${backendServer}/api/notification/hasNotification/user/${$userStore.userId}`, {
      method: "GET",
      credentials: "include"
    })
    if(hasNotificationsResponse.ok) {
      hasNotifications = await hasNotificationsResponse.json()
      console.log(hasNotifications)
    } else {
      showToastAndHideAfter("Error", "Could not check for notifications")
    }
  }

  onMount(async () => {
    await fetchHasNotifications()
  })

  afterNavigate(async ({ from, to }) => {
		await fetchHasNotifications()
	})

</script>

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
    <DropdownItem class="flex space-x-4">
        <Avatar src="/images/friendster.png" dot={{color:'bg-gray-300'}} rounded />
        <div class="pl-3 w-full">
            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span class="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
            <div class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
        </div>
    </DropdownItem>
    <DropdownItem class="flex space-x-4">
        <Avatar src="/images/friendster.png" dot={{color:'bg-red-400'}} rounded />
        <div class="pl-3 w-full">
            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and <span class="font-medium text-gray-900 dark:text-white">5 others</span> started following you.</div>
            <div class="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</div>
        </div>
    </DropdownItem>
    <DropdownItem class="flex space-x-4">
        <Avatar src="/images/friendster.png" dot={{color:'bg-green-400'}} rounded />
        <div class="pl-3 w-full">
            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">Bonnie Green</span> and <span class="font-medium text-gray-900 dark:text-white">141 others</span> love your story. See it and view more stories.</div>
            <div class="text-xs text-blue-600 dark:text-blue-500">44 minutes ago</div>
        </div>
    </DropdownItem>
  </ul>
</Dropdown>