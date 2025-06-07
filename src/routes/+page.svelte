 <script>
   import '../app.css';
   import MultiSelect from 'svelte-multiselect';
    const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']
     let selected = $state([])
 </script>

 <div class="header">
    <div class="header-left">
      <div class="title">My Dashboard</div>
      <MultiSelect bind:selected options={fruits} placeholder="Choose fruits..." />
    </div>
    <div class="header-right">
      <img src="https://via.placeholder.com/100x100" alt="Header Image">
    </div>
  </div>

  <div class="chart">
    Chart area
  </div>

  <div class="footer">
    Footer
  </div>
