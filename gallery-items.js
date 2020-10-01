import gallery from './export.js';

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  lightboxRef: document.querySelector('.lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  modalImg: document.querySelector('.lightbox__image'),
};
const markup = gallery.map(createGalleryItemsMarkup).join(' ');

refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
refs.galleryContainer.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.lightboxOverlay.addEventListener('click', onCloseLightboxClick);

function createGalleryItemsMarkup({ preview, original, description }) {
  return `
   <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
}

function onOpenModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  refs.lightboxRef.classList.add('is-open');

  window.addEventListener('keydown', onEscKeyPress);

  refs.modalImg.src = evt.target.dataset.source;
  refs.modalImg.alt = evt.target.alt;
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.lightboxRef.classList.remove('is-open');
  refs.modalImg.src = '';
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }
}
function onCloseLightboxClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}
