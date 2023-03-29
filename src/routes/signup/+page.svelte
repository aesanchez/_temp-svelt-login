<script lang="ts">
  let cuil = "";
  let password = "";
  let email = "";

  async function submit() {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, cuil }),
    });
    if (res.ok) {
      location.href = "/";
    }
  }
</script>

<h1>Signup</h1>
<input type="email" bind:value={email} placeholder="Email" required /> <br>
<input type="password" bind:value={password} placeholder="Password" required /><br>
<input type="text" bind:value={cuil} placeholder="CUIL" required /><br>
<button on:click={submit}>Submit</button>
