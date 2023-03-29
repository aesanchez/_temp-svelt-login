<script lang="ts">
	import { onMount } from 'svelte';
	let userInfo = null;

	onMount(async () => {
	  const res = await fetch('/api/user');
	  if (res.ok) {
		userInfo = await res.json();
	  }
	});
</script>

{#if userInfo}
	<h1>Welcome, {userInfo.email}!</h1>
	<p>Your CUIL is: {userInfo.cuil}</p>
{:else}
	<h1>Loading...</h1>
{/if}

