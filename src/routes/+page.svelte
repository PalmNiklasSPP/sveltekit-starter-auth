<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData; 
	let sub =currentUser.subscribe((user) => {
			console.log(user);
		});
	async function clientSide() {
		console.log(await pb.collection('sampleData').getList());
	};
	onDestroy(() => {
		sub();
	});
	
</script>
{#if data.user}
	<div class="mx-auto max-w-[400px] p-4">
		<h1 class="h1 font-bold">Hello, I am <span class="text-primary-500">{data.user.name}</span></h1>
	</div>
{/if}
{#if data.sampleData}
	<nav class="list-nav card p-4 max-w-[400px] mx-auto space-y-4 my-4">
		<h2 class="h2 ml-4">TODOS</h2>
		<ul>
			{#each data.sampleData.items as item, i}
				<li>
					<a href="/elements/lists">
						<span class="badge bg-secondary-500">🤟</span>
						<span class="flex-auto">{item.name}</span>
					</a>
				</li>
			{/each}
		</ul>
		<button class="btn variant-filled my-5" on:click={clientSide}>test</button>
	</nav>
{/if}
