<script>
  import { Card, Fileupload, Button, Label } from "flowbite-svelte"

  const handleOnSubmit = () => {
		
	}
</script>

<Card img="/images/friendster.png" reverse={false} class="text-center p-2">
  <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Profile</h5>
  <form class="flex flex-col space-y-6" on:submit={handleOnSubmit}>
		<Label class="space-y-2">
			<span>Change Profile Picture</span>
      <Fileupload />
		</Label>
		<Button type="submit" class="w-full1">Submit</Button>
	</form>
</Card>