<script>
  import NavBar from "./components/NavBar.svelte";
  import MainPage from "./MainPage.svelte";
</script>

<style>
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css" />
</svelte:head>

<main>
  <NavBar />
  <MainPage />
</main>
