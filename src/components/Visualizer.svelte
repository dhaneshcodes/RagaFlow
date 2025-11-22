<script>
  import { onMount, onDestroy } from 'svelte';
  import * as Tone from 'tone';

  let canvas;
  let ctx;
  let animationId;
  let analyser;

  onMount(() => {
    ctx = canvas.getContext('2d');
    analyser = new Tone.Analyser('fft', 64);
    Tone.Destination.connect(analyser);
    
    draw();
  });

  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });

  function draw() {
    animationId = requestAnimationFrame(draw);
    const values = analyser.getValue();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = canvas.width / values.length;
    
    values.forEach((v, i) => {
      // v is in decibels, usually -100 to 0
      const height = Tone.dbToGain(v) * canvas.height * 2; 
      const x = i * barWidth;
      
      ctx.fillStyle = '#FF9933';
      ctx.globalAlpha = 0.6;
      ctx.fillRect(x, canvas.height - height, barWidth - 2, height);
    });
  }
</script>

<canvas 
  bind:this={canvas} 
  width="300" 
  height="100" 
  class="w-full h-32 rounded-lg opacity-80"
></canvas>
