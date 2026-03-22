<script lang="ts">
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import Hero from './components/Hero.svelte';
  import About from './components/About.svelte';
  import Skills from './components/Skills.svelte';
  import Projects from './components/Projects.svelte';
  import Education from './components/Education.svelte';
  import Contact from './components/Contact.svelte';
  import Footer from './components/Footer.svelte';
  import BackToTop from './components/Backtotop.svelte';
  import BlackHole from './components/BlackHole.svelte';
  import Intro from './components/Intro.svelte';
  import Cursor from './components/Cursor.svelte';

  let introDone = false;
  let mainEl: HTMLElement;

  function onIntroDone() {
    introDone = true;
    setTimeout(initGsap, 100);
  }

  function initGsap() {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // ── Hero — entrada staggered ────────────────────────────────────
    const heroItems = [
      '#hero .hero-badge',
      '#hero .hero-name',
      '#hero .hero-role',
      '#hero .hero-tagline',
      '#hero .hero-actions',
      '#hero .hero-stats',
      '#hero .hero-image-wrap',
    ].map(s => mainEl.querySelector(s)).filter(Boolean);

    gsap.fromTo(heroItems, {
      opacity: 0, y: 40, filter: 'blur(8px)'
    }, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 0.9, ease: 'power3.out',
      stagger: 0.11, delay: 0.1
    });

    // ── Section labels ──────────────────────────────────────────────
    mainEl.querySelectorAll('.section-label').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, x: -24 }, {
        opacity: 1, x: 0, duration: 0.55, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });

    // ── Section titles ──────────────────────────────────────────────
    mainEl.querySelectorAll('.section-title').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 28, filter: 'blur(4px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // ── Glass cards — stagger per group ────────────────────────────
    mainEl.querySelectorAll('#skills .skill-category, #projects .project-card').forEach((card, i) => {
      gsap.fromTo(card, {
        opacity: 0, y: 36, scale: 0.96
      }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.65, ease: 'power2.out',
        delay: (i % 3) * 0.1,
        scrollTrigger: { trigger: card, start: 'top 90%' }
      });
    });

    // ── Timeline items ──────────────────────────────────────────────
    mainEl.querySelectorAll('.timeline-item').forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.08,
        scrollTrigger: { trigger: item, start: 'top 90%' }
      });
    });

    // ── About card ──────────────────────────────────────────────────
    const aboutCard = mainEl.querySelector('.about-card');
    if (aboutCard) {
      gsap.fromTo(aboutCard, { opacity: 0, x: 30 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: aboutCard, start: 'top 88%' }
      });
    }

    // ── Contact wrap ────────────────────────────────────────────────
    const contactWrap = mainEl.querySelector('.contact-wrap');
    if (contactWrap) {
      gsap.fromTo(contactWrap.children, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: contactWrap, start: 'top 88%' }
      });
    }

    // ── Tilt em cards de projeto ────────────────────────────────────
    mainEl.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
      card.style.transformStyle = 'preserve-3d';
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(card, {
          rotationY: x * 7, rotationX: -y * 5,
          transformPerspective: 900,
          duration: 0.4, ease: 'power1.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.55, ease: 'elastic.out(1,0.5)' });
      });
    });

    // ── Parallax fundo ──────────────────────────────────────────────
    const bgCanvas = document.querySelector<HTMLElement>('.bg-wrapper');
    if (bgCanvas) {
      gsap.to(bgCanvas, {
        yPercent: 12, ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top', end: 'bottom bottom',
          scrub: 1.5
        }
      });
    }
  }
</script>

<!-- Cursor customizado (desktop only via CSS media query) -->
<Cursor />

<!-- Animação de intro -->
{#if !introDone}
  <Intro on:done={onIntroDone} />
{/if}

<!-- Conteúdo principal — aparece após a intro -->
<div class="app" bind:this={mainEl} class:visible={introDone}>
  <BlackHole />
  <Header />
  <main>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Education />
    <Contact />
  </main>
  <Footer />
  <BackToTop />
</div>

<style>
  .app {
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .app.visible {
    opacity: 1;
  }
</style>
