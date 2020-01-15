<script>
  export let prevPageLink;
  export let nextPageLink;
</script>

<style type="text/scss">
  @import "../styles/shared";

  .buttons {
    display: flex;
    position: fixed;
    bottom: 0;
    margin-bottom: 4rem;
  }
  .next-button {
    width: 17rem;
    height: 3.5rem;
    font-size: 1.5rem;
  }

  .back-button {
    margin-left: 0;
    font-size: 1.5rem;
  }
</style>

<div class="buttons">
  <div class="back-button-container">
    <a href={prevPageLink} class="back-button secondary-btn btn">Back</a>
  </div>
  <div class="next-button-container">
    <a href={nextPageLink} class="next-button primary-btn btn">Next</a>
  </div>
</div>
