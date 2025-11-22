<script>
  import { onMount, onDestroy } from 'svelte';

  let phase = 'Inhale'; // Inhale, Hold, Exhale
  let progress = 0;
  let interval;
  
  // 4-7-8 Breathing Technique
  const timings = {
    Inhale: 4000,
    Hold: 7000,
    Exhale: 8000
  };

  onMount(() => {
    runCycle();
  });

  onDestroy(() => {
    clearTimeout(interval);
  });

  function runCycle() {
    phase = 'Inhale';
    interval = setTimeout(() => {
      phase = 'Hold';
      interval = setTimeout(() => {
        phase = 'Exhale';
        interval = setTimeout(() => {
          runCycle();
        }, timings.Exhale);
      }, timings.Hold);
    }, timings.Inhale);
  }
</script>

<div class="relative flex items-center justify-center w-48 h-48">
  <!-- Expanding Circle -->
  <div 
    class="absolute w-full h-full rounded-full border-2 border-raga-primary/30 transition-all duration-[4000ms] ease-in-out"
    class:scale-100={phase === 'Inhale'}
    class:scale-110={phase === 'Hold'}
    class:scale-50={phase === 'Exhale'}
    class:opacity-100={phase === 'Inhale' || phase === 'Hold'}
    class:opacity-50={phase === 'Exhale'}
    style="transition-duration: {timings[phase]}ms"
  ></div>
  
  <!-- Inner Glow -->
  <div 
    class="absolute w-32 h-32 bg-raga-primary/20 rounded-full blur-xl transition-all duration-[4000ms]"
    class:scale-125={phase === 'Inhale'}
    class:scale-100={phase === 'Exhale'}
    style="transition-duration: {timings[phase]}ms"
  ></div>

  <div class="text-center z-10">
    <div class="text-xs text-gray-400 uppercase tracking-widest mb-1">Pranayama</div>
    <div class="text-xl font-serif text-white transition-all duration-500">
      {phase}
    </div>
  </div>
</div>
