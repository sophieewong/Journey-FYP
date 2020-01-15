<script>
  export let prevPageLink;
  export let nextPageLink;
</script>

<style type="text/scss">
  @import "../styles/shared";

  .buttons {
    margin-right: 3rem;

    @media screen and (min-width: $sm-tablet-breakpoint) {
      display: flex;
    }
  }

  .container {
    width: 100%;

    @media screen and (min-width: $sm-tablet-breakpoint) {
      width: 50%;
    }

    @media screen and (min-width: $desktop-breakpoint) {
      width: 30%;
    }
  }

  .back-button {
    margin-left: 0;
    font-size: 1.5rem;

    @media screen and (max-width: $sm-tablet-breakpoint) {
      margin-right: 0;
    }
  }

  .next-button {
    font-size: 1.5rem;
    margin-left: 0;

    @media screen and (max-width: $sm-tablet-breakpoint) {
      margin-right: 0;
    }
  }
</style>

<div class="buttons">
  <div class="back-button-container container">
    <a href={prevPageLink} class="back-button secondary-btn btn">Back</a>
  </div>
  <div class="next-button-container container">
    <a href={nextPageLink} class="next-button primary-btn btn">Next</a>
  </div>
</div>
