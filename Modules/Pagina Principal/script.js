document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
    const modal = document.getElementById('contactModal');
    const openBtns = document.querySelectorAll('.open-modal');
    const closeBtn = document.querySelector('.close-modal');
    const openModal = () => {
        if (document.activeElement) {
            document.activeElement.blur(); 
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
        document.body.classList.add('modal-open');
    };
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
    };
    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
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
                closeModal();
            }
        });
    });
});
