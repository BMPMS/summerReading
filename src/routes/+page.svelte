<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import Papa from 'papaparse';
  import QuadrantChart from '../components/QuadrantChart.svelte';
  import BookModal from '../components/BookModal.svelte';
  import SuggestionsModal from '../components/SuggestionsModal.svelte';
  import MultiSelect from 'svelte-multiselect';
  import Select from 'svelte-select';

  const genres = ['Education', 'Political Science', 'Data Visualisation'];
  const themes = [
    {value: "short-long", label:  "short-long"},
    {value: "conceptual-technical", label:  "conceptual-technical"},
    {value: "descriptive-prescriptive", label:  "descriptive-prescriptive"},
    {value: "art-science", label:  "art-science"},
  ];

  let filterOptions = [];
  let firstTheme = themes[0];
  let secondTheme = themes[1];

  let chartData = [];
  let width = 0;
  let height = 0;

  let showModal = false;
  let modalData = {};

  let suggestionsModal = false;

  function openModalFromChild(event) {
    modalData = event.detail;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
  onMount(async () => {
    const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXHOBjlfsBFnppBhsi_Iy7ekvcooapMyIAmf-ko89-QA-Sekcwgv3OD93f9SlTWW1pWuELO5cKH8FG/pub?gid=0&single=true&output=csv';
 const res = await fetch(googleSheetUrl);
   const csvText = await res.text();
   const parsed = Papa.parse(csvText, {
     header: true,
     skipEmptyLines: true,
     trimHeaders: true,
   });
   chartData = parsed.data;
  });

  const suggestionsButtonClick = () => {
    suggestionsModal = true;
  }

</script>

<div class="header">
  <div class="header-left">
    <div class="title">Summer Reading selector</div>
    Filter, switch themes and browse 2025's top reads
    <div style="display: flex; max-height: 28px; font-size: 14px; padding-top: 10px">
     <div style="width: 400px">
      <MultiSelect  true bind:selected={filterOptions} options={genres} placeholder="Genre filter" />
      </div>
  <button class="suggestionsButton" on:click={suggestionsButtonClick}>Suggestions?</button>
    </div>
    <div style="max-width: 600px; height: 28px; display: flex; padding-top: 10px">
      <Select
         --font-size="14px"
               --line-height="20px"
               --height="20px"
        items={themes}
        bind:value={firstTheme}
        required
        clearable={false}
      />
      &nbsp;v&nbsp;
      <Select
       --font-size="14px"
         --line-height="20px"
         --height="20px"
        items={themes}
        bind:value={secondTheme}
        required
        clearable={false}
      />
    </div>
  </div>
  <div class="header-right">
    <img src="/summerReading/hereLogo.png" alt="Logo" />
  </div>
</div>

<div class="chart" bind:offsetWidth={width} bind:offsetHeight={height}>
   <QuadrantChart on:openModal={openModalFromChild} chartData={chartData} filterOptions={filterOptions} width={width} height={height} theme1={firstTheme} theme2={secondTheme} />
   <BookModal open={showModal} onClose={closeModal} {modalData}/>
   <SuggestionsModal bind:show={suggestionsModal}/>
</div>

<div class="footer">
  development by &nbsp;<a href="https://www.bmdata.co.uk">BM Data Visualisation</a>
</div>
