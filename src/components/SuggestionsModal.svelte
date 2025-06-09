<script>
  export let show = false;

  let title = '';
  let author = '';
  let why = '';

  const closeSuggestionsModal = () => {
    show = false;
  };

  function sendEmail() {
    const subject = encodeURIComponent("Form Submission");
    const body = encodeURIComponent(
      `First Input: ${title}\nSecond Input: ${author}\nLong Input:\n${why}`
    );
    const mailtoLink = `mailto:a.a.accettola@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }
</script>

{#if show}
  <div class="suggestions-backdrop" on:click={closeModal}>
    <div class="suggestions-modal" on:click|stopPropagation>
      <p class="modal-title">Summer Reading Suggestions</p>

      <div class="suggestions-form-group">
        <label for="title">Book Title</label>
        <input class="suggestions-input" id="title" type="text" bind:value={title} />
      </div>

      <div class="suggestions-form-group">
        <label for="author">Author</label>
        <input class="suggestions-input" id="author" type="text" bind:value={author} />
      </div>

      <div class="suggestions-form-group">
        <label for="why">Why?</label>
        <textarea id="why" rows="6" bind:value={why}></textarea>
      </div>

      <div class="suggestions-actions">
        <button on:click={closeSuggestionsModal}>Close</button>
       <button on:click={sendEmail}>Send Email</button>
      </div>
    </div>
  </div>
{/if}

