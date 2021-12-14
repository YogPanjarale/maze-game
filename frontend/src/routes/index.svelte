<script lang="ts">
	import { onMount } from 'svelte';

	const title = 'Multiplayer Maze Game_';
	let text = title;
	let at = title.length;
	let direction = 0;
	onMount(() => {
		typeIt();
	});
	const typeIt = () => {
		// let i = 0;
		let interval = setInterval(() => {
			let d = direction;
			let b = 0;
			if (at <= text.length && at > 0 && d == 0) {
				text = title.substr(0, at) + '_';
				at--;
				// console.log(at)
				if (at == 0) {
					console.log('at 0');
					direction = 1;
				}
			} else if (at <= text.length && at >= 0 && d == 1) {
				d = 1;
				//    at = title.length;
				text = title.substr(0, at) + '_';
				at++;
				if (at == title.length) {
					if (b < 5) {
						if (text.includes('_')) {
							text = text.replace('_', '');
							at = text.length;
							b++;
						}
					} else {
						b = 0;
						direction = 0;
					}

					// direction = 0;
				}
			} else {
				clearInterval(interval);
				setTimeout(() => {
					typeIt();
				}, 1000);
			}
		}, 100);
	};
</script>

<svelte:head>
	<title>Multiplayer Maze Game</title>
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-tl from-gray-700 via-gray-900 to-black flex items-center justify-center"
>
	<h1
		class="text-8xl text-center font-semibold font-bak
            text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
	>
		{text}
	</h1>
</div>
