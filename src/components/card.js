import {openPopupOnClickImage} from './modal';

const cardTemplate = document.getElementById('template-card').content.querySelector('.cards__item');
const containerCards = document.querySelector('.cards__list');

export function createCard(card) {
    const newCard = cardTemplate.cloneNode(true);
    const imgCard = newCard.querySelector('.card__image');
    const namePlaceCard = newCard.querySelector('.card__text');
    const buttonDeleteCard = newCard.querySelector('.card__delete-button');
    const buttonFavorite = newCard.querySelector('.card__favorite-button');

    imgCard.src = card.link;
    imgCard.alt = card.name;
    namePlaceCard.textContent = card.name;

    buttonDeleteCard.addEventListener('click', () => {
        newCard.remove();
    });

    buttonFavorite.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__favorite-button_active');
    });

    imgCard.addEventListener('click', () => {
        openPopupOnClickImage(card)
    });

    return newCard;
}

export function addCard(card) {
    containerCards.prepend(card);
}

export function createInitialCards () {
    const initialCards = [
        {
            name: 'Куала Лумпур',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Сингапур',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Сеул',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Бали',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Бангкок',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Нячанг',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];
    initialCards.forEach((card) => {
        addCard(createCard(card));
    });
}
