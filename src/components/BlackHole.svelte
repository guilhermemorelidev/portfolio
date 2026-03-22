<script lang="ts">
  // Fundo com mesh gradient suave + noise — estilo editorial refinado
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d')!;
    let W: number, H: number, animId: number, t = 0;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    // Orbs flutuantes — mesh gradient suave
    interface Orb {
      x: number; y: number; vx: number; vy: number;
      r: number; hue: number; sat: number;
    }

    const orbs: Orb[] = [
      { x: 0.72, y: 0.18, vx:  0.00012, vy:  0.00008, r: 0.48, hue: 258, sat: 70 },
      { x: 0.15, y: 0.62, vx: -0.00009, vy:  0.00013, r: 0.42, hue: 240, sat: 60 },
      { x: 0.85, y: 0.80, vx:  0.00011, vy: -0.00010, r: 0.38, hue: 280, sat: 55 },
      { x: 0.45, y: 0.35, vx: -0.00007, vy: -0.00009, r: 0.32, hue: 210, sat: 50 },
    ];

    function draw() {
      t++;
      ctx.clearRect(0, 0, W, H);

      // Fundo base
      ctx.fillStyle = '#09090f';
      ctx.fillRect(0, 0, W, H);

      // Orbs com movimento muito lento e suave
      for (const o of orbs) {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -0.1 || o.x > 1.1) o.vx *= -1;
        if (o.y < -0.1 || o.y > 1.1) o.vy *= -1;

        const cx = o.x * W;
        const cy = o.y * H;
        const r  = o.r * Math.min(W, H);

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0,   `hsla(${o.hue}, ${o.sat}%, 45%, 0.18)`);
        g.addColorStop(0.5, `hsla(${o.hue}, ${o.sat}%, 38%, 0.08)`);
        g.addColorStop(1,   `hsla(${o.hue}, ${o.sat}%, 30%, 0)`);

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // Grade de pontos muito sutil (estilo Figma/Linear)
      const spacing = 32;
      const dotR = 0.8;
      ctx.fillStyle = 'rgba(255,255,255,0.045)';
      for (let x = spacing; x < W; x += spacing) {
        for (let y = spacing; y < H; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Linha horizontal tênue no topo (sotaque editorial)
      const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
      lineGrad.addColorStop(0, 'transparent');
      lineGrad.addColorStop(0.35, 'rgba(139,92,246,0.12)');
      lineGrad.addColorStop(0.65, 'rgba(99,102,241,0.09)');
      lineGrad.addColorStop(1, 'transparent');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.28);
      ctx.lineTo(W, H * 0.28);
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  });
</script>

<div class="bg-wrapper" aria-hidden="true">
  <canvas bind:this={canvas} class="bg-canvas"></canvas>
</div>

<style>
  .bg-wrapper {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .bg-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
