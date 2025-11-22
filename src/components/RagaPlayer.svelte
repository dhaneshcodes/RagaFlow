<script>
  import { onMount, onDestroy } from 'svelte';
  import { audioEngine } from '../engine/AudioEngine';
  import { gamificationEngine, userLevel } from '../engine/GamificationEngine';
  import Visualizer from './Visualizer.svelte';
  import MandalaVisualizer from './MandalaVisualizer.svelte';
  import RagaCard from './RagaCard.svelte';
  import DroneGenerator from './DroneGenerator.svelte';
  import Journal from './Journal.svelte';
  import BreathingGuide from './BreathingGuide.svelte';

  export let raga;
  export let onBack;

  let isPlaying = false;
  let volume = 0; // db
  let showMandala = true;
  let showBreathing = false;
  let binauralActive = false;
  
  let isLocked = false;
  let xpInterval;
  let xpGainedSession = 0;

  $: isLocked = raga.unlockLevel > $userLevel;

  async function togglePlay() {
    if (isLocked) return;
    
    if (isPlaying) {
      audioEngine.stop();
      isPlaying = false;
      clearInterval(xpInterval);
    } else {
      await audioEngine.playRaga(raga);
      isPlaying = true;
      startXpTimer();
    }
  }

  function startXpTimer() {
    xpInterval = setInterval(() => {
      gamificationEngine.awardXP(10); // 10 XP every minute (approx 1.6 XP every 10s)
      xpGainedSession += 2; // Visual feedback
    }, 10000); // Check every 10s
  }

  function handleVolume(e) {
    volume = e.target.value;
    audioEngine.setVolume(volume);
  }

  function toggleBinaural() {
    binauralActive = !binauralActive;
    if (binauralActive) {
      audioEngine.startBinaural(200, 5); // 5Hz Theta
    } else {
      audioEngine.stopBinaural();
    }
  }

  // Auto-play on mount
  onMount(async () => {
    if (!isLocked) {
      // await togglePlay(); 
    }
  });

  onDestroy(() => {
    if (isPlaying) audioEngine.stop();
    clearInterval(xpInterval);
  });
</script>

<div class="flex flex-col items-center w-full max-w-2xl mx-auto space-y-8 animate-fade-in pb-12">
  <button 
    on:click={onBack}
    class="self-start text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
  >
    ← Back to Moods
  </button>

  <div class="relative w-full">
    <RagaCard {raga} />
    
    {#if isLocked}
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-20 border border-white/10">
        <div class="text-4xl mb-2">🔒</div>
        <h3 class="text-xl font-serif text-white mb-1">Raga Locked</h3>
        <p class="text-gray-400 text-sm">Reach Level {raga.unlockLevel} to unlock</p>
      </div>
    {/if}
  </div>
  
  <!-- Scale Info -->
  <div class="w-full flex justify-between text-xs text-gray-500 px-4">
    <div>Arohana: <span class="text-raga-primary">{raga.arohana || 'N/A'}</span></div>
    <div>Avarohana: <span class="text-raga-primary">{raga.avarohana || 'N/A'}</span></div>
  </div>

  <div class="w-full bg-black/20 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
    
    {#if xpGainedSession > 0}
      <div class="absolute top-4 left-4 text-xs font-bold text-yellow-400 animate-pulse">
        +{xpGainedSession} XP
      </div>
    {/if}

    <!-- Visualizer Toggle -->
    <div class="absolute top-4 right-4 z-10 flex gap-2">
      <button 
        class="p-2 rounded-full bg-white/5 hover:bg-white/10 text-xs"
        on:click={() => showMandala = !showMandala}
      >
        {showMandala ? 'Bar View' : 'Mandala'}
      </button>
      <button 
        class="p-2 rounded-full bg-white/5 hover:bg-white/10 text-xs"
        on:click={() => showBreathing = !showBreathing}
      >
        {showBreathing ? 'Close Breath' : 'Breathe'}
      </button>
    </div>

    <div class="flex justify-center items-center min-h-[240px] py-4">
      {#if showBreathing}
        <BreathingGuide />
      {:else if showMandala}
        <MandalaVisualizer />
      {:else}
        <Visualizer />
      {/if}
    </div>
    
    <div class="flex flex-col items-center mt-2 gap-8">
      <button 
        on:click={() => {
          if (navigator.vibrate) navigator.vibrate(20);
          togglePlay();
        }}
        disabled={isLocked}
        class="w-20 h-20 rounded-full bg-gradient-to-br from-raga-primary to-orange-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,153,51,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {#if isPlaying}
          <span class="text-3xl">⏸</span>
        {:else}
          <span class="text-3xl ml-1">▶</span>
        {/if}
      </button>

      <div class="w-full max-w-xs flex items-center gap-4 px-4">
        <span class="text-xs text-gray-500 font-bold">VOL</span>
        <input 
          type="range" 
          min="-40" 
          max="0" 
          bind:value={volume} 
          on:input={handleVolume}
          class="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-raga-primary"
        />
      </div>
      
      <div class="flex gap-3 w-full px-2">
        <div class="flex-1">
          <DroneGenerator />
        </div>
        <div class="flex-1 bg-white/5 p-3 rounded-xl border border-white/10 mt-4 flex flex-col justify-center gap-2">
          <div class="flex justify-between items-center">
            <span class="text-xs font-semibold text-gray-300">Binaural</span>
            <span class="text-[10px] text-raga-primary">Theta</span>
          </div>
          <button 
            on:click={() => {
              if (navigator.vibrate) navigator.vibrate(10);
              toggleBinaural();
            }}
            class="w-full h-8 rounded-lg transition-all relative {binauralActive ? 'bg-raga-primary/20 border border-raga-primary' : 'bg-black/20 border border-white/10'}"
          >
            <div class="text-xs {binauralActive ? 'text-raga-primary' : 'text-gray-500'}">
              {binauralActive ? 'Active' : 'Off'}
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <Journal />
</div>
