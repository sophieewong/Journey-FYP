<script>
  import Header from "../Components/Header.svelte";
</script>

<style type="text/scss">
  @import "../styles/shared";

  section {
    display: block;
    width: 100%;
  }

  .headings {
    background-color: $blue;
    display: block;
    width: 100%;
  }

  .error-page-content {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .page-error-image {
      display: inline-block;
    }

    img {
      width: 100%;
      height: 100%;
      max-width: 34rem;
      max-height: 34rem;
    }

    .page-error-text {
      display: inline-block;
      margin: 0 1.5rem 1.5rem 1.5rem;

      .main-text {
        font-family: $body-text;
        font-weight: 100;
        font-size: 4rem;
        line-height: 4rem;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        letter-spacing: 0.06em;
        color: #000000;
        margin: 0;
      }

      .sub-text {
        font-family: $body-text;
        font-style: normal;
        font-weight: 300;
        font-size: 2rem;
        line-height: 2rem;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.06em;
        color: rgb(136, 136, 136);
        margin: 0.5rem 1rem;
      }
    }

    .return-button {
      display: inline-block;
      margin-top: 1rem;
      margin-bottom: 3rem;

      a {
        &:hover {
          background-color: transparent;
          color: $blue;
          border: 1px solid $blue;
          border-radius: 10px;
          transition: transform 0.5s ease;
          transform: scale(1.1);
        }
      }
    }
  }
</style>

<section class="headings">
  <Header />
</section>
<section class="error-page-content">
  <div class="page-error-image">
    <img
      class="page-not-found-img"
      src="./images/notFound.png"
      alt="Page Not Found" />
  </div>
  <div class="page-error-text">
    <p class="main-text">Oooops....</p>
    <p class="sub-text">Guess we’ve gone alittle off track.</p>
  </div>
  <div class="return-button">
    <a href="#/" class="primary-btn btn">Let's Go Back!</a>
  </div>
</section>
