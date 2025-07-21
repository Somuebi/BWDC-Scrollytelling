<script>
  import { onMount } from 'svelte';
  
  let scrollPromptVisible = true;
  
  onMount(() => {
    // Hide scroll prompt after 5 seconds
    const timeout = setTimeout(() => scrollPromptVisible = false, 5000);
    
    // Or hide when user starts scrolling
    const scrollHandler = () => {
      scrollPromptVisible = false;
      window.removeEventListener('scroll', scrollHandler);
    };
    
    window.addEventListener('scroll', scrollHandler);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', scrollHandler);
    };
  });
</script>

<section class="title-section">
  <div class="title-container">
    <h1 class="main-title">Leaks in The Pipe</h1>
    <div class="subtitle-container">
      <div class="pipe-icon"></div>
      <h2 class="subtitle">Black Women in STEM</h2>
      <div class="pipe-icon"></div>
    </div>
    <div class="intro-text">
      <p>A scrollytelling exploration of the decline in representation of Black Women in STEM.</p>
    </div>
  </div>
  
  <div class="scroll-prompt" class:fade-out={!scrollPromptVisible}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M19 12L12 19L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>Scroll to explore</span>
  </div>
  
  <div class="water-drop water-drop-1"></div>
  <div class="water-drop water-drop-2"></div>
  <div class="water-drop water-drop-3"></div>
</section>

<style>
  .title-section {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #1a2a6c, #2a4365, #0d324d);
    overflow: hidden;
    position: relative;
    color: #fff;
    text-align: center;
    padding: 1rem;
    box-sizing: border-box;
  }
  
  .title-container {
    position: relative;
    z-index: 10;
    max-width: 900px;
    padding: 2rem;
    background: rgba(10, 25, 47, 0.7);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(64, 156, 255, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  .main-title {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 800;
    margin-bottom: 1.5rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: linear-gradient(to right, #f8f9fa, #e9ecef, #dee2e6);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .subtitle-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .pipe-icon {
    width: 60px;
    height: 20px;
    background: linear-gradient(to right, #6c757d, #adb5bd);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(173, 181, 189, 0.5);
  }
  
  .subtitle {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 600;
    color: #e9ecef;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  
  .intro-text {
    font-size: clamp(1rem, 2vw, 1.2rem);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    color: #ced4da;
  }
  
  .intro-text p {
    margin: 0;
  }
  
  .scroll-prompt {
    position: absolute;
    bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #e9ecef;
    font-size: 0.9rem;
    letter-spacing: 1px;
    transition: opacity 0.5s ease;
    z-index: 10;
  }
  
  .scroll-prompt svg {
    animation: bounce 2s infinite;
  }
  
  .fade-out {
    opacity: 0;
    pointer-events: none;
  }
  
  .water-drop {
    position: absolute;
    background: radial-gradient(circle, rgba(64, 156, 255, 0.7) 0%, rgba(32, 82, 149, 0.3) 70%, transparent 100%);
    border-radius: 50%;
    filter: blur(2px);
    z-index: 1;
    animation: float 15s infinite linear;
  }
  
  .water-drop-1 {
    width: 150px;
    height: 150px;
    top: 10%;
    left: 15%;
    animation-duration: 20s;
  }
  
  .water-drop-2 {
    width: 250px;
    height: 250px;
    bottom: 20%;
    right: 10%;
    animation-duration: 25s;
    animation-delay: -5s;
  }
  
  .water-drop-3 {
    width: 100px;
    height: 100px;
    top: 30%;
    right: 25%;
    animation-duration: 18s;
    animation-delay: -8s;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .subtitle-container {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .pipe-icon {
      width: 80px;
      height: 15px;
    }
    
    .title-container {
      padding: 1.5rem;
    }
  }
</style>