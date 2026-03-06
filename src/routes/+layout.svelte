<script>
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/icons/pornhub-logo-512.png" />
	<link rel="manifest" href="/manifest.json" />
	<title>RSA App</title>
</svelte:head>

{@render children()}
