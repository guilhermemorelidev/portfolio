<script lang="ts">
  import { onMount } from 'svelte';
  import { education } from '../lib/data';

  let el: HTMLElement;
  let visible = false;

  onMount(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { visible = true; obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section id="education" bind:this={el} class="section" class:visible>
  <div class="section-inner">
    <div class="section-label">
      <span class="label-line"></span>
      <span>04 — Formação</span>
    </div>

    <h2 class="section-title">
      Minha <span class="accent">jornada</span>
    </h2>

    <div class="timeline">
      {#each education as item, i}
        <div
          class="timeline-item"
          style="transition-delay: {i * 0.12}s"
        >
          <!-- Linha e ponto da timeline -->
          <div class="timeline-track">
            <div class="timeline-dot"></div>
            {#if i < education.length - 1}
              <div class="timeline-line"></div>
            {/if}
          </div>

          <!-- Conteúdo -->
          <div class="timeline-content glass-card">
            <div class="edu-header">
              <span class="edu-period">{item.period}</span>
              <span class="edu-institution">{item.institution}</span>
            </div>
            <h3 class="edu-title">{item.title}</h3>
            <p class="edu-desc">{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 3rem;
    position: relative;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 1.5rem;
    align-items: start;
  }

  /* Track — linha vertical e ponto */
  .timeline-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1.5rem;
  }

  .timeline-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #8b5cf6;
    border: 2px solid rgba(139,92,246,0.4);
    box-shadow: 0 0 10px rgba(139,92,246,0.5);
    flex-shrink: 0;
    z-index: 1;
  }

  .timeline-line {
    width: 1px;
    flex: 1;
    min-height: 2rem;
    background: linear-gradient(to bottom, rgba(139,92,246,0.4), rgba(139,92,246,0.05));
    margin-top: 6px;
  }

  /* Card de conteúdo */
  .timeline-content {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }

  .timeline-content:hover {
    border-color: rgba(139,92,246,0.3);
    box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  }

  .edu-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 0.6rem;
  }

  .edu-period {
    font-family: monospace;
    font-size: 0.78rem;
    font-weight: 600;
    color: #8b5cf6;
    letter-spacing: 0.04em;
    background: rgba(139,92,246,0.1);
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
  }

  .edu-institution {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.03em;
  }

  .edu-title {
    font-size: 1rem;
    font-weight: 700;
    color: rgba(255,255,255,0.88);
    margin: 0 0 0.5rem;
  }

  .edu-desc {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.65;
    margin: 0;
  }

  @media (max-width: 640px) {
    .timeline-item {
      grid-template-columns: 28px 1fr;
      gap: 1rem;
    }
  }
</style>