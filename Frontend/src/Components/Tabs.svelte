<script>
  export let tabs = [];
  export let onTabClicked;

  export let activeTab = 0;
</script>

<style type="text/scss">
  @import "../styles/shared";
  ul {
    display: flex;
    font-family: $body-text;
    font-size: 1.5em;
    padding: 0 0.5rem;
  }

  li {
    text-decoration: none;
    list-style-type: none;
    color: $grey;
  }
  .active {
    color: black;
    border-bottom: 5px solid $blue;
  }

  .desktop-arrow {
    color: $grey;
    padding: 0 1.5rem;

    @media screen and (max-width: $tablet-breakpoint) {
      display: none;
    }

    &:last-child {
      display: none;
    }
  }

  nav {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .left-tab {
    margin-right: 20px;
  }

  .right-tab {
    margin-left: 20px;
  }
</style>

<nav>
  <ul>
    <!--If there is a tab to the left of the active tab in the tabs array, show
        an <li> with that tabs name (tabs[activeTab - 1])
    -->
    {#if activeTab > 0}
      <li
        class="left-tab"
        on:click={() => {
          activeTab = activeTab - 1;
          onTabClicked(activeTab);
        }}>
        {tabs[activeTab - 1]}
      </li>
    {/if}

    <li class="active">{tabs[activeTab]}</li>

    <!--If there is a tab to the right of the active tab in the tabs array, show
        an <li> with that tabs name (tabs[activeTab + 1])
    -->
    {#if activeTab < tabs.length - 1}
      <li
        class="right-tab"
        on:click={() => {
          activeTab = activeTab + 1;
          onTabClicked(activeTab);
        }}>
        {tabs[activeTab + 1]}
      </li>
    {/if}
  </ul>
</nav>
