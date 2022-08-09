<script>
	import {
		Footer, FooterCopyright, FooterLink, FooterLinkGroup
	} from "flowbite-svelte"
</script>

<Footer class="rounded-none">
	<FooterCopyright href="/" by="Friendster" />
	<FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
		<FooterLink href="/about">About</FooterLink>
		<FooterLink href="/license">Licensing</FooterLink>
	</FooterLinkGroup>
</Footer>