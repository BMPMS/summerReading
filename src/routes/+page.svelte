<div class="header">
  <div class="header-left">
    <div class="top-row">
      <div class="title"></div>
      <div
        class="right-side"
        role="button"
        tabindex="0"
        on:click={() => (showSuggestions = true)}
        on:keydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            showSuggestions = true;
          }
        }}
      ></div>
    </div>
    <span class="chat1">Educator-Recommended Reads from Our 2025 Survey</span>
    <span class="chat2"></span>
  </div>
  <div class="header-right">
    <a
      href="https://www.evalhere.org/"
      target="_blank"
      rel="noopener noreferrer"
      class="logo-link"
    >
      <img src="/summerReading/hereLogo.png" alt="Logo" />
    </a>
  </div>
</div>

<div class="chart" bind:offsetWidth={width} bind:offsetHeight={height}>
  <QuadrantChart
    on:openModal={openModalFromChild}
    {chartData}
    {width}
    {height}
  />
  <BookModal open={showModal} onClose={closeModal} {modalData} />
  <SuggestionsModal
    show={showSuggestions}
    on:close={() => (showSuggestions = false)}
  />
</div>

<div class="footer">
  <span>
    Development by <a href="https://www.bmdata.co.uk">BM Data Visualisation</a>.
    The design for this visualisation is 100% indebted to Evelina Parrou and her
    article
    <a href="https://www.theplot.media/p/story-books"
      ><i>Back with story books</i></a
    >. Many thanks for the inspiration.
  </span>
</div>

<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import Papa from 'papaparse';
  import QuadrantChart from '../components/QuadrantChart.svelte';
  import BookModal from '../components/BookModal.svelte';
  import SuggestionsModal from '../components/SuggestionsModal.svelte';

  let chartData = [];
  let width = 0;
  let height = 0;

  let showModal = false;
  let modalData = {};

  let showSuggestions = false;

  function openModalFromChild(event) {
    modalData = event.detail;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
  onMount(async () => {
    const googleSheetUrl =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSWcO6BAmSQkVUniM33E6X32N9XpP0-uRXq3ocWTeVBHUPbI9K2hiSF7W5qR_1JqNhqaDtzH8JG5B4d/pub?gid=0&single=true&output=csv';
    const res = await fetch(googleSheetUrl);
    const csvText = await res.text();
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      trimHeaders: true,
    });
    chartData = await parsed.data;
  });

  const suggestionsButtonClick = () => {
    suggestionsModal = true;
  };
</script>
