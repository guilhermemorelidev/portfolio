<script lang="ts">
  import { personal } from '../lib/data';

  let modalOpen = false;
  let subject = '';
  let message = '';

  function openModal() { modalOpen = true; subject = ''; message = ''; }
  function closeModal() { modalOpen = false; }

  function handleBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) closeModal();
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') closeModal();
  }

  function sendEmail() {
    const sub = encodeURIComponent(subject || 'Contato pelo portfólio');
    const body = encodeURIComponent(message || '');
    window.location.href = `mailto:${personal.email}?subject=${sub}&body=${body}`;
  }
</script>

<svelte:window on:keydown={handleKey} />

<section id="contact" class="section">
  <div class="section-inner">
    <div class="section-label">
      <span class="label-line"></span>
      <span>05 — Contato</span>
    </div>

    <div class="contact-wrap">
      <div class="contact-text">
        <h2 class="section-title">
          Vamos <span class="accent">trabalhar</span><br />juntos?
        </h2>
        <p class="contact-desc">
          Estou aberto a freelas, projetos e oportunidades.
          Me manda uma mensagem — respondo rápido.
        </p>

        <div class="contact-links">
          <button class="contact-link email-link" on:click={openModal}>
            <span class="link-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span>{personal.email}</span>
          </button>

          <a href={personal.github} target="_blank" rel="noopener noreferrer" class="contact-link">
            <span class="link-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </span>
            <span>GitHub</span>
          </a>

          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" class="contact-link">
            <span class="link-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </span>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <div class="contact-cta glass-card">
        <div class="cta-glow" aria-hidden="true"></div>
        <h3 class="cta-heading">Pronto para começar?</h3>
        <p class="cta-sub">Preencha o formulário e eu respondo em breve.</p>
        <button class="cta-main-btn" on:click={openModal}>
          Enviar mensagem
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</section>

{#if modalOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-backdrop" on:click={handleBackdrop} role="dialog" aria-modal="true" aria-label="Formulário de contato" tabindex="-1">
    <div class="modal glass-card">
      <div class="modal-header">
        <h3 class="modal-title">Enviar mensagem</h3>
        <button class="modal-close" on:click={closeModal} aria-label="Fechar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="modal-to">
        <span class="field-label">Para</span>
        <span class="field-value">{personal.email}</span>
      </div>

      <div class="modal-field">
        <label class="field-label" for="subject">Assunto</label>
        <input id="subject" class="field-input" type="text" placeholder="Ex: Proposta de projeto..." bind:value={subject} />
      </div>

      <div class="modal-field">
        <label class="field-label" for="message">Mensagem</label>
        <textarea id="message" class="field-input field-textarea" placeholder="Olá Guilherme, gostaria de..." bind:value={message} rows="5"></textarea>
      </div>

      <div class="modal-actions">
        <button class="btn-cancel" on:click={closeModal}>Cancelar</button>
        <button class="btn-send" on:click={sendEmail}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
          Abrir no e-mail
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .contact-wrap {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 4rem;
    align-items: center;
    margin-top: 3rem;
  }

  .contact-desc {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.75;
    margin: 1.25rem 0 2rem;
    max-width: 400px;
  }

  .contact-links { display: flex; flex-direction: column; gap: 0; }

  .contact-link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: rgba(255,255,255,0.5);
    font-size: 0.875rem;
    font-weight: 400;
    font-family: var(--font-sans);
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: all 0.2s ease;
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
  }

  .contact-link:last-child { border-bottom: none; }
  .contact-link:hover { color: rgba(255,255,255,0.88); padding-left: 4px; }
  .email-link:hover { color: #c4b5fd; }

  .link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px; height: 32px;
    border-radius: 7px;
    background: rgba(139,92,246,0.08);
    border: 1px solid rgba(139,92,246,0.12);
    color: rgba(139,92,246,0.7);
    flex-shrink: 0;
    transition: all 0.2s;
  }

  .contact-link:hover .link-icon {
    background: rgba(139,92,246,0.15);
    border-color: rgba(139,92,246,0.3);
    color: #a78bfa;
  }

  .contact-cta {
    padding: 2.25rem;
    position: relative;
    overflow: hidden;
    text-align: center;
  }

  .cta-glow {
    position: absolute;
    top: -50%; left: 50%;
    transform: translateX(-50%);
    width: 180px; height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%);
    pointer-events: none;
  }

  .cta-heading {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-weight: 400;
    color: #fff;
    margin: 0 0 0.4rem;
    position: relative;
  }

  .cta-sub {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.35);
    margin: 0 0 1.75rem;
    position: relative;
    line-height: 1.5;
  }

  .cta-main-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, rgba(139,92,246,0.3), rgba(99,102,241,0.22));
    border: 1px solid rgba(139,92,246,0.45);
    color: #c4b5fd;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: var(--font-sans);
    padding: 0.8rem 1.6rem;
    border-radius: 9px;
    transition: all 0.22s ease;
    box-shadow: 0 0 20px rgba(139,92,246,0.15);
    cursor: pointer;
    position: relative;
  }

  .cta-main-btn:hover {
    background: linear-gradient(135deg, rgba(139,92,246,0.45), rgba(99,102,241,0.35));
    border-color: rgba(139,92,246,0.75);
    box-shadow: 0 0 32px rgba(139,92,246,0.3);
    transform: translateY(-2px);
  }

  /* Modal */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    animation: fadeIn 0.18s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    width: 100%;
    max-width: 480px;
    padding: 1.75rem;
    animation: slideUp 0.22s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .modal-title {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
    margin: 0;
  }

  .modal-close {
    width: 30px; height: 30px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .modal-close:hover { background: rgba(255,255,255,0.09); color: rgba(255,255,255,0.85); }

  .modal-to {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.9rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .field-label {
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.3);
    white-space: nowrap;
  }

  .field-value {
    font-size: 0.83rem;
    color: rgba(255,255,255,0.55);
    font-family: var(--font-mono);
  }

  .modal-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 0.7rem 0.9rem;
    color: rgba(255,255,255,0.85);
    font-size: 0.875rem;
    font-family: var(--font-sans);
    outline: none;
    transition: border-color 0.2s;
    resize: none;
  }

  .field-input::placeholder { color: rgba(255,255,255,0.22); }
  .field-input:focus { border-color: rgba(139,92,246,0.45); background: rgba(139,92,246,0.04); }
  .field-textarea { line-height: 1.6; }

  .modal-actions {
    display: flex;
    gap: 0.6rem;
    justify-content: flex-end;
    margin-top: 1.25rem;
  }

  .btn-cancel {
    padding: 0.6rem 1.1rem;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.45);
    font-size: 0.83rem;
    font-family: var(--font-sans);
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-cancel:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.75); }

  .btn-send {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.6rem 1.25rem;
    border-radius: 7px;
    border: 1px solid rgba(139,92,246,0.45);
    background: rgba(139,92,246,0.15);
    color: #c4b5fd;
    font-size: 0.83rem;
    font-weight: 500;
    font-family: var(--font-sans);
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-send:hover { background: rgba(139,92,246,0.28); border-color: rgba(139,92,246,0.7); color: #fff; }

  @media (max-width: 900px) {
    .contact-wrap { grid-template-columns: 1fr; gap: 2.5rem; }
    .contact-desc { max-width: 100%; }
  }
</style>
