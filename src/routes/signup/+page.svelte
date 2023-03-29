<script lang="ts">
    let cuil = '';
  
    async function submit() {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cuil }),
      });
      if (res.ok) {
        location.href = '/';
      }
    }
  </script>
  
  <h1>Signup</h1>
  <input type="text" bind:value={cuil} placeholder="CUIL" required>
  <button on:click={submit}>Submit</button>
  