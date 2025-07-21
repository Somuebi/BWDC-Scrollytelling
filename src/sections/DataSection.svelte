<script>
  import { onMount } from 'svelte';
  import { scrollObserver } from '../lib/utils/scrollObserver.js';
  import BarChart from '../lib/components/BarChart.svelte';

  const groups = [
    { name: 'Asian Women', values: { 2019: 47.1, 2021: 48.2 } },
    { name: 'Black Women', values: { 2019: 25, 2021: 20.7 } },
    { name: 'Hispanic Women', values: { 2019: 24.9, 2021: 26.4 } },
    { name: 'White Women', values: { 2019: 26.1, 2021: 28.8 } },
  ];

  // Colors for each group, used as the source of truth
  const groupColors = {
    'Asian Women': '#E91E63',   // Pink
    'Black Women': '#FF9800',   // Orange
    'Hispanic Women': '#4CAF50',// Green
    'White Women': '#2196F3',   // Blue
  };

  let visible = false;
  let sectionElement;

  // Looks at data for chart
  const categories = groups.map(group => group.name);

  const series = [
    {
      name: '2021',
      data: groups.map(group => ({
        y: group.values[2021],
        color: groupColors[group.name], // Uses the solid, primary color
      })),
    },
    {
      name: '2019',
      data: groups.map(group => ({
        y: group.values[2019],
        color: groupColors[group.name] + 'AA', // Add alpha for a pastel/lighter colours
      })),
    },
  ];

  onMount(() => {
    scrollObserver(sectionElement, () => {
      visible = true;
    });
  });
</script>

<section class="data-section" bind:this={sectionElement}>
  <h2>Representation Changes for Women in STEM (2019 vs 2021)</h2>

  <div class="chart-wrapper">
    <BarChart
      title="STEM Workforce Representation by Race/Ethnicity"
      subtitle="Percentage of employed scientists and engineers who are women"
      {categories}
      {series}
      {visible}
    />
  </div>

  <div class="insights-wrapper">
    <div class="insight-card" style="border-left-color: {groupColors['Black Women']};">
      <div class="icon decrease">▼</div>
      <div class="content">
        <h3>Black Women Show Decline</h3>
        <p>
          While most groups saw increases, Black women experienced a <strong>4.3 percentage point
            decrease</strong> in representation—the only group to show a decline.
        </p>
      </div>
    </div>

    <div class="insight-card" style="border-left-color: {groupColors['White Women']};">
      <div class="icon increase">▲</div>
      <div class="content">
        <h3>Other Groups See Growth</h3>
        <p>
          White women experienced the largest increase of <strong>2.7 percentage points</strong>. Meanwhile,
          representation for Asian women and Hispanic women grew by <strong>1.1</strong> and
          <strong>1.5 percentage points</strong> respectively.
        </p>
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
    justify-content: center;
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
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }


  .insights-wrapper {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    width: 100%;
    max-width: 900px;
    justify-content: center;
  }

  .insight-card {
    flex: 1;
    min-width: 320px;
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    gap: 1.5rem;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    border-left: 5px solid; /* Default state */
  }

  .icon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    flex-shrink: 0;
  }

  .decrease {
    background: #FF980020; /* Uses insight color with alpha */
    color: #FF9800;
  }

  .increase {
    background: #2196F320; /* Uses insight color with alpha */
    color: #2196F3;
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

  @media (max-width: 768px) {
    h2 {
      font-size: 2rem;
    }

    .chart-wrapper {
      padding: 1rem;
    }

    .insights-wrapper {
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>