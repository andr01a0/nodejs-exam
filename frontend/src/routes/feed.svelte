<script>
  import { 
    Group, GroupItem
  } from "flowbite-svelte"
	import { onMount } from "svelte"
	import { userStore } from "$lib/store"
	import { showToastAndHideAfter } from "$lib/functions/toast"
	import { isDateToday } from "$lib/functions/time"
	import backendServer from "$lib/data/backendServer.json"
  import { fetchProfilePicture } from "$lib/functions/profile"

	$: notifications = []
	$: timelines = []

	const fetchAllNotifications = async () => {
    const notificationsResponse = await fetch(`${backendServer}/api/notification/all/user/${$userStore.userId}`, {
      method: "GET",
      credentials: "include"
    })
    if(notificationsResponse.ok) {
      notifications = await notificationsResponse.json()
    } else {
      showToastAndHideAfter("Error", "Could not get notifications")
    }
  }

	onMount(async () => {
		timelines = [{
				title: "No notifications today",
				src: "/images/friendster.png",
				comment: "You have no notifications",
		}]
		await fetchAllNotifications()
		if(notifications.length > 0) {
			for(let notification of notifications) {
				if(isDateToday(notification.createdAt)) {
					timelines = [...timelines, {
						title: `${notification.fromUserId} : ${notification.userId}`,
						src: `${await fetchProfilePicture(notification.fromUserId)}`,
						comment: notification.message,
					}]
				}
			}
		}
	})

</script>

<Group date="Today">
  <GroupItem {timelines} />
</Group>