<script>
  export let title;
  export let value = "";
  export let list = "";

  let textFieldFocused = true;
</script>

<style type="text/scss">
  @import "../styles/shared";

  .text-field-title {
    font-style: normal;
    font-weight: normal;
    font-size: 1.5rem;
    line-height: 27px;
    letter-spacing: 0.1em;
    font-family: $body-text;
  }

  input {
    width: 25rem;
    height: 3rem;
    background: #eeeeee;
    border-radius: 10px;
    font-size: 1.5rem;
    font-family: $body-text;

    @media screen and (max-width: $tablet-breakpoint) {
      width: 100%;
    }
  }

  .warning {
    border: 5px solid red;
  }
</style>

<div class="text-input-field">
  <p class="text-field-title">{title}</p>
  {#if list === 'cities-input'}
    <input
      type="text"
      list="cities-input"
      bind:value
      class:warning={!textFieldFocused && value === ''}
      on:focusout={() => (textFieldFocused = false)} />
  {:else}
    <input
      type="text"
      bind:value
      class:warning={!textFieldFocused && value === ''}
      on:focusout={() => (textFieldFocused = false)} />
  {/if}

  {#if !textFieldFocused && value === ''}
    <p class="warning-text">Please fill out the field before proceeding.</p>
  {/if}
</div>
