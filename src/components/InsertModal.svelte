<script>
  import { onMount } from "svelte";
  import Spacer from "./common/Spacer.svelte";
  import { uploadFile } from "../firebase/storage";
  import { getYearList, insertNotes, LangList } from "../firebase/firestore";

  export let visible;
  export let onDismiss;

  let year;
  let yearList = [];

  const langList = LangList;
  let lang = langList[0];

  let chapterNumber = "";
  let chapterName = "";
  let notesText = "";
  let files;

  $: canUpload =
    chapterName && chapterNumber > 0 && ((files && files[0]) || notesText);

  let uploadInProgress = false;
  let uploadError = false;

  async function onSubmit() {
    uploadInProgress = true;
    uploadError = false;

    try {
      let filePath = "";
      if (files && files[0]) {
        const uploadSnapShot = await uploadFile(files[0]);
        filePath = uploadSnapShot.ref.fullPath;
      }

      const path = `/notes/${year}/${lang}`;
      await insertNotes(path, {
        chapterNumber,
        chapterName,
        notesText,
        filePath,
      });

      onDismiss();
    } catch (error) {
      console.log(error.message);
      uploadError = true;
    } finally {
      uploadInProgress = false;
    }
  }

  onMount(() => {
    getYearList().then((l) => {
      yearList = l;
      year = l[0];
    });
  });
</script>

<style>
  .flexContainer {
    display: flex;
  }

  #modalContainer {
    margin: 1em;
  }

  #buttonContainer {
    display: flex;
    justify-content: center;
  }
</style>

<div class="modal" class:is-active={visible}>
  <div class="modal-background" />
  <div class="modal-content">
    <div id="modalContainer">
      <div class="box">
        <h3 class="mb-1">Type</h3>
        <div class="block flexContainer">
          <div class="control">
            <div class="select">
              <select bind:value={year}>
                {#each yearList as year}
                  <option>{year}</option>
                {/each}
              </select>
            </div>
          </div>

          <Spacer />

          <div class="control">
            <div class="select">
              <select bind:value={lang}>
                {#each langList as lang}
                  <option>{lang}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>

        <h3 class="mb-1">Chapter details</h3>
        <div class="block flexContainer">
          <input
            type="number"
            class="input"
            bind:value={chapterNumber}
            placeholder="Chapter Number" />

          <Spacer />

          <input
            type="text"
            class="input"
            bind:value={chapterName}
            placeholder="Chapter Name" />
        </div>

        <div class="control block">
          <h3 class="mb-1">Notes as a file</h3>
          <input type="file" id="myfile" name="myfile" bind:files />
        </div>

        <div class="control block">
          <h3 class="mb-1">Notes as text</h3>
          <textarea
            bind:value={notesText}
            class="textarea is-primary"
            placeholder="Type Here" />
        </div>

        {#if uploadError}
          <div class="notification is-danger">
            Upload failed. Make sure you have suffecient permissions and try
            again
          </div>
        {/if}

        <div id="buttonContainer">
          <button
            class="button is-primary"
            class:is-loading={uploadInProgress}
            disabled={uploadInProgress || !canUpload}
            on:click={onSubmit}>
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
  <button
    aria-label="close"
    class="modal-close is-large"
    on:click={onDismiss} />
</div>
