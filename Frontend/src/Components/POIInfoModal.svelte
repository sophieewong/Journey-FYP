<script>
  export let onClose;
  export let image;
  export let name;
  export let destination;
  export let category;
  export let description;
  export let openingHours = "";
  export let budget;
  export let ratings = "";
</script>

<section>
  <button on:click={onClose}>X</button>
  <div>
    <img src={image} alt="image of {name}" />
    <p>{name}, {destination}</p>
    <p>{category}</p>
    <p>{description}</p>
    <p>{openingHours}</p>
    <p>{budget}</p>
    <p>{ratings}</p>
  </div>
</section>
