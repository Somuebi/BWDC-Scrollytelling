<script>
  import { onMount } from 'svelte';
  import LeakPoint from '../lib/components/LeakPoint.svelte';
  
  // Leak data
  const leaks = [
    {
      id: 'education',
      title: "Educational Pipeline Leak",
      position: 25,
      data: [
        { label: 'AP Math Enrollment', value: '42% lower' },
        { label: 'STEM Degree Completion', value: '28% lower' },
        { label: 'Mentorship Access', value: '67% report lack of mentors' }
      ],
      description: "Black girls face systemic barriers in STEM education including underfunded schools, biased tracking, and lack of representation in curriculum and faculty."
    },
    {
      id: 'workplace',
      title: "Workplace Leak",
      position: 50,
      data: [
        { label: 'Hiring Bias', value: '58% experience' },
        { label: 'Pay Gap', value: '$0.89 per $1' },
        { label: 'Promotion Rate', value: '40% slower' }
      ],
      description: "Once in STEM careers, Black women face microaggressions, isolation, unequal opportunities, and wage disparities that drive many to leave the field."
    },
    {
      id: 'advancement',
      title: "Career Advancement Leak",
      position: 75,
      data: [
        { label: 'Leadership Positions', value: 'Only 3%' },
        { label: 'Departure Rate', value: '2x higher' },
        { label: 'Burnout', value: '63% report' }
      ],
      description: "The 'concrete ceiling' prevents advancement to leadership roles. Lack of sponsorship and exclusion from networks limit career growth opportunities."
    }
  ];
  
  let scrollProgress = 0;
  let activeLeak = null;
  let leakStates = {};
  let sectionElement;
  
  // Initialize leak states
  leaks.forEach(leak => {
    leakStates[leak.id] = {
      visible: false,
      contentVisible: false
    };
  });
  
  onMount(() => {
    if (!sectionElement) return;
    
    const section = sectionElement;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    
    function updateScrollProgress() {
      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionScroll = scrollY - sectionTop;
      
      // Calculate scroll progress (0 to 1)
      scrollProgress = Math.min(Math.max(sectionScroll / (sectionHeight - windowHeight), 0), 1);
      
      // Update leak visibility based on scroll position
      leaks.forEach((leak, index) => {
        const leakPosition = (index + 1) / (leaks.length + 1);
        
        if (scrollProgress >= leakPosition - 0.15 && scrollProgress <= leakPosition + 0.15) {
          leakStates[leak.id].visible = true;
          activeLeak = leak.id;
          
          // Delay content appearance slightly after the leak
          setTimeout(() => {
            leakStates[leak.id].contentVisible = true;
          }, 300);
        } else {
          leakStates[leak.id].contentVisible = false;
        }
      });
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  });
</script>

<section class="pipeline-section" bind:this={sectionElement}>
  <div class="section-title">
    <h2>The STEM Pipeline: Where Talent Leaks Out</h2>
    <p>As we follow the journey of Black Women in STEM, we find critical points where support systems fail</p>
  </div>
  
  <div class="pipeline-visualization">
    <!-- Timeline -->
    <div class="timeline">
      <div class="line"></div>
      
      <!-- Timeline progress indicator -->
      <div class="progress-indicator" style={`height: ${scrollProgress * 100}%`}></div>
      
      <!-- Timeline milestones -->
      {#each leaks as leak, i}
        <div 
          class="milestone"
          class:active={leakStates[leak.id].visible}
          style={`top: ${leak.position}%`}
        >
          <div class="milestone-point"></div>
        </div>
      {/each}
    </div>
    
    <!-- Leak points -->
    {#each leaks as leak, i}
      <LeakPoint 
        {leak}
        index={i}
        visible={leakStates[leak.id].visible}
        contentVisible={leakStates[leak.id].contentVisible}
        position={leak.position}
      />
    {/each}
  </div>
  
  <!-- Leak content container -->
  <div class="leak-content-container">
    {#each leaks as leak, i}
      <div 
        class="leak-content"
        class:active={leakStates[leak.id].contentVisible}
      >
        <div class="leak-header">
          <div class="leak-number">0{i + 1}</div>
          <h3>{leak.title}</h3>
        </div>
        
        <div class="leak-data">
          {#each leak.data as item}
            <div class="data-item">
              <span class="label">{item.label}</span>
              <span class="value">{item.value}</span>
            </div>
          {/each}
        </div>
        
        <p class="description">{leak.description}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  .pipeline-section {
    min-height: 300vh; /* 3 screens tall */
    padding: 4rem 2rem;
    background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
    position: relative;
    overflow: hidden;
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
    margin-bottom: 1rem;
    color: #1a2a6c;
  }
  
  .section-title p {
    font-size: 1.2rem;
    color: #546e7a;
    line-height: 1.6;
  }
  
  .pipeline-visualization {
    position: sticky;
    top: 20vh;
    height: 60vh;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  
  .timeline {
    position: relative;
    width: 10px;
    height: 100%;
    background: #d1d5db;
    border-radius: 5px;
  }
  
  .line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #d1d5db;
    border-radius: 5px;
    z-index: 1;
  }
  
  .progress-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #1a2a6c;
    border-radius: 5px;
    z-index: 2;
    transition: height 0.1s linear;
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
    opacity: 0.5;
    transition: all 0.5s ease;
  }
  
  .milestone.active {
    opacity: 1;
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
    background: #E91E63;
    border-color: #1a2a6c;
  }
  
  .leak-content-container {
    position: relative;
    max-width: 800px;
    margin: 10vh auto 0;
    z-index: 5;
  }
  
  .leak-content {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 20vh;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    opacity: 0.3;
    transform: translateY(20px);
    transition: all 0.5s ease;
    border-left: 5px solid #1a2a6c;
  }
  
  .leak-content.active {
    opacity: 1;
    transform: translateY(0);
    border-left-color: #E91E63;
  }
  
  .leak-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .leak-number {
    width: 40px;
    height: 40px;
    background: #1a2a6c;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1.5rem;
  }
  
  .leak-content.active .leak-number {
    background: #E91E63;
  }
  
  h3 {
    margin: 0;
    font-size: 1.6rem;
    color: #1a2a6c;
  }
  
  .leak-content.active h3 {
    color: #E91E63;
  }
  
  .leak-data {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .data-item {
    background: rgba(26, 42, 108, 0.05);
    padding: 1rem;
    border-radius: 8px;
  }
  
  .label {
    font-weight: 600;
    color: #1a2a6c;
    display: block;
    margin-bottom: 0.3rem;
  }
  
  .value {
    color: #E91E63;
    font-weight: bold;
    font-size: 1.2rem;
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
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .pipeline-section {
      min-height: 400vh;
    }
    
    .pipeline-visualization {
      height: 50vh;
    }
    
    .section-title h2 {
      font-size: 2rem;
    }
    
    .leak-data {
      grid-template-columns: 1fr;
    }
  }
</style>