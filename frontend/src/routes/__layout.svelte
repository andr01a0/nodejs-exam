<script>
  import "../app.css";
  import { 
    Navbar, NavBrand, NavHamburger, NavUl, NavLi,
    Dropdown, DropdownHeader, DropdownItem, DropdownDivider,
    Avatar,
  } from "flowbite-svelte"
</script>

<svelte:head>
  <title>Social Media</title>
</svelte:head>

<Navbar let:avatar let:hidden let:toggle rounded={true}>
	<NavBrand href="/">
		<img
			src="https://flowbite.com/docs/images/logo.svg"
			class="mr-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Friendster
		</span>
	</NavBrand>
	<div class="flex md:order-2">
		<Dropdown arrowIcon={false} inline={true}>
			<Avatar {avatar} slot="label" />
			<DropdownHeader>
				<span class="block text-sm"> Bonnie Green </span>
				<span class="block truncate text-sm font-medium"> name@flowbite.com </span>
			</DropdownHeader>
			<DropdownItem>Dashboard</DropdownItem>
			<DropdownItem>Settings</DropdownItem>
			<DropdownItem>Earnings</DropdownItem>
			<DropdownDivider />
			<DropdownItem>Sign out</DropdownItem>
		</Dropdown>
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/services">Services</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>

<slot />