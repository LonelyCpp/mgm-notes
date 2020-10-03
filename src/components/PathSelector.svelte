<script>
  import { onMount } from "svelte";

  export let onPathChange;

  import { getYearList, LangList } from "../firebase/firestore";
  import Spacer from "./common/Spacer.svelte";

  let year;
  let yearList = [];

  const langList = LangList;
  let lang = langList[0];

  $: {
    const path = `notes/${year}/${lang}`;
    if (year && lang && typeof onPathChange === "function") {
      onPathChange(path);
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
</style>

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
