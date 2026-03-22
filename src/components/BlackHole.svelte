<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let renderW = 0;
    let renderH = 0;
    let animId = 0;
    let frame = 0;
    let lastDraw = 0;
    let visible = !document.hidden;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    interface Orb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hue: number;
      sat: number;
    }

    const orbs: Orb[] = [
      { x: 0.72, y: 0.18, vx: 0.00012, vy: 0.00008, r: 0.48, hue: 258, sat: 70 },
      { x: 0.15, y: 0.62, vx: -0.00009, vy: 0.00013, r: 0.42, hue: 240, sat: 60 },
      { x: 0.85, y: 0.8, vx: 0.00011, vy: -0.0001, r: 0.38, hue: 280, sat: 55 },
      { x: 0.45, y: 0.35, vx: -0.00007, vy: -0.00009, r: 0.32, hue: 210, sat: 50 },
    ];

    function getScaleFactor() {
      if (prefersReducedMotion.matches) return 0.45;
      return desktopQuery.matches ? 0.75 : 0.6;
    }

    function getFrameInterval() {
      if (!visible) return 220;
      if (prefersReducedMotion.matches) return 120;
      return desktopQuery.matches ? 34 : 44;
    }

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;

      const scale = Math.min(window.devicePixelRatio || 1, getScaleFactor());
      renderW = Math.max(1, Math.round(W * scale));
      renderH = Math.max(1, Math.round(H * scale));

      canvas.width = renderW;
      canvas.height = renderH;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(renderW / W, renderH / H);
    }

    function draw(now = 0) {
      animId = requestAnimationFrame(draw);

      if (now - lastDraw < getFrameInterval()) return;
      lastDraw = now;
      frame += 1;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#09090f';
      ctx.fillRect(0, 0, W, H);

      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -0.1 || orb.x > 1.1) orb.vx *= -1;
        if (orb.y < -0.1 || orb.y > 1.1) orb.vy *= -1;

        const cx = orb.x * W;
        const cy = orb.y * H;
        const radius = orb.r * Math.min(W, H);
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);

        gradient.addColorStop(0, `hsla(${orb.hue}, ${orb.sat}%, 45%, 0.16)`);
        gradient.addColorStop(0.55, `hsla(${orb.hue}, ${orb.sat}%, 38%, 0.07)`);
        gradient.addColorStop(1, `hsla(${orb.hue}, ${orb.sat}%, 30%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, H);
      }

      const spacing = desktopQuery.matches ? 52 : 42;
      const dotR = desktopQuery.matches ? 0.7 : 0.8;
      ctx.fillStyle = 'rgba(255,255,255,0.035)';
      for (let x = spacing; x < W; x += spacing) {
        const yOffset = ((x / spacing + frame * 0.08) % 2) * 4;
        for (let y = spacing; y < H; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y + yOffset, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
      lineGrad.addColorStop(0, 'transparent');
      lineGrad.addColorStop(0.35, 'rgba(139,92,246,0.10)');
      lineGrad.addColorStop(0.65, 'rgba(99,102,241,0.08)');
      lineGrad.addColorStop(1, 'transparent');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.28);
      ctx.lineTo(W, H * 0.28);
      ctx.stroke();
    }

    const handleVisibility = () => {
      visible = !document.hidden;
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener('visibilitychange', handleVisibility);
    prefersReducedMotion.addEventListener('change', resize);
    desktopQuery.addEventListener('change', resize);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      prefersReducedMotion.removeEventListener('change', resize);
      desktopQuery.removeEventListener('change', resize);
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
    contain: strict;
  }

  .bg-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
