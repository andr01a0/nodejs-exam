<script>
  import { 
    InteractiveTabHead, TabContent,
    TableSearch, TableHead, TableHeadCell, TableBody, 
    TableBodyRow, TableBodyCell, Avatar
  } from 'flowbite-svelte'
  import { userStore } from "$lib/store"
  import backendServer from "$lib/data/backendServer.json"
  import { fetchProfilePicture, fetchFullNameByUserId } from "$lib/functions/profile"
  import { goto, afterNavigate } from '$app/navigation'
  import { Trash, CheckCircle, MinusCircle, UserAdd } from 'svelte-heros'

	let tab1 = { name: 'My Friends', id: 1 }
	let tab2 = { name: 'Requests', id: 2 }
  let tab3 = { name: 'Search', id: 3 }
	let tabhead = [tab1, tab2, tab3]

  let friendsSearchTerm = ''
  let requestsSearchTerm = ''
  let publicSearchTerm = ''

  $: friends = []
  $: requests = []
  $: publicProfiles = []

  const fetchFriends = async () => {
    // fetch all friends from this user
    const friendsResponse = await fetch(`${backendServer}/api/friend/user/${$userStore.userId}`, {
      method: 'GET',
      credentials: 'include'
    })
    if(friendsResponse.ok) {
      const friendsData = await friendsResponse.json()
      for(let friend of friendsData) {
        friend.profilePicture = await fetchProfilePicture(friend.userId)
        friend.fullName = await fetchFullNameByUserId(friend.userId)
        friends = [...friends, friend]
      }
    }
  }

  const fetchRequests = async () => {
    // fetch all friends from this user
    const requestsResponse = await fetch(`${backendServer}/api/friend/request/user/${$userStore.userId}`, {
      method: 'GET',
      credentials: 'include'
    })
    if(requestsResponse.ok) {
      const requestsData = await requestsResponse.json()
      for(let request of requestsData) {
        request.profilePicture = await fetchProfilePicture(request.userId)
        request.fullName = await fetchFullNameByUserId(request.userId)
        requests = [...requests, request]
      }
    }
  }

  const fetchPublicProfile = async () => {
    // fetch all friends from this user
    const publicProfilesResponse = await fetch(`${backendServer}/api/user/except/${$userStore.userId}`, {
      method: 'GET',
      credentials: 'include'
    })
    if(publicProfilesResponse.ok) {
      const publicProfilesData = await publicProfilesResponse.json()
      for(let publicProfile of publicProfilesData) {
        publicProfile.profilePicture = await fetchProfilePicture(publicProfile.userId)
        publicProfile.fullName = await fetchFullNameByUserId(publicProfile.userId)
        const isFriend = await fetch(`${backendServer}/api/friend/user/${$userStore.userId}/${publicProfile.userId}`, {
          method: 'GET',
          credentials: 'include'
        })
        publicProfile.isFriend = await isFriend.json()
        publicProfiles = [...publicProfiles, publicProfile]
      }
    }
  }

  const addFriend = async (friendId) => {
    const response = await fetch(`${backendServer}/api/friend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: $userStore.userId,
        friendId: friendId
      }),
      credentials: 'include'
    })
    if(response.ok) {
      goto('/friends')
    }
  }

  const removeFriend = async (friendId) => {
    const response = await fetch(`${backendServer}/api/friend/${friendId}/user/${$userStore.userId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if(response.ok) {
      goto('/friends')
    }
  }

  const acceptRequest = async (friendId) => {
    const response = await fetch(`${backendServer}/api/friend/request/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: $userStore.userId,
        friendId: friendId
      }),
      credentials: 'include'
    })
    if(response.ok) {
      goto('/friends')
    }
  }

  const rejectRequest = async (friendId) => {
    const response = await fetch(`${backendServer}/api/friend/${friendId}/user/${$userStore.userId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if(response.ok) {
      goto('/friends')
    }
  }

	afterNavigate(async ({ from, to }) => {
    friends = []
		await fetchFriends()
    requests = []
    await fetchRequests()
    publicProfiles = []
    await fetchPublicProfile()
	})

	$: filteredFriends = friends.filter(
		(profile) => `${profile.firstName} ${profile.lastName}`.toLocaleLowerCase().includes(friendsSearchTerm.toLowerCase())
	)
  $: filteredRequests = requests.filter(
		(profile) => `${profile.firstName} ${profile.lastName}`.toLocaleLowerCase().includes(requestsSearchTerm.toLowerCase())
	)
  $: filteredPublic = publicProfiles.filter(
		(profile) => `${profile.firstName} ${profile.lastName}`.toLocaleLowerCase().includes(publicSearchTerm.toLowerCase())
	)
</script>

<diV class="flex-wrap w-2/4">
  <InteractiveTabHead tabs={tabhead}>
    <TabContent tab={tab1}>
      <div class="text-center">
        <p class="font-bold text-xl">My Friends</p>
        <TableSearch placeholder="Search by user name" hoverable={true} bind:inputValue={friendsSearchTerm}>
          <TableHead>
            <TableHeadCell></TableHeadCell>
            <TableHeadCell></TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHead>
          <TableBody class="divide-y">
            {#each filteredFriends as profile}
              <TableBodyRow>
                <TableBodyCell><div on:click={goto(`/profile/${profile.userId}`)}><Avatar src={profile.profilePicture} /></div></TableBodyCell>
                <TableBodyCell><div on:click={goto(`/timeline/${profile.userId}`)}>{profile.fullName}</div></TableBodyCell>
                <TableBodyCell><div on:click={removeFriend(profile.userId)}><Trash color="#ff0000"/></div></TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </TableSearch>
      </div>
    </TabContent>
    <TabContent tab={tab2}>
      <div class="text-center">
        <p class="font-bold text-xl">Friend Requests</p>
        <TableSearch placeholder="Search by user name" hoverable={true} bind:inputValue={requestsSearchTerm}>
          <TableHead>
            <TableHeadCell></TableHeadCell>
            <TableHeadCell></TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHead>
          <TableBody class="divide-y">
            {#each filteredRequests as profile}
              <TableBodyRow>
                <TableBodyCell><div on:click={goto(`/profile/${profile.userId}`)}><Avatar src={profile.profilePicture} /></div></TableBodyCell>
                <TableBodyCell><div on:click={goto(`/timeline/${profile.userId}`)}>{profile.fullName}</div></TableBodyCell>
                <TableBodyCell>
                  <div class="inline-flex">
                    <div on:click={acceptRequest(profile.userId)}><CheckCircle color="#10ff00"/></div>
                    <div on:click={rejectRequest(profile.userId)}><MinusCircle color="#ff0000"/></div>
                  </div>
              </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </TableSearch>
      </div>
    </TabContent>
    <TabContent tab={tab3}>
      <div class="text-center">
        <p class="font-bold text-xl">All Users</p>
        <TableSearch placeholder="Search by user name" hoverable={true} bind:inputValue={publicSearchTerm}>
          <TableHead>
            <TableHeadCell></TableHeadCell>
            <TableHeadCell></TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHead>
          <TableBody class="divide-y">
            {#each filteredPublic as profile}
              <TableBodyRow>
                <TableBodyCell><div on:click={goto(`/profile/${profile.userId}`)}><Avatar src={profile.profilePicture} /></div></TableBodyCell>
                <TableBodyCell><div on:click={goto(`/timeline/${profile.userId}`)}>{profile.fullName}</div></TableBodyCell>
                <TableBodyCell>
                  {#if !profile.isFriend}
                  <div on:click={addFriend(profile.userId)}><UserAdd /></div>
                  {/if}
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </TableSearch>
      </div>
    </TabContent>
  </InteractiveTabHead>
</diV>