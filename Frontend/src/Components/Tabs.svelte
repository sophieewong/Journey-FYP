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

    @media screen and (min-width: $lg-tablet-breakpoint) {
      display: block;
    }

    &:last-child {
      display: none;
    }
  }

  nav {
    margin-top: 0;
    margin-bottom: 2rem;

    ul {
      padding-left: 0;
      margin-top: 0;
    }
  }

  .left-tab {
    margin-right: 2.5rem;
  }

  .right-tab {
    margin-left: 2.5rem;
  }

  .desktop-nav {
    display: none;

    @media screen and (min-width: $lg-tablet-breakpoint) {
      display: block;
    }
  }

  .mobile-nav {
    @media screen and (min-width: $lg-tablet-breakpoint) {
      display: none;
    }
  }

  .two-tabs {
    li {
      cursor: pointer;
    }
  }

  .not-clickable {
    cursor: not-allowed;
  }
</style>

{#if tabs.length > 2}
  <nav class="desktop-nav not-clickable">
    <ul>
      {#each tabs as tab}
        <li class:active={tab === tabs[activeTab]}>{tab}</li>
        <div class="desktop-arrow">></div>
      {/each}
    </ul>
  </nav>

  <nav class="mobile-nav not-clickable">
    <ul>
      <!--If there is a tab to the left of the active tab in the tabs array, show
        an <li> with that tabs name (tabs[activeTab - 1])
    -->
      {#if activeTab > 0}
        <li class="left-tab">{tabs[activeTab - 1]}</li>
      {/if}

      <li class="active">{tabs[activeTab]}</li>

      <!--If there is a tab to the right of the active tab in the tabs array, show
        an <li> with that tabs name (tabs[activeTab + 1])
    -->
      {#if activeTab < tabs.length - 1}
        <li class="right-tab">{tabs[activeTab + 1]}</li>
      {/if}
    </ul>
  </nav>
{/if}

{#if tabs.length < 3}
  <nav class="two-tabs">
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
{/if}
