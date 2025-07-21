<script>
  import { onMount } from 'svelte';
  import { scrollObserver } from '../lib/utils/scrollObserver';
  import { flip } from 'svelte/animate';
  import { fade, fly } from 'svelte/transition';
  
  // Solution categories with specific actions
  const solutions = [
    {
      category: "Education Pipeline",
      icon: "📚",
      color: "#4CAF50",
      actions: [
        "Fund STEM programs in predominantly Black schools",
        "Implement bias training for educators",
        "Create mentorship programs with Black STEM professionals",
        "Develop inclusive STEM curriculum"
      ]
    },
    {
      category: "Workplace Environment",
      icon: "💼",
      color: "#2196F3",
      actions: [
        "Establish diversity hiring goals",
        "Create ERGs (Employee Resource Groups)",
        "Implement sponsorship programs",
        "Conduct pay equity audits annually"
      ]
    },
    {
      category: "Career Advancement",
      icon: "🚀",
      color: "#9C27B0",
      actions: [
        "Create clear promotion pathways",
        "Offer leadership training programs",
        "Establish mentorship programs",
        "Provide visible role models in leadership"
      ]
    },
    {
      category: "Community Support",
      icon: "🤝",
      color: "#FF9800",
      actions: [
        "Fund organizations like Black Girls Code",
        "Create networking opportunities",
        "Establish scholarship programs",
        "Develop industry partnerships"
      ]
    }
  ];
  
  // Repair actions for the pipe
  const repairs = [
    {
      title: "Mentorship Programs",
      description: "Connecting Black women with established STEM professionals for guidance and support."
    },
    {
      title: "Inclusive Hiring Practices",
      description: "Implementing blind recruitment and diversity-focused hiring initiatives."
    },
    {
      title: "Educational Partnerships",
      description: "Creating pipelines from HBCUs and other institutions to tech companies through internship programs."
    },
    {
      title: "Leadership Development",
      description: "Specialized training programs to prepare Black women for executive roles."
    }
  ];
  
  let visible = false;
  let sectionElement;
  
  onMount(() => {
    scrollObserver(sectionElement, () => {
      visible = true;
    }, { threshold: 0.1 });
  });
</script>

<section class="solutions-section" bind:this={sectionElement}>
  <div class="header">
    <h2>Repairing the Pipeline</h2>
    <p>Black Women are in a special situation of representing both the large minorities in STEM - Black and Women. We need concrete solutions to patch the leaks and support Black Women in STEM</p>
  </div>
  
  
  <div class="solutions-grid">
    {#each solutions as solution, i}
      <div 
        class="solution-card"
        class:visible={visible}
        in:fly={{ y: 50, duration: 500, delay: i * 200 }}
        style="--color: {solution.color}"
      >
        <div class="card-header" style="background-color: {solution.color}">
          <div class="solution-icon">{solution.icon}</div>
          <h3>{solution.category}</h3>
        </div>
        <div class="card-body">
          <ul>
            {#each solution.actions as action}
              <li>{action}</li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="call-to-action" in:fade={{ delay: 1600, duration: 1000 }}>
    <h3>Join the Movement</h3>
    <p>Support organizations working to increase representation of Black Women in STEM</p>
    <div class="action-buttons">
      <button>Find Volunteer Opportunities</button>
      <button>Donate to STEM Initiatives</button>
      <button>Advocate for Policy Change</button>
    </div>
  </div>
</section>

<style>
  .solutions-section {
    min-height: 100vh;
    padding: 4rem 2rem;
    background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
    position: relative;
    overflow: hidden;
  }
  
  .header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 4rem;
  }
  
  .header h2 {
    font-size: 2.5rem;
    color: #1a2a6c;
    margin-bottom: 1rem;
  }
  
  .header p {
    font-size: 1.3rem;
    color: #546e7a;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .solutions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto 3rem;
  }
  
  .solution-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .solution-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .card-header {
    padding: 1.5rem;
    color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .solution-icon {
    font-size: 2rem;
  }
  
  .card-header h3 {
    margin: 0;
    font-size: 1.4rem;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .card-body ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  .card-body li {
    padding: 0.7rem 0;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 1.5rem;
  }
  
  .card-body li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--color);
    font-weight: bold;
  }
  
  .call-to-action {
    max-width: 800px;
    margin: 3rem auto 0;
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  }
  
  .call-to-action h3 {
    font-size: 2rem;
    color: #1a2a6c;
    margin-bottom: 1rem;
  }
  
  .call-to-action p {
    font-size: 1.2rem;
    color: #546e7a;
    max-width: 600px;
    margin: 0 auto 2rem;
  }
  
  .action-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  button {
    padding: 1rem 1.5rem;
    background: #1a2a6c;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  button:hover {
    background: #0d324d;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .action-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    button {
      width: 100%;
      max-width: 300px;
    }
  }
</style>