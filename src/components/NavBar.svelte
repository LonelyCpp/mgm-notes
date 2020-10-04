<script>
  import { loginWithGoogle, logout } from "../firebase/auth";
  import { userMeta } from "../store/authStore";

  let hamburgerActive = false;

  function onHamburgerClick() {
    hamburgerActive = !hamburgerActive;
  }
</script>

<style>
</style>

<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <h1>Notes App</h1>
    </a>

    <div
      role="button"
      aria-label="menu"
      class="navbar-burger"
      aria-expanded="false"
      class:is-active={hamburgerActive}
      on:click={onHamburgerClick}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  </div>
  <div class="navbar-menu" class:is-active={hamburgerActive}>
    <div class="navbar-end">
      <div class="navbar-item">
        <div
          class="button is-primary is-inverted"
          on:click={$userMeta.loggedIn ? logout : loginWithGoogle}>
          {#if $userMeta.loggedIn}Log out{:else}Login{/if}
        </div>
      </div>
      <div class="navbar-item">
        <div class="button is-primary is-inverted">github</div>
      </div>
    </div>
  </div>
</nav>
