<script>
  import { onMount } from "svelte";

  export let mainDBRef;

  import { checkForUser, loginWithGoogle } from "../firebase/auth";
  import { userMeta } from "../store/authStore";

  let allYears = ["first PU", "second PU"];
  let allSubjects = [];

  let selectedYear = "";
  let selectedSubject = "";

  let hamburgerActive = false;

  function onHamburgerClick() {
    hamburgerActive = !hamburgerActive;
  }
</script>

<style>
</style>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <h1>Notes App</h1>
    </a>

    <div
      role="button"
      aria-label="menu"
      class="navbar-burger"
      class:is-active={hamburgerActive}
      aria-expanded="false"
      on:click={onHamburgerClick}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  </div>
  <div class="navbar-menu" class:is-active={hamburgerActive}>
    <div class="navbar-end">
      <div class="navbar-item" on:click={loginWithGoogle}>
        {#if $userMeta.loggedIn}Log out{:else}Login{/if}
      </div>
      <div class="navbar-item">github</div>
    </div>
  </div>
</nav>
