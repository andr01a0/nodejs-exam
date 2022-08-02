<script>
  import "../app.css";
  import { goto } from '$app/navigation';
  import { 
    Navbar, NavBrand, NavHamburger, NavUl, NavLi,
    Dropdown, DropdownHeader, DropdownItem, DropdownDivider,
    Avatar, Button, Search, Input
  } from "flowbite-svelte"
</script>

<svelte:head>
  <title>Friendster</title>
</svelte:head>

<Navbar let:avatar let:hidden let:toggle rounded={false}>
	<NavBrand href="/feed">
		<img
			src="/images/friendster.png"
			class="mr-3 h-6 sm:h-9"
			alt="Friendster Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Friendster
		</span>
	</NavBrand>
	<div class="flex md:order-2">
    <!-- <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
			<Search variation='solid' />
		</Button>
		<div class="hidden relative md:block">
			<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
				<Search />
			</div>
			<Input id="search-navbar" class="pl-10" placeholder="Search..." />
		</div> -->
		<Dropdown arrowIcon={false} inline={true}>
			<Avatar {avatar} slot="label" />
			<DropdownHeader>
				<span class="block text-sm">André Bittencourt</span>
				<span class="block truncate text-sm font-medium">andre@friendster.com</span>
			</DropdownHeader>
			<DropdownItem on:click={() => goto("/profile")}>Profile</DropdownItem>
			<DropdownItem on:click={() => goto("/settings")}>Settings</DropdownItem>
			<DropdownDivider />
			<DropdownItem>Sign out</DropdownItem>
		</Dropdown>
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden}>
		<NavLi href="/feed" active={true}>Feed</NavLi>
		<NavLi href="/timeline">Timeline</NavLi>
		<NavLi href="/friends">Friends</NavLi>
	</NavUl>
</Navbar>

<slot />
