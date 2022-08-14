<script>
  import { 
    Group, GroupItem
  } from "flowbite-svelte"
	let timelines = [
		{
			title:
				`<span class="font-medium text-gray-900 dark:text-white">Jese Leos</span> likes <span class="font-medium text-gray-900 dark:text-white">Bonnie Green's</span> post in <span class="font-medium text-gray-900 dark:text-white"> How to start with Flowbite library</span>`,
			src: '/images/friendster.png',
			alt: 'alt here',
			href: '/',
			isPrivate: true,
			comment: '"I wanted to share a webinar zeroheight."'
		},
		{
			title:
				`<span class="font-medium text-gray-900 dark:text-white">Bonnie Green</span> react to <span class="font-medium text-gray-900 dark:text-white">Thomas Lean's</span> comment`,
			src: '/images/friendster.png',
			alt: 'alt here',
			href: '/',
			isPrivate: true,
			comment: '"I wanted to share a webinar zeroheight."'
		}
	]
</script>

<Group date="Today">
  <GroupItem {timelines} />
</Group>