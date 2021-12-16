<script>
import { onMount } from 'svelte';

	import '../app.css';
	onMount(() => {
		console.log('mounted');
		import("$lib/firebase").then(firebase => {
			console.log(firebase);
		});
	});
</script>

<slot />
