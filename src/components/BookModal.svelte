{#if open}
  <div
    role="button"
    tabindex="0"
    class="modal-overlay"
    on:click={onClose}
    on:keydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClose;
      }
    }}
  >
    >
    <div
      role="button"
      tabindex="0"
      class="modal"
      on:click|stopPropagation
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          stopPropagation;
        }
      }}
    >
      >
      <div class="modal-top-left">
        <img id="bookImage" src={modalData.imageUrl} alt="bookImage" />
      </div>
      <div class="modal-top-right">
        <p class="modal-title">{modalData.title}</p>
        <p>{modalData.author}</p>
        <p>{modalData.genre}</p>
        <div
          class="star-rating"
          style={`visibility:${modalData.rating === 0 ? 'hidden' : 'visible'};`}
        >
          {#each Array(rounded) as _}
            <span>★</span>
          {/each}
          {#each Array(emptyStars) as _}
            <span>☆</span>
          {/each}
        </div>
        <span class="modal-goodreads"
          >{modalData.rating === 0
            ? ''
            : `${modalData.rating} from ${modalData.ratingTotal} ratings`}</span
        >
      </div>
      <div class="modal-bottom">
        <a
          class="buy-button"
          href={modalData.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {'Buy Now on Amazon'}
        </a>
        <p>{modalData.summary}</p>
      </div>
    </div>
  </div>
{/if}

<script>
  // modal code written almost entirely by ChatGPT with various prompts for extras (ie star ratings)
  export let open = false;
  export let onClose = () => {};
  export let modalData = { title: '', author: '' };
  const maxStars = 5;

  // Round rating to nearest integer
  $: rounded = Math.round(modalData.rating);
  $: emptyStars = maxStars - rounded;
</script>
