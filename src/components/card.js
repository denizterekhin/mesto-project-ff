
export {createCard, handleDeleteCard, renderCard, likeCard, openImage, placesList};
// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector(`.places__list`);

// @todo: Функция создания карточки
function createCard(data, openImage, likeCard) {
  const placeItem = cardTmp.querySelector(`.places__item`).cloneNode(true); // Клонирование темплейта в константу
  const likeButton = placeItem.querySelector('.card__like-button');

  placeItem.querySelector(`.card__title`).textContent = data.name; // передача тайтла карточки в клонированый темплейт
  placeItem.querySelector(`.card__image`).src = data.link; //передача ссылки на картинку в клонированый темплейт

  placeItem.querySelector('.card__like-button').addEventListener(`click`, () => likeCard(likeButton));
  placeItem.querySelector('.card__image').addEventListener(`click`, () => openImage(data.name, data.link));

  placeItem.querySelector(`.card__delete-button`).addEventListener(`click`, () => handleDeleteCard(placeItem));
  
  return placeItem;
};

// @todo: Функция удаления карточки
function handleDeleteCard(item){
  item.remove();
};

// @todo: функция вставки карточки на страницу
function renderCard(card){
  placesList.append(card);
};

// @todo: функция лайка карточки
function likeCard(item) {
  item.classList.toggle('card__like-button_is-active');
};

// @todo: функция вставки данных карточки в popup элемент для рассмотрения картинок
function openImage (name, link) {
  document.querySelector('.popup__caption').textContent = name;
  document.querySelector('.popup__image').src = link;
}