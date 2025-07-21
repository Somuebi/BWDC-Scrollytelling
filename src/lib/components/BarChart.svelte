<script>
  import { onMount } from 'svelte';

  export let title;
  export let subtitle;
  export let categories;
  export let series;
  export let visible = false;

  let chartContainer;

  onMount(() => {
    // Dynamically imports Highcharts
    import('highcharts').then(Highcharts => {
      // Initializes chart 
      Highcharts.chart(chartContainer, {
        chart: {
          type: 'bar',
          backgroundColor: 'transparent',
          animation: visible ? { duration: 1000 } : false,
        },
        title: {
          text: title,
          style: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
          },
        },
        subtitle: {
          text: subtitle,
          style: {
            color: '#666',
          },
        },
        xAxis: {
          categories: categories,
          title: { text: null },
          labels: {
            style: {
              fontSize: '1.1rem',
              fontWeight: 'bold'
            },
          },
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: 'Percentage',
            style: {
              fontSize: '1.1rem',
            },
          },
          labels: {
            format: '{value}%',
            style: {
              fontSize: '1rem',
            },
          },
        },
        plotOptions: {
          bar: {
            
            pointPadding: 0.1, 
            groupPadding: 0.2,
            dataLabels: {
              enabled: true,
              style: {
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textOutline: 'none',
              },
            },
          },
          series: {
            animation: visible ? { duration: 1000 } : false,
            states: {
              hover: {
                brightness: 0.1,
              },
            },
          },
        },
        legend: {
          enabled: true, 
          reversed: false, 
          itemStyle: {
            fontWeight: 'bold',
            fontSize: '1rem',
          },
        },
        tooltip: {
          headerFormat: '<b>{point.key}</b><br>',
          pointFormat: '{series.name}: <b>{point.y}%</b>',
        },
        credits: {
          enabled: false,
        },
        series: series,
      });
    });
  });
</script>

<div bind:this={chartContainer} class="chart-container"></div>

<style>
  .chart-container {
    width: 100%;
    height: 500px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .chart-container {
      height: 400px;
    }
  }
</style>