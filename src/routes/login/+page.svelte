<script lang="ts">
  export let form;
</script>

<h2 class="text-xl font-bold">Login</h2>
<form method="POST">
  <input type="email" name="email" placeholder="Email" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Login</button>
</form>

{#if form?.error}
  <p class="text-red-500">{form.error}</p>
{/if}

<p class="text-green-500">Not Registred <a href="/signup">Signup here</a></p>
