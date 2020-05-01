<script>
  import { firebase } from "@firebase/app";
  import "@firebase/auth";

  import { auth } from "../stores.js";
  import Header from "../Components/Header.svelte";
  import LoginButton from "../Components/LoginButton.svelte";
</script>

<style type="text/scss">
  @import "../styles/shared";

  .headings {
    background-color: $blue;
    display: block;
    width: 100%;
  }

  .start-label {
    font-size: 2rem;
    font-family: $body-text;
    color: $white;
    cursor: default;
    text-align: center;
  }

  .app-overview {
    padding-left: 6rem;
    padding-right: 6rem;
    margin-bottom: 3rem;

    @media screen and (max-width: $mobile-breakpoint) {
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }

  .create-itinerary-account {
    height: 13rem;
    background-color: $boxshadow-blue;
    justify-content: center;
  }

  .create-itinerary-account {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .continue-btn {
    border: 2px solid $white;
    border-radius: 7px;
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    color: $white;
    font-family: $body-text;
    font-size: 1.5rem;
    text-decoration: none;

    &:hover {
      transform: scale(1.2);
      transition: transform 0.5s ease;
    }
  }

  .step-icon {
    width: 8rem;
    height: 8rem;
    padding: 2rem;
    margin: 0 auto;
    border: 5px $blue solid;
    border-radius: 130px;
    margin-top: 1.5rem;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .about-us-icons {
    @media screen and (min-width: $desktop-breakpoint) {
      display: flex;
      justify-content: space-around;
      margin: 1rem;
    }
  }

  .how-it-work {
    display: flex;
    justify-content: center;
  }
  .title {
    font-weight: bold;
    font-size: 1.5rem;
    font-family: $body-text;
    color: $blue;
    cursor: default;
    margin-bottom: 13px;
    text-align: center;
  }

  .step-description {
    width: 17rem;
    text-align: center;
    font-size: 1rem;
    font-family: $body-text;
    cursor: default;
    margin-top: 0;
    line-height: 1.5rem;
  }

  .how-does-it-work {
    font-weight: bold;
    font-size: 2rem;
    font-family: $body-text;
    color: $blue;
    cursor: default;
    margin-bottom: 0;
    text-align: center;
  }

  .app-intro {
    font-family: $body-text;
    color: $blue;
  }

  .app-intro-title {
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 0;
  }

  .app-intro-container {
    display: flex;
    margin-bottom: 4rem;
    margin-top: 2rem;

    @media screen and (max-width: $mobile-breakpoint) {
      margin-bottom: 6rem;
    }
  }

  .app-intro-content {
    font-size: 1rem;
    min-width: 20rem;
    color: black;
    line-height: 1.5rem;
  }

  .app-intro-img {
    display: none;
    @media screen and (min-width: $tablet-breakpoint) {
      display: block;
      height: 100%;
      width: 100%;
      margin-right: 2rem;
      border-radius: 7px;
      padding: 1rem 2rem;
    }
  }

  .app-intro-box {
    display: flex;
    flex-direction: column;
    margin: auto 0;

    @media screen and (max-width: $tablet-breakpoint) {
      text-align: center;
    }

    .authenticated-user {
      display: flex;

      @media screen and (max-width: $tablet-breakpoint) {
        display: flex;
        justify-content: center;
      }
    }

    .continue-btn {
      border: 2px solid $blue;
      color: $blue;
      font-family: $body-text;

      &:hover {
        background-color: $blue;
        color: $white;
        transform: scale(1);
        transition: transform 0.5s ease;
      }
    }
  }

  .planning-img {
    height: 100%;
    width: 100%;
    border-radius: 7px;
    box-shadow: 0px 10px 60px rgba(0, 0, 0, 0.25);
    max-height: 400px;
    max-width: 345px;
    min-height: 250px;
    min-width: 175px;
  }

  .app-intro-subtitle {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
</style>

<section class="headings">
  <Header />
</section>

<section class="app-overview about-page">
  <div class="app-intro-container">
    <div class="app-intro-img">
      <img
        class="planning-img"
        src="./images/planning-grey.jpg"
        alt="planning an itinerary" />
    </div>
    <div class="app-intro-box">
      <p class="app-intro app-intro-title">About Journey</p>
      <p class="app-intro app-intro-subtitle">
        A Holiday Itinerary Planning Application
      </p>
      <p class="app-intro app-intro-content">
        We aim to transform the long and stressful pre-holiday task of planning
        and creating a dream holiday itinerary, by aiding our users to speed up
        this process digitally.
      </p>
      <div class="authenticated-user">
        {#if $auth.isAuthenticated}
          <a href="/#/itineraries" class="continue-btn">
            Let's Create an Itinerary
          </a>
        {:else}
          <a href="/#/login" class="continue-btn">Get Started</a>
        {/if}
      </div>
    </div>
  </div>
  <div class="how-title-container">
    <p class="how-does-it-work">How does it work?</p>
  </div>
  <div class="about-us-icons">
    <div class="step-icon-content">
      <div class="step-icon step-one">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 512 512"
          width="512px"
          height="512px">
          <g>
            <path
              d="M472,24H40A24.028,24.028,0,0,0,16,48V464a24.028,24.028,0,0,0,24,24H472a24.028,24.028,0,0,0,24-24V48A24.028,24.028,0,0,0,472,24ZM40,40H472a8.009,8.009,0,0,1,8,8V88H32V48A8.009,8.009,0,0,1,40,40ZM472,472H40a8.009,8.009,0,0,1-8-8V104H480V464A8.009,8.009,0,0,1,472,472Z"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <circle
              cx="120"
              cy="64"
              r="8"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <circle
              cx="88"
              cy="64"
              r="8"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <circle
              cx="56"
              cy="64"
              r="8"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="M352,328H160a8,8,0,0,0-8,8v32a8,8,0,0,0,8,8H352a8,8,0,0,0,8-8V336A8,8,0,0,0,352,328ZM168,344h16v16H168Zm176,16H200V344H344Z"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="M352,392H160a8,8,0,0,0-8,8v32a8,8,0,0,0,8,8H352a8,8,0,0,0,8-8V400A8,8,0,0,0,352,392ZM168,408h16v16H168Zm176,16H200V408H344Z"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="M256,312a88.016,88.016,0,1,0-66.2-30.03A87.992,87.992,0,0,0,256,312Zm-51.126-37.331C213.848,248.971,233.953,232,256,232s42.153,16.972,51.125,42.669a71.934,71.934,0,0,1-102.251,0ZM240,200a16,16,0,1,1,16,16A16.019,16.019,0,0,1,240,200Zm16-48a71.973,71.973,0,0,1,62.362,107.951c-8.611-18.187-22.282-31.926-38.31-38.879a32,32,0,1,0-48.1,0c-16.028,6.953-29.7,20.692-38.31,38.879A71.973,71.973,0,0,1,256,152Z"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
          </g>
        </svg>
      </div>
      <div class="how-it-work">
        <p class="title">1. Create an Account</p>
      </div>
      <div class="how-it-work">
        <p class="step-description">
          Get yourself setup to start creating a holiday itinerary.
        </p>
      </div>
    </div>
    <div class="step-icon-content">
      <div class="step-icon step-two">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_5"
          enable-background="new 0 0 64 64"
          height="512px"
          viewBox="0 0 64 64"
          width="512px">
          <g>
            <g>
              <path
                d="m4.202 21.446-1.479 2.489 5.342 5.342
                2.489-1.48c.317.147.638.281.956.4l.713
                2.803h7.555l.713-2.802c.318-.119.639-.252.956-.4l2.489 1.48
                5.342-5.342-1.479-2.489c.147-.317.281-.637.4-.956l2.801-.714v-7.555l-2.802-.713c-.119-.319-.253-.639-.4-.957l1.479-2.489-5.342-5.342-2.489
                1.48c-.317-.147-.638-.281-.956-.4l-.713-2.801h-7.555l-.712
                2.802c-.318.119-.639.252-.956.4l-2.489-1.48-5.342 5.342 1.479
                2.489c-.147.318-.281.637-.4.957l-2.802.713v7.555l2.802.713c.119.319.253.638.4.955zm-1.202-7.669
                2.354-.599.168-.528c.179-.558.416-1.125.705-1.683l.255-.493-1.246-2.095
                3.143-3.143 2.095 1.246.492-.254c.56-.289 1.126-.525
                1.686-.704l.528-.169.597-2.355h4.445l.598 2.354.528.169c.56.179
                1.126.415 1.686.704l.492.254 2.095-1.246 3.143 3.143-1.246
                2.095.255.493c.289.559.526 1.125.705 1.683l.168.528
                2.354.6v4.445l-2.354.599-.168.528c-.179.559-.416 1.125-.704
                1.683l-.256.493 1.246 2.096-3.143
                3.143-2.095-1.246-.492.254c-.56.289-1.126.525-1.686.704l-.528.169-.597
                2.355h-4.445l-.598-2.354-.528-.169c-.56-.179-1.126-.415-1.686-.704l-.492-.254-2.095
                1.246-3.143-3.143
                1.246-2.096-.256-.493c-.288-.558-.525-1.124-.704-1.683l-.168-.528-2.354-.599z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m16 25c4.963 0 9-4.038 9-9s-4.037-9-9-9-9 4.038-9 9 4.037 9 9
                9zm0-16c3.859 0 7 3.14 7 7s-3.141 7-7 7-7-3.14-7-7 3.141-7 7-7z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m58 53h-28.236l-5.316 2.658c-.893.446-1.448 1.344-1.448
                2.342s.555 1.896 1.447 2.342l5.317 2.658h28.236c2.757 0 5-2.243
                5-5s-2.243-5-5-5zm-27 6h24v2h-24zm24-2h-24v-2h24zm-30
                1c0-.236.131-.447.342-.553l3.658-1.829v4.764l-3.658-1.829c-.211-.106-.342-.317-.342-.553zm33
                3h-1v-6h1c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m53 15h-.142c-.447-1.72-1.999-3-3.858-3s-3.411 1.28-3.858
                3h-12.142v2h12.142c.447 1.72 1.999 3 3.858 3s3.411-1.28
                3.858-3h.142c4.411 0 8 3.589 8 8v6c0 4.411-3.589 8-8
                8h-3.142c-.447-1.72-1.999-3-3.858-3s-3.411 1.28-3.858
                3h-6.284c-.447-1.72-1.999-3-3.858-3s-3.411 1.28-3.858
                3h-6.284c-.447-1.72-1.999-3-3.858-3s-3.411 1.28-3.858
                3h-3.142c-5.514 0-10 4.486-10 10s4.486 10 10 10h10v-2h-10c-4.411
                0-8-3.589-8-8s3.589-8 8-8h3.142c.447 1.72 1.999 3 3.858
                3s3.411-1.28 3.858-3h6.284c.447 1.72 1.999 3 3.858 3s3.411-1.28
                3.858-3h6.284c.447 1.72 1.999 3 3.858 3s3.411-1.28
                3.858-3h3.142c5.514 0 10-4.486
                10-10v-6c0-5.514-4.486-10-10-10zm-4 3c-1.103 0-2-.897-2-2s.897-2
                2-2 2 .897 2 2-.897 2-2 2zm-31 24c-1.103 0-2-.897-2-2s.897-2 2-2
                2 .897 2 2-.897 2-2 2zm14 0c-1.103 0-2-.897-2-2s.897-2 2-2 2
                .897 2 2-.897 2-2 2zm14 0c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897
                2 2-.897 2-2 2z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m33 22h14v2h-14z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m33 26h14v2h-14z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m41 30h2v2h-2z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m37 30h2v2h-2z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m45 30h2v2h-2z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m33 30h2v2h-2z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m17 48h2v2h-2z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m13 48h2v2h-2z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m5 48h2v2h-2z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
              <path
                d="m9 48h2v2h-2z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#55A9F2" />
            </g>
          </g>
        </svg>
      </div>
      <div class="how-it-work">
        <p class="title">2. Start Planning</p>
      </div>
      <div class="how-it-work">
        <p class="step-description">
          Start the process of creating your personalised dream holiday
          itinerary that fits to your prefered city destination, date(s),
          budget, and places of interests.
        </p>
      </div>
    </div>
    <div class="step-icon-content">
      <div class="step-icon step-three">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="512px"
          viewBox="0 -2 396.15488 396"
          width="512px"
          class="">
          <g>
            <path
              d="m158.378906 218.230469-15.757812
              21.007812-8.085938-8.085937c-2.667968-2.664063-6.988281-2.664063-9.652344
              0-2.667968 2.667968-2.667968 6.988281 0 9.652344l13.652344
              13.65625c1.285156 1.285156 3.019532 2 4.828125 2 .160157 0
              .320313-.007813.484375-.023438 1.972656-.136719 3.789063-1.125
              4.972656-2.710938l20.480469-27.308593c2.265625-3.011719
              1.65625-7.292969-1.367187-9.554688-3.007813-2.25-7.292969-1.652343-9.554688
              1.367188zm0 0"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="m158.378906 306.980469-15.757812
              21.003906-8.085938-8.085937c-2.667968-2.664063-6.988281-2.664063-9.652344
              0-2.667968 2.667968-2.667968 6.988281 0 9.65625l13.652344
              13.652343c1.285156 1.285157 3.019532 2 4.828125 2 .160157 0
              .320313-.007812.484375-.019531 1.972656-.140625 3.789063-1.128906
              4.972656-2.714844l20.480469-27.308594c2.265625-3.011718
              1.65625-7.289062-1.367187-9.550781-3.007813-2.253906-7.292969-1.65625-9.554688
              1.367188zm0 0"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="m211.625 167.710938h27.308594c3.773437 0 6.828125-3.054688
              6.828125-6.828126
              0-3.773437-3.054688-6.824218-6.828125-6.824218h-27.308594c-3.773438
              0-6.824219 3.050781-6.824219 6.824218 0 3.773438 3.054688 6.828126
              6.824219 6.828126zm0 0"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="m293.546875 242.804688h-102.398437c-3.773438 0-6.828126
              3.054687-6.828126 6.828124 0 3.773438 3.054688 6.824219 6.828126
              6.824219h102.398437c3.773437 0 6.828125-3.050781 6.828125-6.824219
              0-3.773437-3.054688-6.828124-6.828125-6.828124zm0 0"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="m396.15625
              95.839844c0-43.933594-35.746094-79.683594-79.683594-79.683594-40.523437
              0-74.007812 30.4375-78.972656
              69.636719h-46.351562v-39.734375c0-15.734375-12.800782-28.535156-28.535157-28.535156h-22.351562v-10.621094c0-3.773438-3.054688-6.824219-6.828125-6.824219-3.773438
              0-6.828125 3.050781-6.828125
              6.824219v10.621094h-62.066407v-10.621094c0-3.773438-3.050781-6.824219-6.824218-6.824219-3.773438
              0-6.828125 3.050781-6.828125
              6.824219v10.621094h-22.351563c-15.734375 0-28.535156
              12.800781-28.535156 28.535156v117.332031c0 17.441406 14.1875
              31.628906 31.625 31.628906h57.121094v160.878907c0 20.453124
              16.640625 37.09375 37.09375 37.09375h178.398437c20.453125 0
              37.09375-16.640626
              37.09375-37.09375v-184.40625c31.789063-10.476563
              54.824219-40.40625
              54.824219-75.652344zm-367.621094-64.660156h22.351563v5.164062c0
              3.773438 3.054687 6.828125 6.828125 6.828125 3.773437 0
              6.824218-3.054687 6.824218-6.828125v-5.164062h62.066407v5.164062c0
              3.773438 3.054687 6.828125 6.828125 6.828125 3.773437 0
              6.828125-3.054687 6.828125-6.828125v-5.164062h22.351562c8.207031 0
              14.882813 6.671874 14.882813
              14.878906v19.253906h-19.699219c-8.03125-8.394531-19.308594-13.65625-31.8125-13.65625-12.523437
              0-23.816406 5.28125-31.847656
              13.699219-.074219-.003907-.136719-.042969-.214844-.042969h-80.269531v-19.253906c0-8.207032
              6.675781-14.878906 14.882812-14.878906zm97.445313
              34.132812c16.765625 0 30.414062 13.636719 30.414062 30.40625 0
              11.585938-16.953125 37.089844-30.414062
              54.296875-13.460938-17.199219-30.40625-42.699219-30.40625-54.296875
              0-16.765625 13.640625-30.40625 30.40625-30.40625zm-112.328125
              98.078125v-84.425781h71.59375c-2.132813 5.167968-3.324219
              10.820312-3.324219 16.753906 0 22.390625 34.84375 64.777344
              38.816406 69.539062 1.296875 1.550782 3.214844 2.453126 5.242188
              2.453126 2.023437 0 3.941406-.898438 5.238281-2.453126
              3.972656-4.761718 38.828125-47.148437 38.828125-69.539062
              0-5.933594-1.195313-11.585938-3.328125-16.753906h10.773438v79.941406c0
              12.386719-10.074219 22.457031-22.460938
              22.457031h-123.402344c-9.914062
              0-17.976562-8.058593-17.976562-17.972656zm314.027344 192.507813c0
              12.925781-10.511719 23.441406-23.4375
              23.441406h-178.402344c-12.925782
              0-23.4375-10.515625-23.4375-23.441406v-160.878907h52.632812c19.914063
              0 36.113282-16.203125
              36.113282-36.113281v-59.460938h45.828124c1.90625 42.253907
              36.78125 76.074219 79.5 76.074219 3.8125 0 7.535157-.363281
              11.207032-.882812v181.261719zm-11.207032-194.03125c-36.40625
              0-66.027344-29.621094-66.027344-66.027344 0-36.410156
              29.621094-66.027344 66.027344-66.027344 36.410156 0 66.027344
              29.617188 66.027344 66.027344 0 36.40625-29.621094
              66.027344-66.027344 66.027344zm0 0"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="m293.546875 331.550781h-102.398437c-3.773438 0-6.828126
              3.054688-6.828126 6.828125 0 3.773438 3.054688 6.824219 6.828126
              6.824219h102.398437c3.773437 0 6.828125-3.050781 6.828125-6.824219
              0-3.773437-3.054688-6.828125-6.828125-6.828125zm0 0"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="m316.472656 38.003906c-31.886718 0-57.832031
              25.945313-57.832031 57.835938 0 31.886718 25.945313 57.832031
              57.832031 57.832031 31.890625 0 57.835938-25.945313
              57.835938-57.832031
              0-31.890625-25.945313-57.835938-57.835938-57.835938zm0
              102.015625c-24.359375 0-44.179687-19.820312-44.179687-44.179687
              0-24.363282 19.820312-44.183594 44.179687-44.183594 24.363282 0
              44.183594 19.820312 44.183594 44.183594 0 24.359375-19.824219
              44.179687-44.183594 44.179687zm0 0"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="m333.441406
              103.644531-14.773437-7.386719v-23.605468c0-3.773438-3.054688-6.828125-6.828125-6.828125-3.773438
              0-6.824219 3.054687-6.824219 6.828125v27.828125c0 2.585937
              1.457031 4.945312 3.773437 6.105469l18.542969
              9.273437c.980469.488281 2.023438.71875 3.046875.71875 2.507813 0
              4.914063-1.378906 6.113282-3.773437
              1.6875-3.371094.320312-7.472657-3.050782-9.160157zm0 0"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
            <path
              d="m145.753906
              95.71875c0-10.898438-8.871094-19.765625-19.773437-19.765625-10.898438
              0-19.765625 8.867187-19.765625 19.765625 0 10.902344 8.867187
              19.773438 19.765625 19.773438 10.902343 0 19.773437-8.875
              19.773437-19.773438zm-25.886718 0c0-3.375 2.738281-6.113281
              6.113281-6.113281s6.121093 2.738281 6.121093 6.113281-2.746093
              6.121094-6.121093 6.121094-6.113281-2.75-6.113281-6.121094zm0 0"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#55A9F2" />
          </g>
        </svg>
      </div>
      <div class="how-it-work">
        <p class="title">3. Holiday Itinerary Ready!</p>
      </div>
      <div class="how-it-work">
        <p class="step-description">
          In just a few steps and a matter of minutes, your itinerary will be
          ready. You can further personalise it to suit you and access your
          itineraries from anywhere.
        </p>
      </div>
    </div>
  </div>

</section>

<section class="create-itinerary-account about-page">
  <p class="start-label">Let's Build Memorable Journeys Together</p>
  <div class="authenticated-user">
    {#if $auth.isAuthenticated}
      <a href="/#/itineraries" class="continue-btn">Create an Itinerary</a>
    {:else}
      <a href="/#/login" class="continue-btn">Get Started</a>
    {/if}
  </div>
</section>
