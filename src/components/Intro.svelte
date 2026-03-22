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

    let phase: 'warp' | 'collapse' | 'flash' | 'fade' = 'warp';
    let t = 0;
    let animId: number;

    // ── Web Audio — som de sucção/warp ──────────────────────────────
    function playSound() {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ac = new AudioCtx();

        // Camada 1 — rumble grave (buraco negro)
        const rumble = ac.createOscillator();
        const rumbleGain = ac.createGain();
        rumble.type = 'sine';
        rumble.frequency.setValueAtTime(55, ac.currentTime);
        rumble.frequency.exponentialRampToValueAtTime(28, ac.currentTime + 2.2);
        rumbleGain.gain.setValueAtTime(0, ac.currentTime);
        rumbleGain.gain.linearRampToValueAtTime(0.22, ac.currentTime + 0.4);
        rumbleGain.gain.linearRampToValueAtTime(0.35, ac.currentTime + 1.8);
        rumbleGain.gain.linearRampToValueAtTime(0, ac.currentTime + 2.5);
        rumble.connect(rumbleGain);
        rumbleGain.connect(ac.destination);
        rumble.start(ac.currentTime);
        rumble.stop(ac.currentTime + 2.6);

        // Camada 2 — whoosh de sucção (noise filtrado)
        const bufSize = ac.sampleRate * 2.5;
        const buffer = ac.createBuffer(1, bufSize, ac.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ac.createBufferSource();
        noise.buffer = buffer;
        const filter = ac.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(300, ac.currentTime);
        filter.frequency.exponentialRampToValueAtTime(60, ac.currentTime + 2.2);
        filter.Q.value = 0.8;
        const noiseGain = ac.createGain();
        noiseGain.gain.setValueAtTime(0, ac.currentTime);
        noiseGain.gain.linearRampToValueAtTime(0.12, ac.currentTime + 0.3);
        noiseGain.gain.linearRampToValueAtTime(0.18, ac.currentTime + 1.6);
        noiseGain.gain.linearRampToValueAtTime(0, ac.currentTime + 2.4);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ac.destination);
        noise.start(ac.currentTime);

        // Camada 3 — flash impact
        const impact = ac.createOscillator();
        const impactGain = ac.createGain();
        impact.type = 'sawtooth';
        impact.frequency.setValueAtTime(120, ac.currentTime + 2.0);
        impact.frequency.exponentialRampToValueAtTime(20, ac.currentTime + 2.4);
        impactGain.gain.setValueAtTime(0, ac.currentTime + 2.0);
        impactGain.gain.linearRampToValueAtTime(0.4, ac.currentTime + 2.05);
        impactGain.gain.linearRampToValueAtTime(0, ac.currentTime + 2.5);
        impact.connect(impactGain);
        impactGain.connect(ac.destination);
        impact.start(ac.currentTime + 2.0);
        impact.stop(ac.currentTime + 2.6);
      } catch (_) {
        // Sem áudio disponível — ignora silenciosamente
      }
    }

    // ── Estrelas sendo sugadas ──────────────────────────────────────
    interface Star {
      x: number; y: number;
      angle: number; dist: number;
      speed: number; size: number;
      alpha: number; trail: number;
    }

    const stars: Star[] = [];
    const STAR_COUNT = 280;

    for (let i = 0; i < STAR_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist  = 80 + Math.random() * Math.max(W, H) * 0.75;
      stars.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        angle, dist,
        speed: 0.4 + Math.random() * 1.2,
        size:  0.5 + Math.random() * 2,
        alpha: 0.4 + Math.random() * 0.6,
        trail: 0.08 + Math.random() * 0.12,
      });
    }

    // ── Disco de acreção ────────────────────────────────────────────
    interface ArcParticle {
      angle: number; r: number; speed: number;
      hue: number; alpha: number; size: number;
    }

    const arcParticles: ArcParticle[] = [];
    for (let i = 0; i < 180; i++) {
      arcParticles.push({
        angle: Math.random() * Math.PI * 2,
        r: 80 + Math.random() * 60,
        speed: (0.03 + Math.random() * 0.04) * (Math.random() < 0.5 ? 1 : -1),
        hue: Math.random() < 0.6 ? 270 + Math.random() * 40 : 200 + Math.random() * 30,
        alpha: 0.3 + Math.random() * 0.6,
        size: 0.8 + Math.random() * 2,
      });
    }

    let bhR = 0;        // raio do buraco negro (cresce)
    let flashAlpha = 0;
    let overlayAlpha = 0;
    let warpStrength = 0;

    playSound();

    function draw() {
      animId = requestAnimationFrame(draw);
      t++;

      // Fundo com trail para efeito de movimento
      ctx.fillStyle = `rgba(9,9,15,${phase === 'warp' ? 0.18 : 0.35})`;
      ctx.fillRect(0, 0, W, H);

      const progress = Math.min(t / 130, 1); // 0→1 em ~2.2s
      bhR = progress * 110;
      warpStrength = progress * 1.8;

      if (phase === 'warp' || phase === 'collapse') {

        // ── Disco de acreção ──
        for (const p of arcParticles) {
          p.angle += p.speed * (1 + progress * 2);
          // Espiral para dentro
          p.r = Math.max(bhR + 4, p.r - progress * 0.25);

          const px = cx + Math.cos(p.angle) * p.r * (1 + Math.sin(p.angle) * 0.18);
          const py = cy + Math.sin(p.angle) * p.r * 0.32;

          ctx.save();
          ctx.globalAlpha = p.alpha * (1 - progress * 0.4);
          ctx.fillStyle = `hsl(${p.hue}, 85%, ${55 + progress * 20}%)`;
          ctx.shadowColor = `hsl(${p.hue}, 100%, 70%)`;
          ctx.shadowBlur = 8 + progress * 12;
          ctx.beginPath();
          ctx.arc(px, py, p.size * (1 - progress * 0.3), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // ── Linhas de warp — estrelas sendo sugadas ──
        for (const s of stars) {
          const dx = cx - s.x, dy = cy - s.y;
          const distToCtr = Math.sqrt(dx * dx + dy * dy);

          // Aceleração conforme se aproxima do buraco
          const pull = warpStrength * (1 + (300 / Math.max(distToCtr, 40)));
          s.x += dx / distToCtr * s.speed * pull;
          s.y += dy / distToCtr * s.speed * pull;

          // Reposicionar se passou pelo centro
          if (distToCtr < bhR + 2) {
            const angle = Math.random() * Math.PI * 2;
            const newDist = W * 0.5 + Math.random() * W * 0.3;
            s.x = cx + Math.cos(angle) * newDist;
            s.y = cy + Math.sin(angle) * newDist;
          }

          // Trail — linha do ponto atual até um pouco atrás
          const trailLen = s.size * (3 + progress * 18 * (300 / Math.max(distToCtr, 60)));
          const angle = Math.atan2(dy, dx);
          ctx.save();
          ctx.globalAlpha = s.alpha * (1 - progress * 0.3);
          ctx.strokeStyle = `rgba(200,190,255,${s.alpha * 0.8})`;
          ctx.lineWidth = s.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(
            s.x - Math.cos(angle) * trailLen,
            s.y - Math.sin(angle) * trailLen
          );
          ctx.stroke();
          ctx.restore();
        }

        // ── Anel de luz gravitacional ──
        for (let a = 0; a < Math.PI * 2; a += 0.015) {
          const bright = Math.pow((Math.sin(a + t * 0.04) + 1) * 0.5, 2);
          const ringR = bhR * 1.12 + Math.sin(a * 3) * 4;
          ctx.beginPath();
          ctx.arc(cx, cy, ringR, a, a + 0.02);
          ctx.strokeStyle = `hsla(${270 + bright * 40}, 90%, ${55 + bright * 30}%, ${(0.12 + bright * 0.65) * Math.min(progress * 3, 1)})`;
          ctx.lineWidth = 1 + bright * 3;
          ctx.shadowColor = `hsl(${270 + bright * 40}, 100%, 75%)`;
          ctx.shadowBlur = 8 + bright * 16;
          ctx.stroke();
        }

        // ── Núcleo negro ──
        const shadowGrad = ctx.createRadialGradient(cx, cy, bhR * 0.6, cx, cy, bhR * 1.5);
        shadowGrad.addColorStop(0, 'rgba(0,0,0,1)');
        shadowGrad.addColorStop(0.5, 'rgba(0,0,0,0.95)');
        shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, bhR * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Buraco negro sólido
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(cx, cy, bhR * 0.78, 0, Math.PI * 2);
        ctx.fill();

        if (t > 130) { phase = 'collapse'; }
      }

      if (phase === 'collapse') {
        // Buraco negro expande e consome tudo
        bhR += 8;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(cx, cy, bhR, 0, Math.PI * 2);
        ctx.fill();

        if (bhR > Math.max(W, H) * 0.85) {
          phase = 'flash';
          t = 0;
        }
      }

      if (phase === 'flash') {
        // Tela preta → flash branco → fade para o site
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);

        if (t < 10) {
          // Flash rápido
          const fA = Math.sin((t / 10) * Math.PI);
          const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H));
          fg.addColorStop(0, `rgba(220,200,255,${fA})`);
          fg.addColorStop(0.4, `rgba(139,92,246,${fA * 0.6})`);
          fg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = fg;
          ctx.fillRect(0, 0, W, H);
        } else {
          phase = 'fade';
          t = 0;
        }
      }

      if (phase === 'fade') {
        overlayAlpha = Math.max(1 - t / 35, 0);
        ctx.fillStyle = `rgba(9,9,15,${overlayAlpha})`;
        ctx.fillRect(0, 0, W, H);

        if (overlayAlpha <= 0) {
          cancelAnimationFrame(animId);
          done = true;
          dispatch('done');
          return;
        }
      }
    }

    draw();
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
