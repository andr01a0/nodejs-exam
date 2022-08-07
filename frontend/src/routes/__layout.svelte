<script>
  import "../app.css";
  import { goto } from '$app/navigation';
  import { 
    Navbar, NavBrand, NavHamburger, NavUl, NavLi,
    Dropdown, DropdownHeader, DropdownItem, DropdownDivider,
    Avatar
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
		<Dropdown arrowIcon={false} inline={true}>
			<Avatar {avatar} slot="label" />
			<DropdownHeader>
				<span class="block text-sm">André Bittencourt</span>
				<span class="block truncate text-sm font-medium">andre@friendster.com</span>
			</DropdownHeader>
			<DropdownItem on:click={() => goto("/profile")}>Profile</DropdownItem>
			<DropdownItem on:click={() => goto("/settings")}>Settings</DropdownItem>
			<DropdownDivider />
			<DropdownItem on:click={() => goto("/logout")}>Sign out</DropdownItem>
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
