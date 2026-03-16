<script>
	import { fade } from "svelte/transition";

	let choiceVisible = $state(true);
	let signupVisible = $state(false);
	let loginVisible = $state(false);
</script>

{#if choiceVisible}
	<div class="buttonContainer" transition:fade={{ duration: 500 }}>
		<button>Log In</button>
		<button>Sign Up</button>
	</div>
{/if}

<style>
	@reference "../../lib/global.css";
	.buttonContainer {
		@apply absolute translate-x-[-50%] translate-y-[-50%] top-[50%]
			left-[50%] flex flex-col w-[40vw] portrait:w-[85vw] gap-1.5;
		& button {
			--width: calc(100% - (var(--spacing) * 2));
			@apply bg-pink-400 first:bg-lime-400 hover:bg-pink-300 first:hover:bg-lime-300
				shadow rounded-full duration-200 p-2 w-(--width) text-body-text dark:text-body-bg
				cursor-pointer;
		}
	}
</style>
