<script lang="ts">
  import { onMount } from 'svelte';
  import { skills } from '../lib/data';

  let el: HTMLElement;
  let visible = false;

  onMount(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { visible = true; obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section id="skills" bind:this={el} class="section" class:visible>
  <div class="section-inner">
    <div class="section-label">
      <span class="label-line"></span>
      <span>02 — Habilidades</span>
    </div>

    <h2 class="section-title">
      Minha <span class="accent">stack</span>
    </h2>

    <div class="skills-grid">
      {#each skills as category, ci}
        <div
          class="skill-category glass-card"
          style="transition-delay: {ci * 0.12}s"
        >
          <div class="cat-header">
            <span class="cat-icon">{category.icon}</span>
            <h3 class="cat-title">{category.category}</h3>
          </div>

          <div class="skill-list">
            {#each category.items as skill, si}
              <div class="skill-item" style="transition-delay: {ci * 0.12 + si * 0.06}s">
                <div class="skill-meta">
                  <span class="skill-name">{skill.name}</span>
                  <span class="skill-pct">{skill.level}%</span>
                </div>
                <div class="skill-bar-bg">
                  <div
                    class="skill-bar-fill"
                    style="width: {visible ? skill.level : 0}%"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <!-- Badges de tech extras -->
    <div class="tech-badges">
      <span class="section-sub">Outras tecnologias</span>
      <div class="badges-list">
        {#each ['REST APIs', 'JWT', 'ORM', 'MVC', 'SOLID', 'Git Flow', 'Bash', 'Redis', 'Nginx', 'JSON'] as t}
          <span class="badge">{t}</span>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
  }

  .skill-category {
    padding: 1.75rem;
  }

  .cat-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .cat-icon { font-size: 1.3rem; }

  .cat-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0;
  }

  .skill-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .skill-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.4rem;
  }

  .skill-name {
    font-size: 0.87rem;
    color: rgba(255,255,255,0.7);
    font-weight: 500;
  }

  .skill-pct {
    font-size: 0.75rem;
    color: rgba(139,92,246,0.7);
    font-family: monospace;
  }

  .skill-bar-bg {
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 99px;
    overflow: hidden;
  }

  .skill-bar-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #8b5cf6, #6366f1 60%, #f97316);
    transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 0 8px rgba(139,92,246,0.4);
  }

  /* Badges */
  .tech-badges {
    margin-top: 3rem;
  }

  .section-sub {
    display: block;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.3);
    margin-bottom: 1rem;
  }

  .badges-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .badge {
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 0.3rem 0.75rem;
    border-radius: 6px;
    letter-spacing: 0.03em;
    transition: all 0.2s;
    cursor: default;
  }

  .badge:hover {
    color: rgba(139,92,246,0.9);
    border-color: rgba(139,92,246,0.3);
    background: rgba(139,92,246,0.07);
  }

  @media (max-width: 900px) {
    .skills-grid { grid-template-columns: 1fr; }
  }

  @media (min-width: 640px) and (max-width: 900px) {
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>