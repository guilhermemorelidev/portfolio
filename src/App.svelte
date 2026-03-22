<script lang="ts">
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
    if (!gsap || !ScrollTrigger || !mainEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    gsap.registerPlugin(ScrollTrigger);

    const revealDistance = prefersReducedMotion ? 12 : 24;
    const revealDuration = prefersReducedMotion ? 0.35 : 0.55;
    const revealBlur = prefersReducedMotion ? 'blur(0px)' : 'blur(3px)';

    const heroItems = [
      '#hero .hero-badge',
      '#hero .hero-name',
      '#hero .hero-role',
      '#hero .hero-tagline',
      '#hero .hero-actions',
      '#hero .hero-stats',
      '#hero .hero-image-wrap',
    ].map((selector) => mainEl.querySelector(selector)).filter(Boolean);

    if (heroItems.length) {
      gsap.fromTo(heroItems, {
        opacity: 0,
        y: prefersReducedMotion ? 10 : 28,
        filter: prefersReducedMotion ? 'blur(0px)' : 'blur(5px)'
      }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: prefersReducedMotion ? 0.4 : 0.7,
        ease: 'power2.out',
        stagger: prefersReducedMotion ? 0.04 : 0.08,
        delay: 0.05,
        clearProps: 'transform,filter,opacity'
      });
    }

    mainEl.querySelectorAll('.section-label').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, x: -revealDistance }, {
        opacity: 1,
        x: 0,
        duration: revealDuration,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true }
      });
    });

    mainEl.querySelectorAll('.section-title').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: revealDistance, filter: revealBlur }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: prefersReducedMotion ? 0.4 : 0.65,
        ease: 'power2.out',
        clearProps: 'transform,filter,opacity',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });

    mainEl.querySelectorAll('#skills .skill-category, #projects .project-card').forEach((card, i) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: prefersReducedMotion ? 14 : 26,
        scale: prefersReducedMotion ? 1 : 0.985
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: prefersReducedMotion ? 0.35 : 0.55,
        ease: 'power2.out',
        delay: prefersReducedMotion ? 0 : (i % 2) * 0.05,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: card, start: 'top 92%', once: true }
      });
    });

    mainEl.querySelectorAll('.timeline-item').forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, x: prefersReducedMotion ? -10 : -20 }, {
        opacity: 1,
        x: 0,
        duration: prefersReducedMotion ? 0.35 : 0.5,
        ease: 'power2.out',
        delay: prefersReducedMotion ? 0 : i * 0.04,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: item, start: 'top 92%', once: true }
      });
    });

    const aboutCard = mainEl.querySelector('.about-card');
    if (aboutCard) {
      gsap.fromTo(aboutCard, { opacity: 0, x: prefersReducedMotion ? 10 : 20 }, {
        opacity: 1,
        x: 0,
        duration: prefersReducedMotion ? 0.35 : 0.55,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: aboutCard, start: 'top 90%', once: true }
      });
    }

    const contactWrap = mainEl.querySelector('.contact-wrap');
    if (contactWrap) {
      gsap.fromTo(contactWrap.children, { opacity: 0, y: prefersReducedMotion ? 10 : 18 }, {
        opacity: 1,
        y: 0,
        duration: prefersReducedMotion ? 0.35 : 0.5,
        ease: 'power2.out',
        stagger: prefersReducedMotion ? 0.04 : 0.08,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: contactWrap, start: 'top 90%', once: true }
      });
    }

    if (!prefersReducedMotion && isDesktop && supportsHover) {
      let activeCard: HTMLElement | null = null;
      let rafId = 0;
      let nextRotationX = 0;
      let nextRotationY = 0;

      const updateTilt = () => {
        if (!activeCard) {
          rafId = 0;
          return;
        }

        gsap.to(activeCard, {
          rotationY: nextRotationY,
          rotationX: nextRotationX,
          transformPerspective: 900,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        rafId = 0;
      };

      mainEl.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
        card.style.transformStyle = 'preserve-3d';
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;

          activeCard = card;
          nextRotationY = x * 4;
          nextRotationX = -y * 3;

          if (!rafId) rafId = requestAnimationFrame(updateTilt);
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
          activeCard = null;
          if (rafId) cancelAnimationFrame(rafId);
          rafId = 0;
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      });
    }

    const bgCanvas = document.querySelector<HTMLElement>('.bg-wrapper');
    if (bgCanvas && !prefersReducedMotion) {
      gsap.to(bgCanvas, {
        yPercent: isDesktop ? 6 : 4,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        }
      });
    }
  }
</script>

<Cursor />

{#if !introDone}
  <Intro on:done={onIntroDone} />
{/if}

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
    transition: opacity 0.35s ease;
  }

  .app.visible {
    opacity: 1;
  }
</style>
