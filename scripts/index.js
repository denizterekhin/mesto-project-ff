// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector(`.places__list`);
const deletButton = document.querySelector('.card__delete-button');

// @todo: Функция создания карточки
function createCard(data) {
  const placeItem = cardTmp.querySelector(`.places__item`).cloneNode(true); // Клонирование темплейта в константу
  placeItem.querySelector(`.card__title`).textContent = data.name; // передача тайтла карточки в клонированый темплейт
  placeItem.querySelector(`.card__image`).src = data.link; //передача ссылки на картинку в клонированый темплейт

  placeItem.querySelector(`.card__delete-button`).addEventListener(`click`, () => handleDeleteCard(placeItem));


  return placeItem;
}

// @todo: Функция удаления карточки
function handleDeleteCard(item){
  item.remove();
}

// @todo: функция вставки карточки на страницу
function renderCard(card){
  placesList.append(card);
}


// @todo: Вывести карточки на страницу
 initialCards.forEach((card) => {
  renderCard(createCard(card))
 });