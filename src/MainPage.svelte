<script>
  import Fab from "./components/common/FAB.svelte";

  let insertModalActive = false;

  function showInsertModal() {
    insertModalActive = true;
  }

  function dismissInsertModal() {
    insertModalActive = false;
  }
</script>

<style>
</style>

<main>
  <Fab onClick={showInsertModal} />
  <div class="modal" class:is-active={insertModalActive}>
    <div class="modal-background" />
    <div class="modal-content">
      <!-- Any other Bulma elements you want -->
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={dismissInsertModal} />
  </div>
</main>
