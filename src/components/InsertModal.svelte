<script>
  export let visible;
  export let onDismiss;

  import {
    getLangList,
    getYearList,
    insertNotes,
    LangList,
  } from "../firebase/firestore";

  import { uploadFile } from "../firebase/storage";

  let yearList = getYearList().then((l) => (yearList = l));
  $: year = Array.isArray(yearList) && yearList[0];

  const langList = LangList;
  let lang = langList[0];

  let chapterNumber = "";
  let chapterName = "";
  let notesText = "";

  let files;

  async function onSubmit() {
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
  }
</script>

<style>
  .spacer {
    margin: 1em;
  }

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

          <div class="spacer" />

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
          <div class="spacer" />
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

        <div id="buttonContainer">
          <div class="button is-primary" on:click={onSubmit}>Upload</div>
        </div>
      </div>
    </div>
  </div>
  <button
    aria-label="close"
    class="modal-close is-large"
    on:click={onDismiss} />
</div>
