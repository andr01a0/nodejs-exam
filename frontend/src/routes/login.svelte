<script>
  import {
    Card, Label, Input, Checkbox, Button
  } from "flowbite-svelte"
  import backendServer from "$lib/data/backendServer.json"

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")
    const loginResponse = await fetch(`${backendServer}/login`, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: 'include'
    })
    console.log(await loginResponse.json())
  }
</script>

<Card class="w-2/4">
	<form class="flex flex-col space-y-6" on:submit={handleOnSubmit}>
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign in to our platform</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input type="email" name="email" placeholder="name@email.com" required />
		</Label>
		<Label class="space-y-2">
			<span>Your password</span>
			<Input type="password" name="password" placeholder="•••••" required />
		</Label>
		<!-- <div class="flex items-start">
			<Checkbox>Remember me</Checkbox>&nbsp;
			<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
		</div> -->
		<Button type="submit" class="w-full1">Login to your account</Button>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered? <a href="/register" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
			</div>
	</form>
</Card>