<script>
  import { fade, fly } from 'svelte/transition';
  
  export let leak;
  export let index;
  export let visible = false;
  export let contentVisible = false;
  export let position = 0;
</script>

{#if visible}
  <div 
    class="leak-point"
    style:left="calc(50% + 60px)"
    style:top={`${position}%`}
    style:transform="translateY(-50%)"
    in:fly={{ y: 20, x: -20, duration: 500 }}
  >
    <div class="water-drop" in:fade={{ duration: 300 }}>
      <div class="drop-shape"></div>
      <div class="ripple"></div>
    </div>
    
    {#if contentVisible}
      <div 
        class="leak-content"
        in:fade={{ delay: 300, duration: 500 }}
      >
        <div class="leak-header">
          <div class="leak-number">0{index + 1}</div>
          <h3>{leak.title}</h3>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .leak-point {
    position: absolute;
    z-index: 20;
    display: flex;
    align-items: center;
  }
  
  .water-drop {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  
  .drop-shape {
    width: 20px;
    height: 20px;
    background: #1a2a6c;
    border-radius: 50% 50% 40% 60%;
    transform: rotate(-45deg);
    box-shadow: 0 0 10px rgba(26, 42, 108, 0.3);
    z-index: 3;
    transition: all 0.5s ease;
  }
  
  .leak-content.active .drop-shape {
    background: #E91E63;
    transform: scale(1.5) rotate(-45deg);
    box-shadow: 0 0 15px rgba(233, 30, 99, 0.5);
  }
  
  .ripple {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgba(26, 42, 108, 0.2);
    animation: ripple 2s infinite;
    z-index: 1;
    opacity: 0;
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0.8);
      opacity: 0.8;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }
  
  .leak-content {
    margin-left: 1.5rem;
    background: white;
    border-radius: 12px;
    padding: 1.2rem;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    min-width: 250px;
    transform-origin: left center;
  }
  
  .leak-header {
    display: flex;
    align-items: center;
  }
  
  .leak-number {
    width: 30px;
    height: 30px;
    background: #1a2a6c;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 1rem;
  }
  
  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #1a2a6c;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .leak-point {
      left: calc(50% + 40px) !important;
    }
    
    .leak-content {
      min-width: 200px;
    }
    
    h3 {
      font-size: 1.1rem;
    }
  }
</style>