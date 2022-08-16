<script>
  import { 
    Activity, ActivityItem, Textarea, Button
  } from "flowbite-svelte"
	import { showToastAndHideAfter } from "$lib/functions/toast"
	import { userStore } from "$lib/store"
	import { onMount } from "svelte"
	import { goto } from "$app/navigation"
	import backendServer from "$lib/data/backendServer.json"
	import { howLongAgo } from "$lib/functions/time"
	import { fetchProfilePicture, fetchFullNameByUserId } from "$lib/functions/profile"
	import { io } from "socket.io-client"

	const socket = io("http://localhost:3000")

	socket.on("timelineUpdated", async () => {
		await fetchUserComments()
		await buildActivities()
	})

	$: comments = []

	$: timelineOwner = ''

	export let userTimelineId

	const fetchUserComments = async () => {
		// fetch all comments from this timeline
		const response = await fetch(`${backendServer}/api/user/${userTimelineId}/comment`, {
			method: "GET",
			credentials: "include"
		})
		if(response.ok) {
			comments = await response.json()
		} else {
			showToastAndHideAfter("Error", response.message ?? response.statusText)
		}
	}

	// build activity items from comments
	const buildActivities = async () => {
		// build activity items from comments async
		const activitiesList = []
		for(let comment of comments) {
			const activity = {
				title: await fetchFullNameByUserId(comment.fromUserId),
				src: await fetchProfilePicture(comment.fromUserId),
				date: howLongAgo(comment.createdAt),
				text: comment.message
			}
			activitiesList.push(activity)
		}
		if(activitiesList.length > 0)
			activities = activitiesList.reverse()
	}

	onMount(async () => {
		if($userStore.userId === parseInt(userTimelineId)) {
			timelineOwner = 'Your'
		} else {
			const isAFriendResponse = await fetch(`${backendServer}/api/friend/${userTimelineId}/user/${$userStore.userId}`, {
				method: "GET",
				credentials: "include"
			})
			if(isAFriendResponse.ok) {
				const isAFriend = await isAFriendResponse.json()
				if(!isAFriend) {
					showToastAndHideAfter("Error", "You are not friends with this user")
					goto('/feed')
				}
			}
			timelineOwner = `${await fetchFullNameByUserId(userTimelineId)}'s`
		}
		await fetchUserComments()
		await buildActivities()
	})

	$: activities = [
		{
			title: `No comments yet`,
			date: 'just now',
			src: '/images/friendster.png',
			text: 'Be the first to comment!'
		}
	]

	let textareaprops = {
		id: 'comment',
		name: 'comment',
		label: 'Your message',
		rows: 4,
		placeholder: 'Leave a comment...',
	}

	const handleOnSubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const data = {
			comment: formData.get("comment"),
			userFrom: $userStore.userId,
			userFromName: await fetchFullNameByUserId($userStore.userId),
			userTo: userTimelineId,
			userToName: await fetchFullNameByUserId(userTimelineId),
		}
		const response = await fetch(`${backendServer}/api/comment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		})
		if(response.ok) {
			const comment = await response.json()
			comments = [...comments, comment]
			textareaprops.value = ''
			showToastAndHideAfter("Success", "Comment posted")
			socket.emit("timelineUpdated")
		} else {
			showToastAndHideAfter('Error', response.message ?? response.statusText)
		}
	}
</script>

<div class="flex-row w-2/4">
	<p class="font-bold text-xl mb-10">{`${timelineOwner} Timeline`}</p>
	<form class="flex flex-col space-y-6" on:submit={handleOnSubmit}>
		<Textarea {...textareaprops} />
		<Button type="submit" class="w-full1">Comment</Button>
	</form>
	<div class="whitespace-normal mt-10">
		<Activity>
			<ActivityItem {activities} />
		</Activity>
	</div>
</div>