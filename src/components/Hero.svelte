<script lang="ts">
  import { personal } from '../lib/data';
  let imgError = false;
</script>

<section id="hero" class="hero">
  <div class="hero-inner">
    <div class="hero-text">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        Disponível para projetos
      </div>

      <h1 class="hero-name">
        <span class="name-first">{personal.name.split(' ')[0]}</span>
        <span class="name-accent">{personal.name.split(' ')[1]}</span>
      </h1>

      <p class="hero-role">
        <span class="role-prefix">→ </span>{personal.role}
      </p>

      <p class="hero-tagline">{personal.tagline}</p>

      <div class="hero-actions">
        <a href={personal.github} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          GitHub
        </a>
        <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
      </div>

      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">2+</span>
          <span class="stat-label">Anos de código</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-number">10+</span>
          <span class="stat-label">Projetos</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-number">2</span>
          <span class="stat-label">Stacks principais</span>
        </div>
      </div>
    </div>

    <div class="hero-image-wrap">
      <div class="image-frame">
        {#if !imgError}
          <img src={personal.image} alt={`Foto de ${personal.name}`} class="profile-img" on:error={() => imgError = true} />
        {:else}
          <div class="img-initials" aria-label="Guilherme Moreli">
            <span class="initials-text">GM</span>
            <span class="initials-hint">Coloque sua foto em<br/><code>/public/img.jpeg</code></span>
          </div>
        {/if}
      </div>
      <div class="img-deco deco-tl"></div>
      <div class="img-deco deco-br"></div>
      <div class="img-glow"></div>
    </div>
  </div>
</section>

<!-- Scroll hint FORA da section — posição fixa na viewport, não sobrepõe as stats -->
<div class="scroll-hint" aria-hidden="true">
  <div class="scroll-line"></div>
  <span>scroll</span>
</div>

<style>
  .hero {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* padding-bottom extra para as stats não ficarem atrás do scroll hint */
    padding: 6rem 2rem 7rem;
    overflow: visible;
  }

  .hero-inner {
    max-width: 1160px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 5rem;
    align-items: center;
    overflow: visible;
  }

  .hero-text {
    overflow: visible;
    padding-right: 0.5rem;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    background: rgba(139, 92, 246, 0.08);
    border: 1px solid rgba(139, 92, 246, 0.18);
    padding: 0.3rem 0.85rem;
    border-radius: 999px;
    margin-bottom: 2rem;
  }

  .badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    animation: blink 2.4s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }

  .hero-name {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: clamp(3.2rem, 6vw, 5.8rem);
    font-weight: 400;
    line-height: 1.1;
    color: #fff;
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
    overflow: visible;
    padding-right: 0.15em;
  }

  .name-first { display: block; overflow: visible; }

  .name-accent {
    display: block;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 55%, #f97316 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-style: italic;
    overflow: visible;
    padding-right: 0.12em;
  }

  .hero-role {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: rgba(139, 92, 246, 0.75);
    margin: 0 0 1.25rem;
    letter-spacing: 0.02em;
  }

  .role-prefix { color: rgba(249, 115, 22, 0.6); }

  .hero-tagline {
    font-size: 1rem;
    font-weight: 400;
    color: rgba(255,255,255,0.42);
    line-height: 1.7;
    margin: 0 0 2.5rem;
    max-width: 380px;
  }

  .hero-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.65rem 1.35rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.22s ease;
    letter-spacing: 0.01em;
  }

  .btn-primary {
    background: rgba(139, 92, 246, 0.12);
    border: 1px solid rgba(139, 92, 246, 0.4);
    color: #c4b5fd;
  }
  .btn-primary:hover { background: rgba(139, 92, 246, 0.22); border-color: rgba(139, 92, 246, 0.75); transform: translateY(-1px); }

  .btn-secondary {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: #fff; transform: translateY(-1px); }

  .hero-stats {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .stat-number {
    display: block;
    font-family: 'DM Serif Display', serif;
    font-size: 1.8rem;
    font-weight: 400;
    color: #fff;
    line-height: 1;
    letter-spacing: -0.01em;
  }

  .stat-label {
    display: block;
    font-size: 0.68rem;
    color: rgba(255,255,255,0.35);
    margin-top: 0.25rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .stat-divider {
    width: 1px; height: 28px;
    background: rgba(255,255,255,0.08);
    flex-shrink: 0;
  }

  .hero-image-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-frame {
    position: relative;
    width: 360px; height: 420px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(139, 92, 246, 0.18);
    background: rgba(139, 92, 246, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .profile-img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .img-initials {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    text-align: center;
  }

  .initials-text {
    font-family: 'DM Serif Display', serif;
    font-size: 5rem;
    font-weight: 400;
    background: linear-gradient(135deg, #8b5cf6, #6366f1, #f97316);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .initials-hint { font-size: 0.72rem; color: rgba(255,255,255,0.2); line-height: 1.6; }
  .initials-hint code { color: rgba(139,92,246,0.5); font-family: var(--font-mono); font-size: 0.68rem; }

  .img-deco {
    position: absolute;
    width: 32px; height: 32px;
    z-index: 3;
    border-color: rgba(249, 115, 22, 0.4);
    border-style: solid;
  }
  .deco-tl { top:-6px; left:-6px; border-width:1.5px 0 0 1.5px; border-radius:3px 0 0 0; }
  .deco-br { bottom:-6px; right:-6px; border-width:0 1.5px 1.5px 0; border-radius:0 0 3px 0; }

  .img-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 130%; height: 130%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
    z-index: 1;
    pointer-events: none;
  }

  /* ── Scroll hint — fixo na viewport, abaixo do fold, centralizado ── */
  .scroll-hint {
    position: fixed;
    /* Coloca no rodapé da viewport sem sobrepor conteúdo */
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255,255,255,0.22);
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    pointer-events: none;
    animation: fadeHint 1s ease 3.2s both;
    /* Desaparece quando o usuário começa a rolar */
  }

  @keyframes fadeHint { from { opacity: 0; } to { opacity: 1; } }

  .scroll-line {
    width: 1px; height: 32px;
    background: linear-gradient(to bottom, rgba(139,92,246,0.5), transparent);
    animation: scrollAnim 2.4s ease-in-out infinite;
  }

  @keyframes scrollAnim {
    0%, 100% { transform: scaleY(1); opacity: 1; }
    50% { transform: scaleY(0.45); opacity: 0.25; }
  }

  @media (max-width: 960px) {
    .hero-inner { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
    .hero { padding-bottom: 6rem; }
    .hero-tagline { max-width: 100%; margin-left: auto; margin-right: auto; }
    .hero-actions { justify-content: center; }
    .hero-stats { justify-content: center; }
    .hero-image-wrap { order: -1; }
    .image-frame { width: 240px; height: 280px; }
  }
</style>
