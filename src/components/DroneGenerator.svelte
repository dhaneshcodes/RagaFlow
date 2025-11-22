<script>
  import { audioEngine } from '../engine/AudioEngine';

  let volume = -12;
  let isMuted = false;

  function handleVolume(e) {
    volume = e.target.value;
    if (audioEngine.drone) {
      audioEngine.drone.volume.value = isMuted ? -Infinity : volume;
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (audioEngine.drone) {
      audioEngine.drone.volume.value = isMuted ? -Infinity : volume;
    }
  }
</script>

<div class="bg-white/5 p-4 rounded-lg border border-white/10 mt-4 w-full">
  <div class="flex justify-between items-center mb-2">
    <h4 class="text-sm font-semibold text-gray-300">Tanpura Drone</h4>
    <button 
      on:click={toggleMute}
      class="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
    >
      {isMuted ? 'Unmute' : 'Mute'}
    </button>
  </div>
  
  <input 
    type="range" 
    min="-40" 
    max="0" 
    bind:value={volume} 
    on:input={handleVolume}
    disabled={isMuted}
    class="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
  />
</div>
