<script>
  export let open = false;
  export let onClose = () => {};
  export let modalData = { title: '', author: '' };
   export let rating = 3.3;
    const maxStars = 5;

    // Round rating to nearest integer
    $: rounded = Math.round(rating);
    $: emptyStars = maxStars - rounded;
</script>

{#if open}
  <div class="modal-overlay" on:click="{onClose}">
    <div class="modal" on:click|stopPropagation>
      <div class="modal-top-left">
        <img id="bookImage" src="https://via.placeholder.com/200" alt="Image" />
      </div>
      <div class="modal-top-right">
        <p class="modal-title">{modalData.title}</p>
        <p>{modalData.author}</p>
        <p>{modalData.genre}</p>
        <div class="star-rating">
          {#each Array(rounded) as _}
            <span>★</span>
          {/each}
          {#each Array(emptyStars) as _}
            <span>☆</span>
          {/each}
        </div>
        <span class="modal-goodreads">{modalData.rating}</span>
      </div>
      <div class="modal-bottom">
        <p>{modalData.summary}</p>
      </div>
    </div>
  </div>
{/if}

