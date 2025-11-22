<script>
  import { onMount } from 'svelte';

  let entry = '';
  let savedEntries = [];

  onMount(() => {
    const saved = localStorage.getItem('raga_journal');
    if (saved) {
      savedEntries = JSON.parse(saved);
    }
  });

  function saveEntry() {
    if (!entry.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      text: entry,
      date: new Date().toLocaleString(),
      mood: 'Reflective' // Could pass current mood here
    };
    
    savedEntries = [newEntry, ...savedEntries];
    localStorage.setItem('raga_journal', JSON.stringify(savedEntries));
    entry = '';
  }
</script>

<div class="w-full max-w-md mt-8 p-6 bg-raga-dark/50 rounded-xl border border-white/10">
  <h3 class="text-xl font-serif text-raga-primary mb-4">Raga Journal</h3>
  
  <textarea
    bind:value={entry}
    placeholder="Reflect on your journey..."
    class="w-full h-24 bg-black/30 border border-white/20 rounded-lg p-3 text-sm focus:border-raga-primary outline-none resize-none mb-3"
  ></textarea>
  
  <button 
    on:click={saveEntry}
    class="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors"
  >
    Save Entry
  </button>

  {#if savedEntries.length > 0}
    <div class="mt-6 space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
      {#each savedEntries as item}
        <div class="p-3 bg-black/20 rounded-lg border border-white/5">
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>{item.date}</span>
          </div>
          <p class="text-sm text-gray-300">{item.text}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
</style>
