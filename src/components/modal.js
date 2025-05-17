export {openModal, closeModal, closePopupButton};
/////////////////////////////////////////

const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popup);
  }
};

const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};

const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

const closePopupButton = (elementPopup) => {
  elementPopup.querySelector('.popup__close').addEventListener('click', () => { //функция закрития по крестику
    closeModal(elementPopup);
  });
  elementPopup.addEventListener('mousedown', (event) => { //функция закрития попапа по оферлею
    if (event.target.classList.contains('popup')) {
      closeModal(elementPopup);
    }
  });
};




