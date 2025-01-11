<script lang="ts">
  import { SignIn, SignOut } from "@auth/sveltekit/components"
  import { page } from "$app/stores"
</script>
 
<h1>SvelteKit Auth Example</h1>
<div class="pt-16">
  {#if $page.data.session}
    {#if $page.data.session.user?.image}
      <img
        src={$page.data.session.user.image}
        class="avatar"
        alt="User Avatar"
      />
    {/if}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <pre>
      {JSON.stringify($page.data.session, null, 2)}
    </pre>
    <SignOut>
      {#snippet submitButton()}
            <div  class="buttonPrimary">Sign out</div>
          {/snippet}
    </SignOut>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <SignIn>
      {#snippet submitButton()}
            <div  class="buttonPrimary">Sign in</div>
          {/snippet}
    </SignIn>
    <SignIn provider="github">
      {#snippet submitButton()}
            <div  class="bg-blue-900">
          GitHub Sign In
        </div>
          {/snippet}
    </SignIn>
    <SignIn provider="google">
      {#snippet submitButton()}
            <div  class="bg-red-900">
          Google Sign In
        </div>
          {/snippet}
    </SignIn>
  {/if}
</div>