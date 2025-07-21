<script>
  import { fade, fly } from 'svelte/transition';

  export let leak;
  export let index;
  export let active = false;
  export let position = 0;
</script>

{#if active}
  <div
    class="leak-point"
    style:left="calc(50% + 20px)" style:top={`${position}%`}
    style:transform="translateY(-50%)"
    in:fly={{ y: -20, duration: 500 }}
    out:fade={{ duration: 300 }}
  >
    <div class="water-drop">
      <div class="drop-shape"></div>
      <div class="ripple"></div>
    </div>
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
  }

  .drop-shape {
    width: 20px;
    height: 20px;
    background: #e91e63;
    border-radius: 50% 50% 40% 60%;
    transform: rotate(-45deg);
    box-shadow: 0 0 15px rgba(233, 30, 99, 0.5);
  }

  .ripple {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgba(233, 30, 99, 0.4);
    animation: ripple 2s infinite;
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
</style>