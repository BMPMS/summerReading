<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import Papa from 'papaparse';
  import QuadrantChart from '../components/QuadrantChart.svelte';
  import BookModal from '../components/BookModal.svelte';

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
    <div class="title">2025 Summer Reading List</div>
    Some chat here??
     <br><br>
     <span>
    If you are an author of one of the books featured here and would like to request a revision to how your work is categorized or described, please don’t hesitate to reach out. We welcome your input and are happy to make adjustments.
</span>

  </div>
  <div class="header-right">
    <img src="/summerReading/hereLogo.png" alt="Logo" />
  </div>
</div>

<div class="chart" bind:offsetWidth={width} bind:offsetHeight={height}>
   <QuadrantChart on:openModal={openModalFromChild} chartData={chartData} filterOptions={filterOptions} width={width} height={height} theme1={firstTheme} theme2={secondTheme} />
   <BookModal open={showModal} onClose={closeModal} {modalData}/>
</div>

<div class="footer"><span>
 The design for this chart is 100% endebted to Evelina Parrou and her article <a href="https://www.theplot.media/p/story-books">“Back with story books”</a>.  Many thanks for the inspiration.

</span>
</div>
