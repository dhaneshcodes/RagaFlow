<script>
  import { createEventDispatcher } from 'svelte';
  import { moodEngine } from '../engine/MoodEngine';
  import { userLevel, streakDays, gamificationEngine, karmaPoints } from '../engine/GamificationEngine';

  const dispatch = createEventDispatcher();
  let inputText = '';

  const moods = ['calm', 'joy', 'sad', 'stress', 'focused'];

  function handleAnalyze() {
    const detected = moodEngine.analyze(inputText);
    dispatch('select', detected);
  }

  function selectMood(m) {
    if (navigator.vibrate) navigator.vibrate(10); // Haptic feedback
    dispatch('select', m);
  }
  
  let levelName;
  $: levelName = gamificationEngine.getLevelName($userLevel);
</script>

<div class="flex flex-col items-center space-y-8 p-8 bg-raga-dark/40 rounded-3xl backdrop-blur-xl border border-white/10 w-full max-w-md shadow-2xl animate-fade-in">
  
  <!-- Gamification Header -->
  <div class="w-full flex justify-between items-center px-1">
    <div class="flex flex-col">
      <span class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Level {$userLevel}</span>
      <span class="text-raga-primary font-serif font-bold text-lg drop-shadow-sm">{levelName}</span>
    </div>
    <div class="flex flex-col items-end">
      <div class="flex items-center gap-1 text-orange-400 animate-pulse-glow px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
        <span class="text-lg">🔥</span>
        <span class="font-bold">{$streakDays}</span>
      </div>
    </div>
  </div>

  <!-- Progress Bar -->
  <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
    <div 
      class="h-full bg-gradient-to-r from-raga-primary to-yellow-400 transition-all duration-1000 shadow-[0_0_10px_rgba(255,153,51,0.5)]"
      style="width: {($karmaPoints / gamificationEngine.getNextLevelXp($userLevel)) * 100}%"
    ></div>
  </div>

  <div class="text-center space-y-2">
    <h2 class="text-3xl font-serif text-white">How are you feeling?</h2>
    <p class="text-gray-400 text-sm">Select your state to begin the journey</p>
  </div>
  
  <div class="w-full">
    <input 
      type="text" 
      bind:value={inputText}
      placeholder="Or describe it..." 
      class="w-full p-4 rounded-xl bg-black/20 border border-white/10 focus:border-raga-primary/50 focus:bg-black/40 outline-none transition-all text-center placeholder:text-gray-600"
      on:keydown={(e) => e.key === 'Enter' && handleAnalyze()}
    />
  </div>

  <div class="grid grid-cols-2 gap-3 w-full">
    {#each moods as mood}
      <button 
        class="relative group px-4 py-4 rounded-xl border border-white/5 bg-white/5 hover:bg-raga-primary/10 hover:border-raga-primary/50 transition-all active:scale-95"
        on:click={() => selectMood(mood)}
      >
        <span class="capitalize font-medium text-gray-200 group-hover:text-white transition-colors">{mood}</span>
      </button>
    {/each}
  </div>
  
  <!-- Social Proof -->
  <div class="mt-4 flex items-center gap-2 text-xs text-gray-500">
    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
    <span>1,420 people meditating now</span>
  </div>
</div>
