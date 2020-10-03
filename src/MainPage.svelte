<script>
  import Fab from "./components/common/FAB.svelte";
  import InsertModal from "./components/InsertModal.svelte";

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
  <InsertModal visible={insertModalActive} onDismiss={dismissInsertModal} />
</main>
