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

	<link rel="icon" href="/icons/pornhub-logo-512.png" />
	<link rel="manifest" href="/manifest.json" />
	<title>RSA App</title>
</svelte:head>

{@render children()}
