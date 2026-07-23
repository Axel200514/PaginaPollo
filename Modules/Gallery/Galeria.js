// Script is placed at the end of the body, so it runs synchronously and instantly.

const galleryContainer = document.getElementById('gallery-container');
const galleryTemplate = document.getElementById('gallery-card-template');

if (galleryContainer && galleryTemplate) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <button class="image-lightbox-close" aria-label="Cerrar">&times;</button>
        <img src="" alt="Imagen ampliada">
        <h3 class="gallery-title image-lightbox-title"></h3>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxTitle = lightbox.querySelector('.image-lightbox-title');
    
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx;
    function playProfessionalClick() {
        if (!audioCtx) audioCtx = new AudioCtx();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.classList.remove('lightbox-open');
        document.documentElement.classList.remove('lightbox-open');
    };

    lightbox.querySelector('.image-lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Se agrega timestamp para evitar que el navegador guarde una versión vieja en caché
    fetch(`galeria.json?t=${new Date().getTime()}`)
        .then(response => response.json())
        .then(data => {
            const galleryData = data.aves || [];
            const fragment = document.createDocumentFragment();
            galleryData.forEach((item, index) => {
                const clone = galleryTemplate.content.cloneNode(true);
                const card = clone.querySelector('.gallery-card');
                const img = clone.querySelector('.gallery-img');
                
                // Agregar animación shimmer mientras carga la imagen de 1MB
                card.classList.add('skeleton-loading');
                
                img.src = item.src;
                img.alt = item.alt || item.title;
                img.decoding = 'async'; // Decodificación fuera del hilo principal
                
                if (index < 5) {
                    img.setAttribute('fetchpriority', 'high'); // Prioridad alta para las visibles
                } else {
                    img.loading = 'lazy';
                }
                
                // Cuando la imagen descargue por completo, remover shimmer y mostrar imagen
                img.onload = () => {
                    img.classList.add('loaded');
                    card.classList.remove('skeleton-loading');
                };
                
                clone.querySelector('.gallery-title').textContent = item.title;
                
                card.addEventListener('click', () => {
                    playProfessionalClick();
                    lightboxImg.src = item.src;
                    lightboxImg.alt = item.alt || item.title;
                    lightboxTitle.textContent = item.title;
                    
                    // Detectar si la imagen es vertical (ratio 9:16 por ejemplo)
                    if (img.naturalHeight > img.naturalWidth) {
                        lightbox.classList.add('portrait-mode');
                    } else {
                        lightbox.classList.remove('portrait-mode');
                    }
                    
                    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                    document.body.style.paddingRight = `${scrollbarWidth}px`;
                    document.body.style.overflow = 'hidden';
                    document.body.classList.add('lightbox-open');
                    document.documentElement.classList.add('lightbox-open');
                    lightbox.classList.add('active');
                });
                fragment.appendChild(clone);
            });

            galleryContainer.appendChild(fragment);
        })
        .catch(error => console.error("Error loading gallery data:", error));
}

const contactModal = document.getElementById('contactModal');
const openBtns = document.querySelectorAll('.open-modal');
const closeBtn = document.querySelector('.close-modal');

if (contactModal && closeBtn) {
    const openContactModal = () => {
        if (document.activeElement) document.activeElement.blur();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    };
    const closeContactModal = () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
    };
    openBtns.forEach(btn => btn.addEventListener('click', openContactModal));
    closeBtn.addEventListener('click', closeContactModal);
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    const socialBtns = document.querySelectorAll('.social-btn');
    const WHATSAPP_NUMBER = atob('NTc0MzQxMDY='); 
    const MESSENGER_USERNAME = "TU_PAGINA_O_USUARIO_MESSENGER"; 
    const INSTAGRAM_USERNAME = "TU_USUARIO_INSTAGRAM"; 
    const DEFAULT_MESSAGE = "Hola, me interesan los pollos Brahma";
    const ENCODED_MSG = encodeURIComponent(DEFAULT_MESSAGE);

    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const network = btn.getAttribute('data-network');
            let redirectUrl = '';
            if (network === 'WhatsApp') {
                redirectUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${ENCODED_MSG}`;
            } else if (network === 'Messenger') {
                redirectUrl = `https://m.me/${MESSENGER_USERNAME}?text=${ENCODED_MSG}`;
            } else if (network === 'Instagram') {
                redirectUrl = `https://ig.me/m/${INSTAGRAM_USERNAME}`;
            }
            if (redirectUrl) {
                window.open(redirectUrl, '_blank');
                closeContactModal();
            }
        });
    });
}
