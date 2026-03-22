<script lang="ts">
  import { personal } from '../lib/data';
  const year = new Date().getFullYear();
</script>

<footer>
  <div class="footer-inner">
    <a class="footer-logo" href="#hero">
      <span class="logo-bracket">&lt;</span>GM<span class="logo-bracket">/&gt;</span>
    </a>

    <p class="footer-copy">
      © {year} Guilherme Moreli — Feito com Svelte + Tailwind
    </p>

    <div class="footer-links">
      <a href={personal.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href={`mailto:${personal.email}`}>Email</a>
    </div>
  </div>
</footer>

<style>
  footer {
    position: relative;
    z-index: 1;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 2rem;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-logo {
    font-family: 'Fira Code', monospace;
    font-size: 1rem;
    font-weight: 700;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-logo:hover { color: rgba(255,255,255,0.85); }

  .logo-bracket { color: rgba(139,92,246,0.7); }

  .footer-copy {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.25);
    margin: 0;
    text-align: center;
  }

  .footer-links {
    display: flex;
    gap: 1.25rem;
  }

  .footer-links a {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.35);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-links a:hover { color: rgba(255,255,255,0.75); }

  @media (max-width: 640px) {
    .footer-inner { flex-direction: column; align-items: center; text-align: center; }
  }
</style>