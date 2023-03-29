<script lang="ts">
    import { onMount } from 'svelte';
    let email = '';
    let password = '';
  
    async function submit() {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        location.href = '/';
      } else {
        location.href = '/signup';
      }
    }
  </script>
  
  <h1>Login</h1>
  <input type="email" bind:value={email} placeholder="Email" required>
  <input type="password" bind:value={password} placeholder="Password" required>
  <button on:click={submit}>Login</button>
  