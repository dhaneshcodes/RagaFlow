<script>
  import { showDakshina } from '../engine/GamificationEngine';
  import { fade, scale } from 'svelte/transition';

  function close() {
    showDakshina.set(false);
  }

  const upiLink = "upi://pay?pa=dhanesh.m.india-1@okaxis&pn=Dhanesh&tn=Payment&am=0&cu=INR";
</script>

{#if $showDakshina}
  <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md" transition:fade>
    <div 
      class="bg-gradient-to-br from-raga-dark to-[#1a0505] border border-raga-primary/30 p-8 rounded-2xl text-center shadow-[0_0_60px_rgba(255,153,51,0.2)] max-w-sm w-full mx-4 relative"
      transition:scale
    >
      <button on:click={close} class="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
      
      <div class="text-5xl mb-4">🪷</div>
      <h2 class="text-2xl font-serif text-raga-primary mb-2">Energy Exchange</h2>
      
      <p class="text-gray-300 text-sm leading-relaxed mb-6">
        In the ancient tradition of <i>Guru-Shishya Parampara</i>, knowledge flows freely, but the balance is maintained through <b>Dakshina</b> (offering).
      </p>
      
      <p class="text-gray-400 text-xs mb-8 italic">
        "When you give to the source, you open yourself to receive more."
      </p>

      <a 
        href={upiLink}
        target="_blank"
        class="block w-full py-3 bg-gradient-to-r from-raga-primary to-orange-600 text-white font-bold rounded-lg shadow-lg hover:scale-[1.02] transition-transform mb-4"
      >
        Offer Dakshina (UPI)
      </a>
      
      <div class="text-[10px] text-gray-600">
        Secure payment via your preferred UPI app.
      </div>
    </div>
  </div>
{/if}
