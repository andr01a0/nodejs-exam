<script>
  import {
    Card, Label, Input, Button, Iconinput
  } from "flowbite-svelte"
  import { signup, login, getCurrentUser } from "$lib/functions/auth"
  import { showToastAndHideAfter } from "$lib/functions/toast"
  import { goto } from "$app/navigation"
  import { userStore } from "$lib/store"
  import { Mail, Key, User } from "svelte-heros"

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const rPassword = formData.get("rpassword")
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password")
    }
    if(rPassword === data.password) {
      const signupResponse = await signup(data)
      if(signupResponse.ok) {
        const loginResponse = await login(data)
        if(loginResponse.ok) {
          await getCurrentUser()
          if($userStore !== null)
				    goto("/")
          else showToastAndHideAfter("Error", "Error logging in")
        } else showToastAndHideAfter("Error", loginResponse.message ?? loginResponse.statusText)
      } else showToastAndHideAfter("Error", signupResponse.message ?? signupResponse.statusText)
    } else showToastAndHideAfter("Error", "Passwords do not match")
  }
</script>

<Card class="w-2/4 max-h-fit">
	<form class="flex flex-col space-y-6" on:submit={handleOnSubmit}>
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign up to our platform</h3>
    <Label class="space-y-2">
			<span>First Name</span>
      <Iconinput noBorder name="firstName" type="text" icon={User} iconClass="h-4 w-4 mr-2 dark:text-green-500" placeholder="Jhon" required/>
		</Label>
    <Label class="space-y-2">
			<span>Last Name</span>
      <Iconinput noBorder name="lastName" type="text" icon={User} iconClass="h-4 w-4 mr-2 dark:text-green-500" placeholder="Doe" required/>
		</Label>
    <Label class="space-y-2">
			<span>Email</span>
      <Iconinput noBorder name="email" type="email" icon={Mail} iconClass="h-4 w-4 mr-2 dark:text-green-500" placeholder="name@email.com" required/>
		</Label>
		<Label class="space-y-2">
			<span>Your password</span>
			<Iconinput noBorder name="password" type="password" icon={Key} iconClass="h-4 w-4 mr-2 dark:text-green-500" placeholder="•••••" required/>
		</Label>
    <Label class="space-y-2">
			<span>Repeat your password</span>
      <Iconinput noBorder name="rpassword" type="password" icon={Key} iconClass="h-4 w-4 mr-2 dark:text-green-500" placeholder="•••••" required/>
		</Label>
		<Button type="submit" class="w-full1">Create your account</Button>
	</form>
</Card>