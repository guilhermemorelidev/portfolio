<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let canvas: HTMLCanvasElement;
  let done = false;

  onMount(() => {
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const cx = W / 2, cy = H / 2;

    // Fases bem definidas com tempo fixo em ms
    type Phase = 'warp' | 'collapse' | 'flash' | 'fade' | 'done';
    let phase: Phase = 'warp';
    let phaseStart = performance.now();
    let animId: number;

    // Durações de cada fase em ms
    const WARP_MS     = 2200;
    const COLLAPSE_MS = 600;
    const FLASH_MS    = 200;
    const FADE_MS     = 500;

    // ── Som — só toca uma vez ──────────────────────────────────────
    let soundPlayed = false;
    function playSound() {
      if (soundPlayed) return;
      soundPlayed = true;
      try {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        if (!AC) return;
        const ac = new AC();

        // Rumble grave
        const osc = ac.createOscillator();
        const g   = ac.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(60, ac.currentTime);
        osc.frequency.exponentialRampToValueAtTime(25, ac.currentTime + 2.5);
        g.gain.setValueAtTime(0, ac.currentTime);
        g.gain.linearRampToValueAtTime(0.25, ac.currentTime + 0.5);
        g.gain.linearRampToValueAtTime(0, ac.currentTime + 2.8);
        osc.connect(g); g.connect(ac.destination);
        osc.start(); osc.stop(ac.currentTime + 3);

        // Whoosh
        const buf = ac.createBuffer(1, ac.sampleRate * 3, ac.sampleRate);
        const d   = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        const src = ac.createBufferSource();
        src.buffer = buf;
        const flt = ac.createBiquadFilter();
        flt.type = 'bandpass';
        flt.frequency.setValueAtTime(400, ac.currentTime);
        flt.frequency.exponentialRampToValueAtTime(50, ac.currentTime + 2.5);
        flt.Q.value = 1;
        const ng = ac.createGain();
        ng.gain.setValueAtTime(0, ac.currentTime);
        ng.gain.linearRampToValueAtTime(0.1, ac.currentTime + 0.4);
        ng.gain.linearRampToValueAtTime(0, ac.currentTime + 2.6);
        src.connect(flt); flt.connect(ng); ng.connect(ac.destination);
        src.start();
      } catch (_) {}
    }

    // ── Estrelas — geradas uma vez ─────────────────────────────────
    const N = 180;
    const sx   = new Float32Array(N);
    const sy   = new Float32Array(N);
    const sspd = new Float32Array(N);
    const ssz  = new Float32Array(N);
    const sal  = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 120 + Math.random() * Math.max(W, H) * 0.65;
      sx[i]   = cx + Math.cos(a) * r;
      sy[i]   = cy + Math.sin(a) * r;
      sspd[i] = 0.5 + Math.random() * 1.5;
      ssz[i]  = 0.6 + Math.random() * 1.8;
      sal[i]  = 0.4 + Math.random() * 0.6;
    }

    // ── Disco de acreção — ângulos fixos ───────────────────────────
    const AN = 120;
    const aa  = new Float32Array(AN);
    const ar  = new Float32Array(AN);
    const asp = new Float32Array(AN);
    const ah  = new Float32Array(AN);
    const aal = new Float32Array(AN);
    const asz = new Float32Array(AN);

    for (let i = 0; i < AN; i++) {
      aa[i]  = Math.random() * Math.PI * 2;
      ar[i]  = 90 + Math.random() * 50;
      asp[i] = (0.025 + Math.random() * 0.035) * (Math.random() < 0.5 ? 1 : -1);
      ah[i]  = Math.random() < 0.6 ? 265 + Math.random() * 50 : 195 + Math.random() * 35;
      aal[i] = 0.3 + Math.random() * 0.6;
      asz[i] = 0.8 + Math.random() * 1.8;
    }

    // ── Loop principal ─────────────────────────────────────────────
    function draw(now: number) {
      animId = requestAnimationFrame(draw);

      const elapsed = now - phaseStart;  // ms desde início da fase atual

      // ── Limpa ──
      if (phase === 'warp') {
        ctx.fillStyle = 'rgba(9,9,15,0.2)';
      } else {
        ctx.fillStyle = '#09090f';
      }
      ctx.fillRect(0, 0, W, H);

      if (phase === 'warp') {
        playSound();
        const p = Math.min(elapsed / WARP_MS, 1);   // 0→1
        const bhR = 20 + p * 90;                     // raio cresce

        // Disco de acreção — SEM shadowBlur para performance
        for (let i = 0; i < AN; i++) {
          aa[i] += asp[i] * (1 + p * 1.5);
          const pr = Math.max(bhR + 5, ar[i] - p * 0.3);
          ar[i] = pr;
          const px = cx + Math.cos(aa[i]) * pr;
          const py = cy + Math.sin(aa[i]) * pr * 0.3;
          ctx.globalAlpha = aal[i] * (1 - p * 0.5);
          ctx.fillStyle = `hsl(${ah[i]},80%,${55 + p * 15}%)`;
          ctx.beginPath();
          ctx.arc(px, py, asz[i], 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Estrelas sendo sugadas
        for (let i = 0; i < N; i++) {
          const dx = cx - sx[i], dy = cy - sy[i];
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const pull = (0.5 + p * 2) * (1 + 200 / Math.max(dist, 30));
          sx[i] += (dx / dist) * sspd[i] * pull * 0.5;
          sy[i] += (dy / dist) * sspd[i] * pull * 0.5;

          if (dist < bhR + 2) {
            const a = Math.random() * Math.PI * 2;
            const r = W * 0.5 + Math.random() * W * 0.3;
            sx[i] = cx + Math.cos(a) * r;
            sy[i] = cy + Math.sin(a) * r;
          }

          const trailLen = ssz[i] * (2 + p * 12 * (200 / Math.max(dist, 50)));
          const ang = Math.atan2(dy, dx);
          ctx.globalAlpha = sal[i] * 0.85;
          ctx.strokeStyle = `rgba(200,185,255,${sal[i]})`;
          ctx.lineWidth = ssz[i] * 0.5;
          ctx.beginPath();
          ctx.moveTo(sx[i], sy[i]);
          ctx.lineTo(sx[i] - Math.cos(ang) * trailLen, sy[i] - Math.sin(ang) * trailLen);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // Anel gravitacional simples
        ctx.save();
        ctx.globalAlpha = Math.min(p * 2, 0.8);
        ctx.strokeStyle = 'rgba(160,100,255,0.7)';
        ctx.lineWidth = 2 + p * 3;
        ctx.beginPath();
        ctx.arc(cx, cy, bhR * 1.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = Math.min(p * 1.5, 0.4);
        ctx.strokeStyle = 'rgba(100,150,255,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, bhR * 1.02, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Núcleo negro
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(cx, cy, bhR, 0, Math.PI * 2);
        ctx.fill();

        // Transição garantida por tempo
        if (elapsed >= WARP_MS) {
          phase = 'collapse';
          phaseStart = now;
        }

      } else if (phase === 'collapse') {
        const p = Math.min(elapsed / COLLAPSE_MS, 1);
        const bhR = 110 + p * Math.max(W, H) * 0.9;

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(cx, cy, bhR, 0, Math.PI * 2);
        ctx.fill();

        if (elapsed >= COLLAPSE_MS) {
          phase = 'flash';
          phaseStart = now;
        }

      } else if (phase === 'flash') {
        const p = Math.min(elapsed / FLASH_MS, 1);
        const fA = Math.sin(p * Math.PI);   // pico no meio
        const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.8);
        fg.addColorStop(0,   `rgba(230,210,255,${fA * 0.95})`);
        fg.addColorStop(0.5, `rgba(139,92,246,${fA * 0.5})`);
        fg.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = fg;
        ctx.fillRect(0, 0, W, H);

        if (elapsed >= FLASH_MS) {
          phase = 'fade';
          phaseStart = now;
        }

      } else if (phase === 'fade') {
        const p = Math.min(elapsed / FADE_MS, 1);
        ctx.fillStyle = `rgba(9,9,15,${1 - p})`;
        ctx.fillRect(0, 0, W, H);

        if (elapsed >= FADE_MS) {
          cancelAnimationFrame(animId);
          done = true;
          dispatch('done');
          return;
        }
      }
    }

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  });
</script>

<div class="intro-wrap" class:gone={done} aria-hidden="true">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .intro-wrap {
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: all;
    background: #09090f;
  }

  .intro-wrap.gone {
    display: none;
    pointer-events: none;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
