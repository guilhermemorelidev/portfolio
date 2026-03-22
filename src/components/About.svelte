<script lang="ts">
  import { personal } from '../lib/data';
</script>

<section id="about" class="section">
  <div class="section-inner">
    <div class="section-label">
      <span class="label-line"></span>
      <span>01 — Sobre mim</span>
    </div>

    <div class="about-grid">
      <div class="about-text">
        <h2 class="section-title">
          Quem está<br />
          <span class="accent">por trás do código</span>
        </h2>

        <div class="about-paragraphs">
          {#each personal.bio.split('\n') as paragraph}
            {#if paragraph.trim()}
              <p>{paragraph.trim()}</p>
            {/if}
          {/each}
        </div>

        <a href={`mailto:${personal.email}`} class="about-cta">
          Vamos conversar →
        </a>
      </div>

      <div class="about-card glass-card">
        <div class="card-row">
          <span class="card-icon">📍</span>
          <div>
            <span class="card-key">Localização</span>
            <span class="card-val">Brasil</span>
          </div>
        </div>
        <div class="card-divider"></div>
        <div class="card-row">
          <span class="card-icon">💼</span>
          <div>
            <span class="card-key">Foco</span>
            <span class="card-val">Backend & Automação</span>
          </div>
        </div>
        <div class="card-divider"></div>
        <div class="card-row">
          <span class="card-icon">🎓</span>
          <div>
            <span class="card-key">Formação</span>
            <span class="card-val">Ensino Médio + SENAI</span>
          </div>
        </div>
        <div class="card-divider"></div>
        <div class="card-row">
          <span class="card-icon">🌐</span>
          <div>
            <span class="card-key">Disponibilidade</span>
            <span class="card-val">Freela & Projetos</span>
          </div>
        </div>
        <div class="card-divider"></div>
        <div class="card-row">
          <span class="card-icon">✉️</span>
          <div>
            <span class="card-key">Email</span>
            <a class="card-val card-link" href={`mailto:${personal.email}`}>{personal.email}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 4rem;
    align-items: start;
    margin-top: 3rem;
  }

  .about-paragraphs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.75rem 0 2rem;
  }

  .about-paragraphs p {
    color: rgba(255,255,255,0.48);
    line-height: 1.8;
    font-size: 0.95rem;
  }

  .about-cta {
    display: inline-block;
    color: rgba(139,92,246,0.85);
    font-weight: 500;
    font-size: 0.88rem;
    text-decoration: none;
    letter-spacing: 0.01em;
    transition: all 0.2s ease;
    border-bottom: 1px solid rgba(139,92,246,0.25);
    padding-bottom: 2px;
  }

  .about-cta:hover {
    color: #a78bfa;
    border-color: rgba(139,92,246,0.6);
    padding-left: 3px;
  }

  .about-card {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: sticky;
    top: 5.5rem;
  }

  .card-row {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 1rem 1.25rem;
  }

  .card-icon { font-size: 1rem; flex-shrink: 0; }

  .card-key {
    display: block;
    font-size: 0.68rem;
    color: rgba(255,255,255,0.28);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.18rem;
  }

  .card-val {
    display: block;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.75);
    font-weight: 500;
  }

  .card-link {
    text-decoration: none;
    color: rgba(139,92,246,0.8);
    transition: color 0.2s;
    word-break: break-all;
  }

  .card-link:hover { color: #a78bfa; }

  .card-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 0 1.25rem;
  }

  @media (max-width: 900px) {
    .about-grid { grid-template-columns: 1fr; gap: 2rem; }
    .about-card { position: static; }
  }
</style>
