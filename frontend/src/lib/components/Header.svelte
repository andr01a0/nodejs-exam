<script>
	import { goto, afterNavigate } from '$app/navigation'
	import { onMount } from 'svelte'
  import { 
    Navbar, NavBrand, NavHamburger, NavUl, NavLi,
    Dropdown, DropdownHeader, DropdownItem, DropdownDivider,
    Avatar,
  } from "flowbite-svelte"
	import { userStore } from "$lib/store"
	import headerPaths from "$lib/data/headerPaths.json"
	import { logout } from "$lib/functions/auth"
	import { showToastAndHideAfter } from "$lib/functions/toast"
	import NotificationBell from "$lib/components/NotificationBell.svelte"
	import { UserCircle, Adjustments, Logout } from "svelte-heros"

	$: activeNavLink = null

	const changeActiveNavLink = async (path) => {
		if(headerPaths.includes(path))
			activeNavLink = path
		else
			activeNavLink = null
	}

	onMount(async() => {
		changeActiveNavLink(window.location.pathname)
	})
	afterNavigate(async ({ from, to }) => {
		changeActiveNavLink(to.pathname)
	})
</script>

<Navbar let:avatar let:hidden let:toggle rounded={false} class="fixed top-0 left-0 right-0 z-10">
	<NavBrand href="/">
		<img
			src="/images/friendster.png"
			class="mr-3 h-6 sm:h-9"
			alt="Friendster Logo"
		/>
		<span class="text-xl self-center whitespace-nowrap font-semibold dark:text-white">Friendster</span>
	</NavBrand>
	{#if $userStore !== null}
	<div class="flex md:order-2">
		<NotificationBell />
		<Dropdown arrowIcon={false} inline={true}>
			<Avatar {avatar} slot="label" />
			<DropdownHeader>
				<span class="block text-sm">{`${$userStore.firstName} ${$userStore.lastName}`}</span>
				<span class="block truncate text-sm font-medium">{$userStore.email}</span>
			</DropdownHeader>
			<DropdownItem on:click={() => goto("/profile")}><UserCircle class="h-5 w-5 inline"/> Profile</DropdownItem>
			<DropdownItem on:click={() => goto("/settings")}><Adjustments class="h-5 w-5 inline"/> Settings</DropdownItem>
			<DropdownDivider />
			<DropdownItem on:click={async () => {
				const logoutResponse = await logout()
				if(logoutResponse.ok) goto("/login")
				else showToastAndHideAfter("Error", logoutResponse.message ?? logoutResponse.statusText)
			}}><Logout class="h-5 w-5 inline"/> Logout</DropdownItem>
		</Dropdown>
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden}>
		<NavLi href="/feed" active={activeNavLink === "/feed"}>Feed</NavLi>
		<NavLi href="/timeline" active={activeNavLink === "/timeline"}>Timeline</NavLi>
		<NavLi href="/friends" active={activeNavLink === "/friends"}>Friends</NavLi>
	</NavUl>
	{:else}
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/login" active={activeNavLink === "/login"}>Login</NavLi>
		<NavLi href="/register" active={activeNavLink === "/register"}>Register</NavLi>
	</NavUl>
	{/if}
</Navbar>