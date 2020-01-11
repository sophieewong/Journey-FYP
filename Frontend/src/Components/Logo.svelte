<style type="text/scss">
  @import "../styles/shared";

  .header {
    @media screen and (min-width: $tablet-breakpoint) {
      display: flex;
      justify-content: space-between;
    }
  }

  .logo-container {
    display: flex;
    justify-content: center;

    @media screen and (min-width: $tablet-breakpoint) {
      display: flex;
      justify-content: left;
    }

    .logo {
      margin: 3rem 0 2rem 0;
      cursor: pointer;

      @media screen and (min-width: $tablet-breakpoint) {
        margin: 5rem 0 2rem 0;
        width: 119px;
        height: 37px;
      }
    }
  }
</style>

<div class="centered-container logo-container">
  <img class="logo" src="./images/JourneyLogo.png" alt="Journey Logo" />
</div>
