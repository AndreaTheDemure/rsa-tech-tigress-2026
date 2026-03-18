<script>
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
	<form in:fade={{ delay: 650, duration: 600 }}>
		<h1
			class="dark:text-t-green light:text-shadow-t-green light:text-shadow-lg"
		>
			Log In
		</h1>
		<input type="text" name="username" id="username" />
		<input type="text" name="password" id="password" />
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
			w-[55vw] grid grid-cols-2 portrait:grid-cols-1 gap-1.5;
		& h1 {
			@apply text-3xl text-center landscape:col-span-2;
		}
	}
	input[type="text"] {
	}
</style>
