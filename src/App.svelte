<script>
  import MoodSelector from './components/MoodSelector.svelte';
  import RagaPlayer from './components/RagaPlayer.svelte';
  import LevelUpModal from './components/LevelUpModal.svelte';
  import DakshinaModal from './components/DakshinaModal.svelte';
  import { ragaEngine } from './engine/RagaEngine';
  import { showDakshina } from './engine/GamificationEngine';

  let currentView = 'mood'; // 'mood' | 'player'
  let selectedRaga = null;

  function handleMoodSelect(event) {
    const mood = event.detail;
    const timeOfDay = getTimeOfDay();
    selectedRaga = ragaEngine.recommendRaga(mood, timeOfDay);
    currentView = 'player';
  }

  function handleBack() {
    currentView = 'mood';
    selectedRaga = null;
  }

  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }
</script>

<main class="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
  <!-- Dynamic Mesh Gradient Background -->
  <div class="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
    <div class="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-raga-primary/20 rounded-full blur-[100px] animate-float" style="animation-duration: 15s;"></div>
    <div class="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-raga-secondary/20 rounded-full blur-[100px] animate-float" style="animation-duration: 18s; animation-delay: -5s;"></div>
    <div class="absolute top-[40%] left-[30%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px] animate-float" style="animation-duration: 20s; animation-delay: -10s;"></div>
    
    <!-- Grain Overlay for Texture -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
  </div>

  <header class="absolute top-6 left-0 w-full text-center z-20 pointer-events-none">
    <h1 class="text-4xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-raga-primary to-yellow-200">
      RagaFlow
    </h1>
    <p class="text-white/40 text-sm mt-1 tracking-widest uppercase">Therapeutic Audio Journey</p>
  </header>

  <!-- Dakshina Trigger -->
  <button 
    on:click={() => showDakshina.set(true)}
    class="absolute top-6 right-6 z-30 text-2xl opacity-50 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
    title="Offer Dakshina"
  >
    🪷
  </button>

  <div class="w-full max-w-4xl z-10 mt-16">
    {#if currentView === 'mood'}
      <div class="animate-fade-in">
        <MoodSelector on:select={handleMoodSelect} />
      </div>
    {:else if currentView === 'player'}
      <RagaPlayer raga={selectedRaga} onBack={handleBack} />
    {/if}
  </div>
  
  <LevelUpModal />
  <DakshinaModal />
</main>
