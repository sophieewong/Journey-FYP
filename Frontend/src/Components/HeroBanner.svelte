<script>
  import Header from "../Components/Header.svelte";
  //import searchbox

  export let title;
  export let image;
  export let showSearchBox = false;
</script>

<style type="text/scss">
  @import "../styles/shared";

  .hero-banner {
    background-size: cover;
    height: 100%;
  }

  .hero-title {
    color: $white;
    font-family: $page-heading;
    font-weight: lighter;
    font-style: normal;
    line-height: 29px;
    letter-spacing: 0.06em;
    width: 100%;
    font-size: 3rem;

    @media screen and (max-width: $mobile-breakpoint) {
      font-size: 2rem;
    }
  }

  .page-hero {
    text-align: center;
    padding-bottom: 2rem;

    .searchbox {
      display: flex;
      justify-content: center;

      input {
        padding: 0.5rem 1rem;
        font-size: 17px;
        border: none;
        cursor: pointer;
        border-radius: 1rem 0 0 1rem;
      }

      .search-icon {
        background-color: $blue;
        width: 3rem;
        display: flex;
        align-items: center;
        border-radius: 0 1rem 1rem 0;
        cursor: pointer;

        button {
          color: transparent;
          margin: 0;
          border: none;
          background-color: transparent;
          cursor: pointer;
        }
      }

      i {
        color: $white;
        margin-left: 0.75rem;
      }
    }
  }
</style>

<div
  class="hero-banner"
  style="background: linear-gradient(0deg, rgba(21, 21, 21, 0.38), rgba(21, 21,
  21, 0.38)),url({image}); background-size: cover; background-position: center;
  background-repeat: no-repeat; left: 0px; top: 0px;">
  <Header />
  <div class="page-hero">
    <h2 class="hero-title">{title}</h2>

    {#if showSearchBox}
      <!--SearchBox-->
      <div class="searchbox">
        <input type="text" placeholder="Search..." />
        <div class="search-icon">
          <button>
            <i class="fa fa-search" />
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
