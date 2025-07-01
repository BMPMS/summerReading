{#if show}
  <div
    class="suggestions-backdrop"
    role="button"
    tabindex="0"
    on:click={closeSuggestionsModal}
    on:keydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        closeSuggestionsModal;
      }
    }}
    >
    <div
      class="suggestions-modal"
      role="button"
      tabindex="0"
      on:click|stopPropagation
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          stopPropagation;
        }
      }}
      >
      <p class="suggestions-modal-title">Summer Reading Suggestions</p>

      <div class="suggestions-form-group">
        <label for="title">Book Title</label>
        <input
          id="title"
          type="text"
          class="suggestions-input"
          bind:value={title}
        />
      </div>

      <div class="suggestions-form-group">
        <label for="author">Author</label>
        <input
          id="author"
          type="text"
          class="suggestions-input"
          bind:value={author}
        />
      </div>

      <div class="suggestions-form-group">
        <label for="why">Why?</label>
        <textarea
          id="why"
          rows="6"
          class="suggestions-textarea"
          bind:value={why}
        ></textarea>
      </div>

      <div class="suggestions-actions">
        <button on:click={sendEmail}>Send Email</button>
      </div>
    </div>
  </div>
{/if}

<script>
 // modal code written almost entirely by ChatGPT with additional styling and a few prompts to perfect

  import { createEventDispatcher } from 'svelte';
  export let show = false;

  const dispatch = createEventDispatcher();

  let title = '';
  let author = '';
  let why = '';

  const closeSuggestionsModal = () => {
    dispatch('close'); // Notify parent to hide the modal
  };

  function sendEmail() {
    const subject = encodeURIComponent('Summer Reading Suggestion');
    const body = encodeURIComponent(
      `Book Title: ${title}\nAuthor: ${author}\nWhy: ${why}`,
    );
    const mailtoLink = `mailto:info@evalhere.org?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    // Optional: clear form fields
    title = '';
    author = '';
    why = '';
    closeSuggestionsModal();
  }
</script>
