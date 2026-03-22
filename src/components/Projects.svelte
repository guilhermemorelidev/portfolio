<script lang="ts">
  import { projects } from '../lib/data';
</script>

<section id="projects" class="section">
  <div class="section-inner">
    <div class="section-label">
      <span class="label-line"></span>
      <span>03 — Projetos</span>
    </div>

    <div class="proj-header">
      <h2 class="section-title">
        O que eu <span class="accent">construí</span>
      </h2>
      <a href="https://github.com/guilhermemorelidev" target="_blank" rel="noopener noreferrer" class="see-all">
        Ver todos no GitHub →
      </a>
    </div>

    <div class="projects-grid">
      {#each projects as project}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          class="project-card glass-card"
          class:featured={project.featured}
        >
          <!-- Topo: ícone + seta (sem badge aqui) -->
          <div class="proj-top">
            <div class="proj-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>

            <div class="proj-top-right">
              {#if project.featured}
                <span class="featured-badge">Destaque</span>
              {/if}
              <svg class="proj-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </div>
          </div>

          <h3 class="proj-title">{project.title}</h3>
          <p class="proj-desc">{project.description}</p>

          <div class="proj-techs">
            {#each project.techs as tech}
              <span class="tech-tag">{tech}</span>
            {/each}
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .proj-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .see-all {
    font-size: 0.85rem;
    color: rgba(139,92,246,0.8);
    text-decoration: none;
    font-weight: 500;
    margin-bottom: 0.5rem;
    transition: color 0.2s;
  }
  .see-all:hover { color: #a78bfa; }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.75rem;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .project-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-card:hover {
    border-color: rgba(139,92,246,0.35);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(139,92,246,0.1);
  }

  .project-card:hover::before { opacity: 1; }

  .project-card.featured {
    border-color: rgba(139,92,246,0.22);
  }

  /* Topo do card — ícone à esquerda, badge+seta à direita */
  .proj-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .proj-top-right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  /* Badge inline ao lado da seta */
  .featured-badge {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(249,115,22,0.9);
    background: rgba(249,115,22,0.1);
    border: 1px solid rgba(249,115,22,0.25);
    padding: 0.18rem 0.55rem;
    border-radius: 4px;
    white-space: nowrap;
    line-height: 1.4;
  }

  .proj-icon { color: rgba(139,92,246,0.7); transition: color 0.2s; }
  .project-card:hover .proj-icon { color: #a78bfa; }

  .proj-arrow { color: rgba(255,255,255,0.25); transition: all 0.2s; flex-shrink: 0; }
  .project-card:hover .proj-arrow { color: rgba(255,255,255,0.7); transform: translate(2px,-2px); }

  .proj-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    margin: 0;
    transition: color 0.2s;
  }
  .project-card:hover .proj-title { color: #fff; }

  .proj-desc {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.65;
    margin: 0;
    flex: 1;
  }

  .proj-techs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
  }

  .tech-tag {
    font-size: 0.72rem;
    font-weight: 600;
    font-family: monospace;
    color: rgba(139,92,246,0.75);
    background: rgba(139,92,246,0.08);
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    letter-spacing: 0.04em;
  }

  @media (max-width: 640px) {
    .projects-grid { grid-template-columns: 1fr; }
  }
</style>
