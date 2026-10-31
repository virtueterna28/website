function showTime() {
  const clock = document.getElementById('currentTime');
  if (clock) clock.textContent = new Date().toUTCString();
}

showTime();
setInterval(showTime, 1000);

(function addRoyalMessageWidget() {
  const messages = [
    'Kebajikan yang dijaga hari ini menjadi warisan yang abadi.',
    'Persatuan adalah mahkota yang membuat setiap langkah lebih kuat.',
    'Pemimpin sejati menerangi jalan dengan ilmu dan keteladanan.',
    'Terus melangkah dengan ikhtiar, adab, dan hati yang teguh.',
    'Satu angkatan, satu ikatan, sejuta kenangan berharga.'
  ];

  function init() {
    if (document.getElementById('royal-message-widget')) return;

    const style = document.createElement('style');
    style.textContent = `
      .royal-widget { position: fixed; right: 20px; bottom: 78px; z-index: 44; font-family: inherit; }
      .royal-widget-toggle, .royal-widget-panel { color: #fff3c4; border: 1px solid #e0bf72; background: linear-gradient(135deg, #19264f, #49371b); box-shadow: 0 8px 24px #07113f66, inset 0 0 12px #e0bf7222; }
      .royal-widget-toggle { min-height: 44px; padding: 0 15px; border-radius: 999px; font-weight: 800; cursor: pointer; transition: transform .25s ease, box-shadow .25s ease; }
      .royal-widget-toggle:hover { transform: translateY(-3px); box-shadow: 0 10px 28px #07113f88, 0 0 18px #e0bf7277; }
      .royal-widget-panel { position: absolute; right: 0; bottom: 56px; width: min(330px, calc(100vw - 32px)); padding: 19px; border-radius: 17px; opacity: 0; visibility: hidden; transform: translateY(10px) scale(.97); transform-origin: bottom right; transition: opacity .25s ease, transform .25s ease, visibility .25s ease; }
      .royal-widget.open .royal-widget-panel { opacity: 1; visibility: visible; transform: none; }
      .royal-widget-heading { margin: 0 32px 12px 0; color: #f6d993; font-family: Georgia, serif; font-size: 1.1rem; }
      .royal-widget-message { min-height: 66px; margin: 0 0 15px; color: #f5edda; font-size: .92rem; line-height: 1.6; }
      .royal-widget-actions { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
      .royal-widget-next, .royal-widget-close { border: 1px solid #e0bf72; color: #fff3c4; background: #ffffff12; cursor: pointer; }
      .royal-widget-next { padding: 9px 12px; border-radius: 9px; font-size: .8rem; font-weight: 800; }
      .royal-widget-close { position: absolute; top: 11px; right: 11px; width: 30px; height: 30px; border-radius: 50%; font-size: 1.1rem; }
      .royal-widget-next:hover, .royal-widget-close:hover { background: #806126; }
      .royal-widget-toggle:focus-visible, .royal-widget-panel button:focus-visible { outline: 2px solid #fff3c4; outline-offset: 3px; }
      @media (max-width: 800px) { .royal-widget { right: 14px; bottom: 72px; } }
      @media (prefers-reduced-motion: reduce) { .royal-widget-toggle, .royal-widget-panel { transition: none; } }
    `;
    document.head.appendChild(style);

    const widget = document.createElement('aside');
    widget.className = 'royal-widget';
    widget.id = 'royal-message-widget';
    widget.innerHTML = `
      <section class="royal-widget-panel" id="royalWidgetPanel" aria-label="Pesan inspirasi Veterna" aria-hidden="true">
        <button class="royal-widget-close" type="button" aria-label="Tutup pesan">×</button>
        <h2 class="royal-widget-heading">✦ Pesan Istana</h2>
        <p class="royal-widget-message" aria-live="polite"></p>
        <div class="royal-widget-actions">
          <span aria-hidden="true">♛ ✧</span>
          <button class="royal-widget-next" type="button">Pesan berikutnya →</button>
        </div>
      </section>
      <button class="royal-widget-toggle" type="button" aria-expanded="false" aria-controls="royalWidgetPanel">♛ Pesan Istana</button>
    `;
    document.body.appendChild(widget);

    const panel = widget.querySelector('.royal-widget-panel');
    const toggle = widget.querySelector('.royal-widget-toggle');
    const message = widget.querySelector('.royal-widget-message');
    let messageIndex = Math.floor(Math.random() * messages.length);
    message.textContent = messages[messageIndex];

    function setOpen(open) {
      widget.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
    }

    toggle.addEventListener('click', () => setOpen(!widget.classList.contains('open')));
    widget.querySelector('.royal-widget-close').addEventListener('click', () => setOpen(false));
    widget.querySelector('.royal-widget-next').addEventListener('click', () => {
      messageIndex = (messageIndex + 1) % messages.length;
      message.textContent = messages[messageIndex];
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

(function addRoyalImageInteraction() {
  function init() {
    if (document.getElementById('royal-image-overlay')) return;

    const style = document.createElement('style');
    style.textContent = `
      .royal-image-overlay { position: fixed; inset: 0; z-index: 150; display: grid; place-items: center; padding: 20px; background: #070d23dc; opacity: 0; visibility: hidden; transition: opacity .3s ease, visibility .3s ease; }
      .royal-image-overlay.is-open { opacity: 1; visibility: visible; }
      .royal-image-card { position: relative; width: min(560px, 100%); padding: 22px; border: 1px solid #e0bf72; border-radius: 20px; color: #fff3c4; text-align: center; background: radial-gradient(circle at top, #49371b, #19264f 62%); box-shadow: 0 20px 70px #0009, inset 0 0 24px #e0bf7222; transform: translateY(18px) scale(.96); transition: transform .35s cubic-bezier(.2,.8,.2,1); }
      .royal-image-overlay.is-open .royal-image-card { transform: none; }
      .royal-image-title { margin: 0 40px 15px; color: #f6d993; font: 700 1.35rem Georgia, serif; }
      .royal-image-preview { display: block; width: 100%; max-height: 58vh; object-fit: contain; border: 1px solid #e0bf72; border-radius: 12px; background: #0b122b; }
      .royal-image-caption { margin: 13px 0 0; color: #f5edda; line-height: 1.5; }
      .royal-image-close { position: absolute; top: 12px; right: 12px; width: 36px; height: 36px; border: 1px solid #e0bf72; border-radius: 50%; color: #fff3c4; background: #ffffff12; font-size: 1.2rem; cursor: pointer; }
      .royal-image-close:hover, .royal-image-close:focus-visible { background: #806126; outline: 2px solid #fff3c4; outline-offset: 2px; }
      @media (prefers-reduced-motion: reduce) { .royal-image-overlay, .royal-image-card { transition: none; } }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'royal-image-overlay';
    overlay.id = 'royal-image-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-label', 'Elemen kerajaan untuk gambar');
    overlay.innerHTML = `
      <section class="royal-image-card">
        <button class="royal-image-close" type="button" aria-label="Tutup elemen kerajaan">×</button>
        <h2 class="royal-image-title">♛ Titah Kerajaan ♛</h2>
        <img class="royal-image-preview" alt="">
        <p class="royal-image-caption"></p>
      </section>
    `;
    document.body.appendChild(overlay);

    const preview = overlay.querySelector('.royal-image-preview');
    const caption = overlay.querySelector('.royal-image-caption');
    const closeButton = overlay.querySelector('.royal-image-close');
    let previousFocus = null;

    function closeOverlay() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    }

    document.addEventListener('click', (event) => {
      const image = event.target.closest('img');
      if (!image || image.closest('a, #lightbox, #royal-image-overlay')) return;

      event.preventDefault();
      event.stopPropagation();
      previousFocus = image;
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt || 'Gambar Veterna';
      caption.textContent = image.alt || 'Kenangan indah bersama Veterna';
      overlay.setAttribute('aria-hidden', 'false');
      overlay.classList.add('is-open');
      closeButton.focus();
    }, true);

    closeButton.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeOverlay();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('is-open')) closeOverlay();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
