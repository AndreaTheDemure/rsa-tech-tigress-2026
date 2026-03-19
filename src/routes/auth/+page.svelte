<script>
	import FormControl from "$lib/components/FormControl.svelte";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let choiceVisible = $state(true);
	let signupVisible = $state(false);
	let loginVisible = $state(false);
</script>

{#if choiceVisible}
	<div class="buttonContainer" out:fade={{ duration: 600 }}>
		<button
			onclick={() => {
				choiceVisible = false;
				loginVisible = true; // show the login screen
			}}>Log In</button
		>
		<button
			onclick={() => {
				choiceVisible = false;
				signupVisible = true; // show the signup screen
			}}>Sign Up</button
		>
	</div>
{/if}

{#if loginVisible}
	<form
		in:fade={{ delay: 650, duration: 600 }}
		out:fade={{ duration: 600 }}
		action="?/login"
		method="POST"
	>
		<h1
			class="dark:text-t-green light:text-shadow-t-green light:text-shadow-lg"
		>
			Log In
		</h1>
		<FormControl
			name="username"
			required
			id="username"
			minlength={3}
			maxlength={14}
		/>
		<FormControl
			name="password"
			id="password"
			type="password"
			required
			minlength={6}
			maxlength={13}
		/>
		<button type="submit" class="bg-t-green-300 hover:bg-t-green-200"
			>Log In</button
		>
		<a
			href="/"
			onclick={(e) => {
				e.preventDefault();
				loginVisible = false;
				signupVisible = true;
			}}
			class="text-center text-xs underline dark:text-t-green">Sign Up Instead</a
		>
	</form>
{/if}

{#if signupVisible}
	<form
		in:fade={{ delay: 650, duration: 600 }}
		out:fade={{ duration: 600 }}
		method="POST"
		action="?/signup"
	>
		<h1 class="dark:text-t-pink light:text-shadow-t-pink light:text-shadow-lg">
			Sign Up
		</h1>
		<FormControl
			name="username"
			id="username"
			required
			minlength={3}
			maxlength={14}
		/>
		<FormControl
			name="password"
			id="password"
			type="password"
			required
			minlength={6}
			maxlength={13}
		/>
		<button type="submit" class="bg-t-pink-300 hover:bg-t-pink-200"
			>Sign Up</button
		>
		<a
			href="/"
			onclick={(e) => {
				e.preventDefault();
				loginVisible = true;
				signupVisible = false;
			}}
			class="text-center text-xs underline dark:text-t-pink">Log In Instead</a
		>
	</form>
{/if}

<style lang="postcss">
	@reference "../../lib/global.css";
	button {
		@apply shadow rounded-full duration-200 p-2
			 text-body-text dark:text-body-bg cursor-pointer;
	}
	.buttonContainer {
		animation: fadeIn 700ms;
		@apply absolute translate-x-[-50%] translate-y-[-50%] top-[50%]
			left-[50%] flex flex-col w-[35vw] portrait:w-[90vw] gap-2.5;
		& button {
			--width: calc(100% - (var(--spacing) * 2));
			@apply bg-t-pink-300 first:bg-t-green-300 hover:bg-t-pink-200 first:hover:bg-t-green-200
				w-(--width);
		}
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	form {
		@apply absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
			w-[55vw] portrait:w-[84vw] gap-3.5 flex flex-col;
		& h1 {
			@apply text-5xl text-center;
		}
	}
</style>
