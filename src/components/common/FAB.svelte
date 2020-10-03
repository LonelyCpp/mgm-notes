<script>
  export let onClick;
  import { fade, fly } from "svelte/transition";
</script>

<style>
  div {
    display: flex;
    position: fixed;

    width: 50px;
    height: 50px;
    border-radius: 25px;

    bottom: 16px;
    right: 16px;

    align-items: center;
    justify-content: center;
  }
</style>

<div
  out:fade
  in:fly={{ y: 200, duration: 500 }}
  class="button is-primary"
  on:click={onClick}>
  +
</div>
