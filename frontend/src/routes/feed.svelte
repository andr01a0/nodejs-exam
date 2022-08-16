<script>
  import { 
    Group, GroupItem
  } from "flowbite-svelte"
	import { onMount } from "svelte"
	import { userStore } from "$lib/store"
	import { showToastAndHideAfter } from "$lib/functions/toast"
	import { isDateToday } from "$lib/functions/time"
	import backendServer from "$lib/data/backendServer.json"
  import { fetchProfilePicture, fetchFullNameByUserId } from "$lib/functions/profile"

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

	const updateNotifications = async () => {
		timelines = [{
				title: "No notifications today",
				src: "/images/friendster.png",
				//comment: "You have no notifications",
		}]
		await fetchAllNotifications()
		if(notifications.length > 0) {
			for(let notification of notifications) {
				if(isDateToday(notification.createdAt)) {
					if(timelines[0].title === "No notifications today") {
						timelines = []
					}
					const fromName = await fetchFullNameByUserId(notification.fromUserId)
					const toName = await fetchFullNameByUserId(notification.userId)
					timelines = [...timelines, {
						title: `${fromName} : ${toName}`,
						src: `${await fetchProfilePicture(notification.fromUserId)}`,
						comment: notification.message,
					}]
				}
			}
		}
	}

	onMount(async () => {
		await updateNotifications()
	})

</script>

<div class="whitespace-normal w-2/4">
	<Group date="Today">
		<GroupItem {timelines} />
	</Group>
</div>