<script>
  import Logo from "../Components/Logo.svelte";
  import Navigation from "../Components/Navigation.svelte";
</script>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 6rem;
    padding-right: 6rem;
  }
</style>

<div class="header">
  <Logo />
  <Navigation />
</div>
