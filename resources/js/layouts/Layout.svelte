<script lang="ts">
	import { useLayoutProps, page } from "@inertiajs/svelte";

	const layout = useLayoutProps({
		title: "",
	});

	let { children } = $props();
</script>

<svelte:head>
	<title>{$layout.title ? `${$layout.title} - ` : ""}{page.props.appName}</title>
</svelte:head>

<main>
	{@render children()}
</main>
