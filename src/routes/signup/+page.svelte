<script lang="ts">
  export let form;
</script>

<h2 class="text-xl font-bold">Sign Up</h2>
<form method="POST">
  <input type="text" name="name" placeholder="Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Sign Up</button>
</form>

{#if form?.error}
  <p class="text-red-500">{form.error}</p>
{/if}

  <p class="text-green-500">Already Register <a href="/login">Login here</a></p>
