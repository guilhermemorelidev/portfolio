<script lang="ts">
  import { onMount } from 'svelte';

  let show = false;

  onMount(() => {
    const handler = () => { show = window.scrollY > 500; };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  });

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<button
  class="back-top"
  class:show
  on:click={scrollTop}
  aria-label="Voltar ao topo"
  title="Voltar ao topo"
>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
</button>

<style>
  .back-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 50;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    border: 1px solid rgba(139,92,246,0.35);
    background: rgba(8,8,16,0.8);
    backdrop-filter: blur(12px);
    color: rgba(139,92,246,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transform: translateY(12px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  }

  .back-top.show {
    opacity: 1;
    transform: translateY(0);
  }

  .back-top:hover {
    background: rgba(139,92,246,0.18);
    border-color: rgba(139,92,246,0.65);
    color: #a78bfa;
    box-shadow: 0 0 20px rgba(139,92,246,0.3);
    transform: translateY(-2px);
  }
</style>