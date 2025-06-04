import { data } from "autoprefixer";
import {setLike, deleteLike, deleteCard} from './api.js';

// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;
const currentUserId = '34caf9ec0ccddb418bbbb707';
// @todo: DOM узлы
const placesList = document.querySelector(`.places__list`);


// @todo: Функция создания карточки
function createCard(data, openImage, likeCard, handleDeleteCard) {
  const placeItem = cardTmp.querySelector(`.places__item`).cloneNode(true); // Клонирование темплейта в константу
  const likeButton = placeItem.querySelector('.card__like-button');
  const buttonDeletCard = placeItem.querySelector('.card__delete-button');
  const counterLikes = placeItem.querySelector('.counter__likes');
  const likeDisplay = data.likes.length; //получение лайков для каждой входящей карты (data)
  //выключение кнопки удаления карточки, которую создавал не пользователь сайта(id не совпадает)
  if (data.owner._id !== '34caf9ec0ccddb418bbbb707') {
    buttonDeletCard.setAttribute('style', 'display: none;');
  }
  
  //if (likeDisplay === 0) {
  //  counterLikes.textContent ='';
  //};
  //if (likeDisplay > 0) {
    counterLikes.textContent = likeDisplay;
  //};

  //проверка лайка пользователя
  
  const isLikedByUser = data.likes.some(user => user._id === currentUserId);
  if (isLikedByUser) {
    likeButton.classList.add('card__like-button_is-active');
  }

  //counterLikes.textContent = displayLickes;
  placeItem.querySelector(`.card__title`).textContent = data.name; // передача тайтла карточки в клонированый темплейт
  placeItem.querySelector(`.card__image`).src = data.link; //передача ссылки на картинку в клонированый темплейт

  //работа лайка
  likeButton.addEventListener(`click`, () => likeCard(likeButton, data, counterLikes));
  placeItem.querySelector('.card__image').addEventListener(`click`, () => openImage(data.name, data.link));

  placeItem.querySelector(`.card__delete-button`).addEventListener(`click`, () => handleDeleteCard(placeItem, data));
  
  return placeItem;
};

// @todo: Функция удаления карточки
function handleDeleteCard(item, data){
  
  deleteCard(data._id)
    .then(()=>item.remove())
    .catch(err=>
      console.log(err)
    );
};

// @todo: функция лайка карточки
function likeCard(item, data, counterLike) {
  if (item.classList.contains('card__like-button_is-active')) {
    deleteLike(data._id)
      .then((res) => {
        counterLike.textContent = res.likes.length;
        item.classList.remove('card__like-button_is-active');
      })
      .catch(err =>
        console.error('Ошибка выполнения лайка', err)
      );
  } 
  else {
    setLike(data._id)
      .then((res) => {
        counterLike.textContent = res.likes.length;
        item.classList.add('card__like-button_is-active');
      })
      .catch(err =>
        console.log(err)
      );
    }
};

///////////////////////////////
export {createCard, handleDeleteCard, likeCard, placesList};