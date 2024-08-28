document.addEventListener('DOMContentLoaded', () => {
    const modalTrigger = document.querySelector('.js-modal-trigger');
    const modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);

    modalTrigger.addEventListener('click', async () => {
        try {
            const response = await fetch('TaskCard.html');
            const modalHTML = await response.text();
            modalContainer.innerHTML = modalHTML;

            const modal = modalContainer.querySelector('.modal');
            modal.classList.add('is-active');

            const closeModalButtons = modal.querySelectorAll('.modal-close, .modal-background');
            closeModalButtons.forEach(button => {
                button.addEventListener('click', () => {
                    modal.classList.remove('is-active');
                });
            });
        } catch (error) {
            console.error('Error al cargar el modal:', error);
        }
    });
});
