<script>
  import { onMount, onDestroy } from 'svelte';
  import * as Tone from 'tone';

  let canvas;
  let ctx;
  let animationId;
  let analyser;
  let rotation = 0;

  onMount(() => {
    ctx = canvas.getContext('2d');
    analyser = new Tone.Analyser('fft', 32);
    Tone.Destination.connect(analyser);
    
    draw();
  });

  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });

  function draw() {
    animationId = requestAnimationFrame(draw);
    const values = analyser.getValue();
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.fillStyle = 'rgba(26, 26, 26, 0.2)'; // Fade effect
    ctx.fillRect(0, 0, width, height);
    
    rotation += 0.005;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    // Draw Mandala layers
    for (let i = 0; i < 3; i++) { // 3 layers
      const radius = 50 + (i * 40);
      const dataIndex = Math.floor(i * (values.length / 3));
      const val = values[dataIndex]; // db
      const scale = 1 + (Tone.dbToGain(val) * 2);
      
      ctx.beginPath();
      ctx.strokeStyle = i === 0 ? '#FF9933' : (i === 1 ? '#138808' : '#FFFFFF');
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;

      const points = 8 + (i * 4);
      for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const r = radius * scale;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    
    ctx.restore();
  }
</script>

<canvas 
  bind:this={canvas} 
  width="400" 
  height="400" 
  class="w-full max-w-[400px] h-auto aspect-square rounded-full opacity-90 mix-blend-screen"
></canvas>
