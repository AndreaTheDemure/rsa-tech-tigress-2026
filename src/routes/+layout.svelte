<script>
	import "../lib/global.css";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap"
		rel="stylesheet"
	/>

	<link rel="icon" href="/icons/app-logo-512.png" />
	<link rel="manifest" href="/manifest.json" />
	<title>RSA App</title>
</svelte:head>

{@render children()}

<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
</script>

<style>
  nav {
    display: flex;
    gap: 20px;
    background: #333;
    color: white;
    padding: 10px;
  }
  nav a {
    color: white;
    text-decoration: none;
  }
  nav a.active {
    text-decoration: underline;
  }
  main {
    padding: 20px;
  }
</style>

<nav>
  <a href="/" class:active={$page.url.pathname === '/'}>Home</a>
  <a href="/goals" class:active={$page.url.pathname === '/goals'}>Goals</a>
  <a href="/health" class:active={$page.url.pathname === '/health'}>Health</a>
</nav>

<main>
  <slot />
</main>
