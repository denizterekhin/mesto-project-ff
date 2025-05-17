// @todo: Импорт
import './pages/index.css'; // добавьте импорт главного файла стилей 
import {createCard, renderCard, placesList, likeCard, openImage} from './components/card.js';
import { initialCards } from './components/cards.js';
import { closePopupButton, openModal, closeModal } from './components/modal.js';
import { data } from 'autoprefixer';

// DOM узлы
const popupEditUser = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Кнопки открития popup
const openPopupProfil = document.querySelector('.profile__edit-button');
const openPopupNewCard = document.querySelector('.profile__add-button');

// Находим форму в DOM
const formProfile = document.forms[`edit-profile`];
const formCard = document.forms[`new-place`];
// Находим поля формы в DOM
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const nameCardInput = formCard.querySelector('.popup__input_type_card-name');
const urlCardInput = formCard.querySelector('.popup__input_type_url');

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  renderCard(createCard(card, openImage, likeCard));
});

// откритие popup
openPopupProfil.addEventListener('click', () => openModal(popupEditUser));
openPopupNewCard.addEventListener('click', () => openModal(popupAddCard));

addEventListener('click', (event) => { //функция открытия popup по клику картинки
    if (event.target.classList.contains('card__image')) {
      openModal(popupImage);
    }
  });

//слушатели закрития popup
closePopupButton(popupEditUser);
closePopupButton(popupAddCard);
closePopupButton(popupImage);

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileTitle.textContent = nameValue;
    profileJob.textContent = jobValue;
    closeModal(popupEditUser);
}
  
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', handleFormSubmit);

// открытие окна редактирования профиля
openPopupProfil.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;

  openModal(popupEditUser);
});

//функция добавление новой карточи
function handleCardSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const nameCardValue = nameCardInput.value;
    const urlCardValue = urlCardInput.value;
    initialCards.unshift({name: nameCardValue, link: urlCardValue}); //добавляем в начало масива элемент со значениями из формы
    
    placesList.prepend(createCard(initialCards[0], openImage, likeCard)); // добавление карточки в начало списка методом prepend
    formCard.reset();
    closeModal(popupAddCard);

}
formCard.addEventListener('submit', handleCardSubmit);
