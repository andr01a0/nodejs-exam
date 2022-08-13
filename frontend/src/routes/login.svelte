<script>
  import {
    Card, Label, Button, Iconinput
  } from "flowbite-svelte"
  import { login, getCurrentUser } from "$lib/functions/auth"
  import { goto } from "$app/navigation"
  import { showToastAndHideAfter } from "$lib/functions/toast"
  import { userStore } from "$lib/store"
  import { Mail, Key } from "svelte-heros"

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    }
    const loginResponse = await login(data)
    if(loginResponse.ok) {
      await getCurrentUser()
      if($userStore !== null)
				goto("/")
      else showToastAndHideAfter("Error", "Error logging in")
    } else showToastAndHideAfter("Error", loginResponse.message ?? loginResponse.statusText)
  }
</script>

<Card class="w-2/4">
	<form class="flex flex-col space-y-6" on:submit={handleOnSubmit}>
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign in to our platform</h3>
		<Label class="space-y-2">
			<span>Email</span>
      <Iconinput noBorder name="email" type="email" icon={Mail} iconClass="h-4 w-4 mr-2 dark:text-green-500" placeholder="name@email.com" required/>
		</Label>
		<Label class="space-y-2">
			<span>Your password</span>
      <Iconinput noBorder name="password" type="password" icon={Key} iconClass="h-4 w-4 mr-2 dark:text-green-500" placeholder="•••••" required/>
		</Label>
		<Button type="submit" class="w-full1">Login to your account</Button>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered? <a href="/register" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
			</div>
	</form>
</Card>