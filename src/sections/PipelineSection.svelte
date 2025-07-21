<script>
  import { onMount } from 'svelte';
  import LeakPoint from '../lib/components/LeakPoint.svelte';

  const leaks = [
    {
      id: 'education',
      title: 'Educational Pipeline Leak',
      position: 25,
      data: [
        { label: 'AP Math Enrollment', value: '42% lower' },
        { label: 'STEM Degree Completion', value: '28% lower' },
        { label: 'Mentorship Access', value: '67% report lack of mentors' },
      ],
      description:
        'Black girls face systemic barriers in STEM education including underfunded schools, biased tracking, and lack of representation in curriculum and faculty. Only 50% of Black females gain exposure to fields in Computers and Technology while they are students.',
    },
    {
      id: 'workplace',
      title: 'Workplace Leak',
      position: 50,
      data: [
        { label: 'Hiring Bias', value: '58% experience' },
        { label: 'Pay Gap', value: '$0.89 per $1' },
        { label: 'Promotion Rate', value: '40% slower' },
      ],
      description:
        'Once in STEM careers, Black women face microaggressions, isolation, unequal opportunities, and wage disparities that drive many to leave the field.',
    },
    {
      id: 'advancement',
      title: 'Career Advancement Leak',
      position: 75,
      data: [
        { label: 'Leadership Positions', value: 'Only 3%' },
        { label: 'Departure Rate', value: '2x higher' },
        { label: 'Burnout', value: '63% report' },
      ],
      description:
        "The 'concrete ceiling' prevents advancement to leadership roles. Lack of sponsorship and exclusion from networks limit career growth opportunities. Even though women make up a third of the workforce at tech companies, a 2021 research by Bloomberg found that professional and managerial ranks at these companies contain fewer women than other large companies.",
    },
  ];

  let activeLeakId = null;
  let sectionElement;

  onMount(() => {
    const contentElements = sectionElement.querySelectorAll('.leak-content');

    // Callback function for the observer
    const callback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.dataset.id;
        if (entry.isIntersecting) {
          activeLeakId = id;
        }
      });
    };

    // Observer options: trigger when the element is 40% from the top of the viewport
    const options = {
      root: null, // viewport
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, options);

    // Observe each content card
    contentElements.forEach((el) => observer.observe(el));

    return () => {
      // Cleanup: stop observing when the component is destroyed
      contentElements.forEach((el) => observer.unobserve(el));
    };
  });
</script>

<section class="pipeline-section" bind:this={sectionElement}>
  <div class="section-title">
    <h2>The STEM Pipeline: Where Talent Leaks Out</h2>
    <p>
      Throughout the journey of Black Women in STEM, there are various momments in which the decrease occurs. These momments are the leaks in the pipeline.
    </p>
  </div>

  <div class="pipeline-visualization-container">
    <div class="pipeline-visualization">
      <div class="timeline">
        {#each leaks as leak}
          <div
            class="milestone"
            class:active={activeLeakId === leak.id}
            style={`top: ${leak.position}%`}
          >
            <div class="milestone-point"></div>
          </div>
        {/each}
      </div>

      {#each leaks as leak, i}
        <LeakPoint {leak} index={i} active={activeLeakId === leak.id} position={leak.position} />
      {/each}
    </div>
  </div>

  <div class="leak-content-container">
    {#each leaks as leak, i}
      <div
        class="leak-content"
        class:active={activeLeakId === leak.id}
        class:left={i % 2 === 0}  class:right={i % 2 !== 0} data-id={leak.id}
      >
        <div class="leak-header">
          <div class="leak-number">0{i + 1}</div>
          <h3>{leak.title}</h3>
        </div>

        <div class="leak-data">
          </div>

        <p class="description">{leak.description}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  .pipeline-section {
    position: relative;
    padding: 4rem 2rem;
    background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  }

  /* Holds the sticky visualization */
  .pipeline-visualization-container {
    position: sticky;
    top: 20vh;
    height: 60vh;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

.pipeline-visualization {
  position: relative;
  height: 100%;
}

 
.leak-content-container {
  position: relative;
  max-width: 1200px; 
  margin: 0 auto;
  z-index: 5;
}

  /* Trigger AND the card */
.leak-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45%; /* Make cards take up less than half the screen */
  padding: 2rem;
  opacity: 0.3;
  transition: opacity 0.5s ease;
}

.leak-content.active {
  opacity: 1;
}


.leak-content.left {
  margin-right: auto; /* Pushes card to the left */
}

.leak-content.right {
  margin-left: auto; /* Pushes card to the right */
}


.leak-content .leak-header {
  border-left: 5px solid #1a2a6c;
  padding-left: 1.5rem;
  transition: border-color 0.4s ease;
}
.leak-content.active .leak-header {
  border-left-color: #e91e63;
}

.section-title {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  position: relative;
  z-index: 10;
}

.section-title h2 {
  font-size: 2.5rem;
  color:#1a2a6c;
}

.section-title p {
  font-size: 1.3rem;
  color: #546e7a;
}

 .timeline {
  position: absolute;
  left: 50%; 
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background: #d1d5db;
  border-radius: 5px;
}

.milestone {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transition: all 0.5s ease;
  }

  .milestone-point {
    width: 20px;
    height: 20px;
    background: white;
    border: 3px solid #1a2a6c;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .milestone.active .milestone-point {
    transform: scale(1.5);
    background: #e91e63;
    border-color: #1a2a6c;
  }

  .leak-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .leak-number {
    background: #1a2a6c;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1.5rem;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
  .leak-content.active .leak-number {
    background: #e91e63;
  }
  h3 {
    margin: 0;
    font-size: 1.6rem;
    color: #1a2a6c;
  }
  .leak-content.active h3 {
    color: #e91e63;
  }

  .leak-data {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
 
  .description {
    margin: 0;
    line-height: 1.6;
    font-size: 1.1rem;
    color: #546e7a;
    padding: 1rem;
    background: rgba(26, 42, 108, 0.03);
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    .pipeline-visualization-container {
      display: none; /* Hide complex viz on mobile for simplicity */
    }
    .leak-content-container {
      padding-left: 0;
      max-width: 100%;
    }
    .leak-content {
      min-height: 80vh;
    }
  }
</style>