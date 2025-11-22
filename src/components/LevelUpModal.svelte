<script>
  import { showLevelUp, userLevel, gamificationEngine, showDakshina } from '../engine/GamificationEngine';
  import { fade, scale } from 'svelte/transition';

  let level;
  let levelName;

  $: {
    level = $userLevel;
    levelName = gamificationEngine.getLevelName(level);
  }

  function close() {
    showLevelUp.set(false);
  }
</script>

{#if $showLevelUp}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" transition:fade>
    <div 
      class="bg-gradient-to-b from-raga-dark to-black border border-raga-primary/50 p-8 rounded-2xl text-center shadow-[0_0_50px_rgba(255,153,51,0.4)] max-w-sm w-full mx-4 relative overflow-hidden"
      transition:scale
    >
      <!-- Confetti/Glow Effect Background -->
      <div class="absolute top-0 left-0 w-full h-full bg-raga-primary/10 animate-pulse"></div>
      
      <div class="relative z-10">
        <div class="text-6xl mb-4">🌟</div>
        <h2 class="text-3xl font-serif text-white mb-2">Level Up!</h2>
        <p class="text-gray-400 mb-6">You have reached</p>
        
        <div class="text-4xl font-bold text-raga-primary mb-2">Level {level}</div>
        <div class="text-xl text-white/80 tracking-widest uppercase mb-8">{levelName}</div>
        
        <p class="text-sm text-gray-500 mb-6">New Ragas and features may have been unlocked.</p>

        <button 
          on:click={close}
          class="w-full py-3 bg-raga-primary hover:bg-orange-600 text-white font-bold rounded-lg transition-colors shadow-lg mb-3"
        >
          Continue Journey
        </button>

        <button 
          on:click={() => { close(); showDakshina.set(true); }}
          class="text-xs text-raga-primary/80 hover:text-raga-primary underline decoration-dotted underline-offset-4"
        >
          Offer Gratitude (Dakshina)
        </button>
      </div>
    </div>
  </div>
{/if}
