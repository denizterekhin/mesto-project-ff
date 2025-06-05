// @todo: Импорт
import './pages/index.css'; // добавьте импорт главного файла стилей 
import {createCard, placesList, likeCard, handleDeleteCard} from './components/card.js';
//import { initialCards } from './components/cards.js';
import { adPopupCloseListeners, openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation} from './components/validation.js';
import { getInitialCards, getProfile, editingProfile, addCards, editingAvatar} from './components/api.js';
import { data } from 'autoprefixer';

// DOM узлы
const popupEditUser = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar');

const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const buttonSubmitButton = document.querySelector('.popup__button');

const NamePopupImage = popupImage.querySelector('.popup__caption');
const LinkPopupImage = popupImage.querySelector('.popup__image');
// Кнопки открития popup
const openPopupProfil = document.querySelector('.profile__edit-button');
const openPopupNewCard = document.querySelector('.profile__add-button');
const openPopupAvatarProfile = document.querySelector('.profile__image');


// Находим форму в DOM
const formProfile = document.forms[`edit-profile`];
const formCard = document.forms[`new-place`];
const formAvatarProfile = document.forms[`edit-avatar`];
// Находим поля формы в DOM
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');

const nameCardInput = formCard.querySelector('.popup__input_type_card-name');
const urlCardInput = formCard.querySelector('.popup__input_type_url');

const urlAvatarProfile = formAvatarProfile.querySelector('.popup__input_type_url');


// @todo: функция вставки карточки на страницу
function renderCard(card){
  placesList.append(card);
};

//Получение элементов профиля (имя, занятие)
const formProfileNameInput = formProfile.elements.name__input;
const formProfileJobInput = formProfile.elements.description__input;

//переменная с id профиля
export let currentUserId;


// откритие popup
openPopupProfil.addEventListener('click', () => openModal(popupEditUser));
openPopupNewCard.addEventListener('click', () => openModal(popupAddCard));
openPopupAvatarProfile.addEventListener('click', () => openModal(popupAvatar));

// @todo: функция вставки данных карточки в popup элемент и открытие модального окна для рассмотрения картинок
function openImage (name, link) {
  openModal(popupImage);
  NamePopupImage.textContent = name;
  LinkPopupImage.src = link;
  LinkPopupImage.alt = name;
}

//слушатели закрития popup
adPopupCloseListeners(popupEditUser);
adPopupCloseListeners(popupAddCard);
adPopupCloseListeners(popupImage);
adPopupCloseListeners(popupAvatar);

//функция редактирования аватарки
function submitFormAvatar (evt){
  evt.preventDefault();
  buttonSubmitButton.textContent = 'Сохранение...';
  editingAvatar(urlAvatarProfile.value)
      .then((data)=>{
          renderProfile(data);
          evt.target.reset();
          closeModal(popupAvatar);
      })
      .catch((err)=>{
          console.log(`Ошибка при изменении аватарки: ${err}`);
      })
      .finally(() => {
          buttonSubmitButton.textContent = 'Создать';
      });
  
}

// Обработчик «отправки» формы
function handleProfileSubmit(evt) {
  evt.preventDefault();
  buttonSubmitButton.textContent = 'Сохранение...';
  editingProfile(formProfileNameInput.value, formProfileJobInput.value)
    .then(()=>{
        profileTitle.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;
        closeModal(popupEditUser);
    })
    .catch(err => console.log(err))
    
    .finally(() => {
        buttonSubmitButton.textContent = 'Сохранить'
  });    
}
  
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', handleProfileSubmit);
formAvatarProfile.addEventListener('submit', submitFormAvatar);
formCard.addEventListener('submit', handleCardSubmit);

// открытие окна редактирования профиля
openPopupProfil.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEditUser);
  clearValidation(formProfile, validationConfig);
});

//функция добавление новой карточи
function handleCardSubmit(evt) {
  evt.preventDefault();
  buttonSubmitButton.textContent = 'Сохранение...';
  addCards(nameCardInput.value,urlCardInput.value)
      .then((data)=>{
          placesList.prepend(createCard(data, openImage, likeCard, handleDeleteCard)); // добавление карточки в начало списка методом prepend
          evt.target.reset();
          closeModal(popupAddCard);
      })
      .catch((err)=>{
          console.log(`Ошибка при добавлении карточки: ${err}`);
      })
      .finally(() => {
          buttonSubmitButton.textContent = 'Создать';
      });
  clearValidation(formCard, validationConfig);
}


/////////////Работа с API(запросы и ответы сервера)////////////////
function renderProfile ({name, about, avatar,}) {
  profileTitle.textContent = name;
  profileJob.textContent = about;
  profileAvatar.src = avatar;
}

Promise.all([getProfile(), getInitialCards()])
  .then(([user, cards]) => {
    renderProfile(user);
    currentUserId = user._id;
    console.log(currentUserId);
    console.log(user);
    // Вывести карточки на страницу
    console.log(cards);
    cards.forEach((card) => {
    renderCard(createCard(card, openImage, likeCard, handleDeleteCard));
    });
  })
  .catch((error) => {
    console.error('Ошибка при загрузке:', error);
  });

//////////////////////////////
// Настройки валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Валидация форм
enableValidation(validationConfig);

