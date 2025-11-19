<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children } = $props();
</script>

<div class="h-screen bg-gray-50 flex flex-col">
	<Navigation />
	<main class="flex-1">
		{@render children()}
	</main>
	<footer class="bg-gray-800 text-white py-4">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center text-sm">
				VANILLA SKY (C) Starkle Inc. Licensed to BFG Pte Ltd. 2025. All Rights Reserved.
			</div>
		</div>
	</footer>
</div>
