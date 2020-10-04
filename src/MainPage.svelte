<script>
  import Fab from "./components/common/FAB.svelte";
  import InsertModal from "./components/InsertModal.svelte";
  import NotesList from "./components/NotesList.svelte";
  import PathSelector from "./components/PathSelector.svelte";
  import { userMeta } from "./store/authStore";

  let insertModalActive = false;
  let path = "";

  function showInsertModal() {
    insertModalActive = true;
  }

  function dismissInsertModal() {
    insertModalActive = false;
  }

  function onPathChange(newPath) {
    path = newPath;
  }
</script>

<style>
  #container {
    margin: 1em;
  }
</style>

<main>
  <div id="container">
    <PathSelector {onPathChange} />
    <NotesList {path} />
  </div>
  {#if $userMeta.loggedIn}
    <Fab onClick={showInsertModal} />
    <InsertModal visible={insertModalActive} onDismiss={dismissInsertModal} />
  {/if}
</main>
