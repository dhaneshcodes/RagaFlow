<script>
  export let raga;
</script>

<div class="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 shadow-xl">
  <div class="flex justify-between items-start mb-4">
    <div>
      <h3 class="text-3xl font-serif text-white mb-1">{raga.name}</h3>
      <p class="text-raga-primary text-sm uppercase tracking-wider">{raga.timeOfDay} Raga</p>
    </div>
    <div class="px-3 py-1 rounded-full bg-white/10 text-xs">
      {raga.rasa}
    </div>
  </div>
  
  <p class="text-gray-400 leading-relaxed mb-6">
    {raga.description}
  </p>

  <div class="flex items-center gap-4 text-sm text-gray-500">
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full" style="background-color: {raga.color}"></div>
      <span>Theme Color</span>
    </div>
    <div>
      Drone: <span class="text-white">{raga.droneNote}</span>
    </div>
  </div>
</div>
