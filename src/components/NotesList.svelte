<script>
  import { getNotes } from "../firebase/firestore";
  export let path;
  let notesBath = [[]];

  $: {
    getNotes(path).then(processNotes);
  }

  function processNotes(newNotes) {
    if (Array.isArray(newNotes)) {
      newNotes = newNotes.sort((a, b) => a.chapterNumber - b.chapterNumber);
      let pos = 0;
      let newBatch = [];
      let batchSize = 4;

      while (pos < newNotes.length) {
        newBatch.push(newNotes.slice(pos, pos + batchSize));
        pos += batchSize;
      }

      const underFlow = pos - newNotes.length;
      for (let i = 0; i < underFlow; i++) {
        newBatch[newBatch.length - 1].push({});
      }

      console.log({
        pos,
        len: newNotes.length,
        underFlow,
        last: newBatch[newBatch.length - 1],
      });

      notesBath = newBatch;
    }
  }
</script>

<style>
  .note {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1em;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
  }
</style>

{#each notesBath as noteCol}
  <div class="columns">
    {#each noteCol as note}
      {#if note.chapterName}
        <div class="column is-flex">
          <div class="note">
            <h1 class="title is-4 has-text-primary">
              {note.chapterName}
              <h1 class="title is-6 has-text-info">
                (chapter:
                {note.chapterNumber})
              </h1>
            </h1>

            <h2 class="subtitle is-6">
              {@html note.notesText}
            </h2>

            {#if note.filePath}
              <div class="button is-link">Download file</div>
            {/if}
          </div>
        </div>
      {:else}
        <div class="column" />
      {/if}
    {/each}
  </div>
{/each}
