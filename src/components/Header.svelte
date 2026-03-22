<script lang="ts">
  import { onMount } from 'svelte';

  let scrolled = false;
  let menuOpen = false;

  const navLinks = [
    { label: 'Início',    href: '#hero' },
    { label: 'Sobre',     href: '#about' },
    { label: 'Skills',    href: '#skills' },
    { label: 'Projetos',  href: '#projects' },
    { label: 'Formação',  href: '#education' },
    { label: 'Contato',   href: '#contact' },
  ];

  onMount(() => {
    const handler = () => { scrolled = window.scrollY > 50; };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  });

  function smoothScroll(e: MouseEvent, href: string) {
    e.preventDefault();
    menuOpen = false;
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<header class:scrolled>
  <nav class="nav-inner">
    <a class="logo" href="#hero" on:click={(e) => smoothScroll(e, '#hero')}>
      <span class="logo-bracket">&lt;</span>GM<span class="logo-bracket">/&gt;</span>
    </a>

    <ul class="nav-links">
      {#each navLinks as { label, href }}
        <li>
          <a {href} on:click={(e) => smoothScroll(e, href)}>{label}</a>
        </li>
      {/each}
    </ul>

    <a class="cta-btn" href="#contact" on:click={(e) => smoothScroll(e, '#contact')} aria-label="Entrar em contato">
      Entrar em contato
    </a>

    <button class="hamburger" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>
      <span class:open={menuOpen}></span>
      <span class:open={menuOpen}></span>
      <span class:open={menuOpen}></span>
    </button>
  </nav>

  {#if menuOpen}
    <div class="mobile-menu">
      {#each navLinks as { label, href }}
        <a {href} on:click={(e) => smoothScroll(e, href)}>{label}</a>
      {/each}
      <a class="cta-btn mobile-cta" href="#contact" on:click={(e) => smoothScroll(e, '#contact')}>Entrar em contato</a>
    </div>
  {/if}
</header>

<style>
  header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 1.25rem 2rem;
    transition: all 0.35s ease;
  }

  header.scrolled {
    background: rgba(9, 9, 15, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 0.85rem 2rem;
  }

  .nav-inner {
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .logo {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    text-decoration: none;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  .logo-bracket { color: rgba(139,92,246,0.7); }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 0;
    margin: 0 auto;
    padding: 0;
  }

  .nav-links a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    font-size: 0.83rem;
    font-weight: 400;
    letter-spacing: 0.01em;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    transition: color 0.2s, background 0.2s;
  }

  .nav-links a:hover {
    color: rgba(255,255,255,0.9);
    background: rgba(255,255,255,0.05);
  }

  .cta-btn {
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    padding: 0.45rem 1.1rem;
    border-radius: 7px;
    border: 1px solid rgba(139, 92, 246, 0.4);
    background: rgba(139, 92, 246, 0.08);
    transition: all 0.22s ease;
    white-space: nowrap;
    cursor: pointer;
  }

  .cta-btn:hover {
    background: rgba(139, 92, 246, 0.18);
    border-color: rgba(139, 92, 246, 0.7);
    color: #fff;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-left: auto;
  }

  .hamburger span {
    display: block;
    width: 20px;
    height: 1.5px;
    background: rgba(255,255,255,0.6);
    border-radius: 2px;
    transition: all 0.28s ease;
  }

  .hamburger span.open:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hamburger span.open:nth-child(2) { opacity: 0; }
  .hamburger span.open:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0.75rem 2rem 1.25rem;
    background: rgba(9, 9, 15, 0.97);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  .mobile-menu a {
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    font-size: 0.9rem;
    padding: 0.6rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: color 0.2s;
  }

  .mobile-menu a:hover { color: #fff; }

  .mobile-cta {
    margin-top: 0.75rem;
    text-align: center;
    border-bottom: none !important;
  }

  @media (max-width: 768px) {
    .nav-links, .cta-btn:not(.mobile-cta) { display: none; }
    .hamburger { display: flex; }
  }
</style>
