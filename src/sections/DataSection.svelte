<script>
  import { onMount } from 'svelte';
  import { scrollObserver } from '../lib/utils/scrollObserver.js';
  import BarChart from '../lib/components/BarChart.svelte';
  
  // Sample data (replace with your actual JSON data)
  const groups = [
    { name: 'Asian Women', values: { 2019: 47.1, 2021: 48.2 } },
    { name: 'Black Women', values: { 2019: 25, 2021: 20.7 } },
    { name: 'Hispanic Women', values: { 2019: 24.9, 2021: 26.4 } },
    { name: 'White Women', values: { 2019: 26.1, 2021: 28.8 } }
  ];
  
  // Colors for each group
  const colors = [
    '#E91E63', // Asian Women (pink)
    '#FF9800', // Black Women (orange)
    '#4CAF50', // Hispanic Women (green)
    '#2196F3', // White Women (blue)
  ];
  
  let visible = false;
  let sectionElement;
  
  // Prepare data for Highcharts
  const categories = groups.map(group => group.name);
  
  const series = [
    {
      name: '2019',
      data: groups.map(group => ({
        y: group.values[2019],
        color: colors[groups.indexOf(group)] + 'AA' // Add transparency
      })),
      dataLabels: {
        enabled: true,
        format: '{y}%',
        style: {
          color: '#333',
          fontWeight: 'bold'
        }
      }
    },
    {
      name: '2021',
      data: groups.map(group => ({
        y: group.values[2021],
        color: colors[groups.indexOf(group)],
        borderColor: '#333',
        borderWidth: 2
      })),
      dataLabels: {
        enabled: true,
        format: '{y}%',
        style: {
          color: '#333',
          fontWeight: 'bold',
          textOutline: 'none'
        }
      }
    }
  ];
  
  onMount(() => {
    scrollObserver(sectionElement, () => {
      visible = true;
    });
  });
</script>

<section class="data-section" bind:this={sectionElement}>
  <h2>Changes in STEM Representation (2019-2021)</h2>
  
  <div class="chart-wrapper">
    <BarChart
      title="STEM Representation by Race/Ethnicity"
      subtitle="Percentage of representation in STEM fields"
      {categories}
      {series}
      {visible}
    />
  </div>
  
  <div class="year-comparison">
    <div class="year-key">
      <div class="key-item">
        <div class="key-box key-2019"></div>
        <span>2019 Data</span>
      </div>
      <div class="key-item">
        <div class="key-box key-2021"></div>
        <span>2021 Data</span>
      </div>
    </div>
    
    <div class="insights">
      <div class="insight-card">
        <div class="icon decrease">▼</div>
        <div class="content">
          <h3>Black Women Show Significant Decline</h3>
          <p>While most groups saw increases, Black Women experienced a 4.3% decrease in STEM representation - the only group to show a decline.</p>
        </div>
      </div>
      
      <div class="insight-card">
        <div class="icon increase">▲</div>
        <div class="content">
          <h3>Female Representation Grows</h3>
          <p>White women experienced the largest increase of 2.7%.With, Asian Women showed an increase of 1.1%, Hispanic Women showed an increase of 1.5%</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .data-section {
    min-height: 100vh;
    padding: 4rem 2rem;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
    color: #1a2a6c;
    max-width: 800px;
  }
  
  .chart-wrapper {
    width: 100%;
    max-width: 900px;
    margin-bottom: 3rem;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .year-comparison {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    max-width: 900px;
    width: 100%;
  }
  
  .year-key {
    display: flex;
    gap: 2rem;
    justify-content: center;
  }
  
  .key-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  .key-box {
    width: 25px;
    height: 25px;
    border-radius: 4px;
  }
  
  .key-2019 {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid #333;
  }
  
  .key-2021 {
    background: #333;
    border: 1px solid #333;
  }
  
  .insights {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    width: 100%;
  }
  
  .insight-card {
    flex: 1;
    min-width: 300px;
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    gap: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    border-left: 4px solid;
  }
  
  .insight-card:nth-child(1) {
    border-left-color: #E91E63;
  }
  
  .insight-card:nth-child(2) {
    border-left-color: #4CAF50;
  }
  
  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .decrease {
    background: rgba(233, 30, 99, 0.1);
    color: #E91E63;
  }
  
  .increase {
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
  }
  
  .content h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #263238;
  }
  
  .content p {
    margin: 0;
    color: #546e7a;
    line-height: 1.6;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    h2 {
      font-size: 2rem;
    }
    
    .chart-wrapper {
      padding: 10px;
    }
    
    .year-key {
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    
    .insights {
      flex-direction: column;
    }
  }
</style>