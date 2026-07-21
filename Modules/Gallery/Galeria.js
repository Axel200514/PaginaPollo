document.addEventListener('DOMContentLoaded', () => {
    const galleryData = [
        { src: '../../Styles/Images/brahma_gallery_1_1784650464594.jpg', alt: 'Brahma Blanco y Negro', title: 'Brahma Blanco' },
        { src: '../../Styles/Images/brahma_gallery_2_1784650474191.jpg', alt: 'Brahma Buff', title: 'Brahma Buff' },
        { src: '../../Styles/Images/brahma_gallery_3_1784650484467.jpg', alt: 'Brahma Oscuro', title: 'Brahma Oscuro' },
        { src: '../../Styles/Images/brahma_gallery_1_1784650464594.jpg', alt: 'Brahma Blanco', title: 'Blanco Joven' },
        { src: '../../Styles/Images/brahma_gallery_2_1784650474191.jpg', alt: 'Brahma Buff', title: 'Buff Premium' },
        { src: '../../Styles/Images/brahma_gallery_3_1784650484467.jpg', alt: 'Brahma Oscuro', title: 'Oscuro Majestuoso' },
        { src: '../../Styles/Images/brahma_gallery_1_1784650464594.jpg', alt: 'Brahma Blanco', title: 'Blanco Imperial' },
        { src: '../../Styles/Images/brahma_gallery_2_1784650474191.jpg', alt: 'Brahma Buff', title: 'Buff Especial' },
        { src: '../../Styles/Images/brahma_gallery_3_1784650484467.jpg', alt: 'Brahma Oscuro', title: 'Oscuro Rey' }
    ];
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
        };
        lightbox.querySelector('.image-lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        const fragment = document.createDocumentFragment();
        galleryData.forEach((item, index) => {
            const clone = galleryTemplate.content.cloneNode(true);
            const img = clone.querySelector('.gallery-img');
            img.src = item.src;
            img.alt = item.alt;
            if (index >= 5) {
                img.loading = 'lazy';
            }
            clone.querySelector('.gallery-title').textContent = item.title;
            const card = clone.querySelector('.gallery-card');
            card.addEventListener('click', () => {
                playProfessionalClick();
                lightboxImg.src = item.src;
                lightboxImg.alt = item.alt;
                lightboxTitle.textContent = item.title;
                document.body.style.overflow = 'hidden';
                lightbox.classList.add('active');
            });
            fragment.appendChild(clone);
        });
        galleryContainer.appendChild(fragment);
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
});
