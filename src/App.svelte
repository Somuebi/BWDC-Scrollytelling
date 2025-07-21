<script>
  import TitleSection from './sections/TitleSection.svelte';
  import DataSection from './sections/DataSection.svelte';
  import PipelineSection from './sections/PipelineSection.svelte';
  import SolutionsSection from './sections/SolutionSection.svelte';
</script>

<main>
  <TitleSection />
  <DataSection />
  <PipelineSection />
  <SolutionsSection />
</main>

<style>
main{
  scroll-behavior: smooth;
}

/* Add transitions */
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
  
@keyframes flip {
  0% {
    transform: perspective(400px) rotateY(90deg);
    opacity: 0;
  }
  100% {
    transform: perspective(400px) rotateY(0deg);
    opacity: 1;
  }
}

</style>