import {openPopupOnClickImage} from './modal.js';
import {deleteCard, deleteFavoriteButton, putFavoriteButton} from './api.js';

const cardTemplate = document.getElementById('template-card').content.querySelector('.cards__item');
const containerCards = document.querySelector('.cards__list');

export function createCard(card, userId) {
    const newCard = cardTemplate.cloneNode(true);
    const imgCard = newCard.querySelector('.card__image');
    const namePlaceCard = newCard.querySelector('.card__text');
    const buttonDeleteCard = newCard.querySelector('.card__delete-button');
    const buttonFavorite = newCard.querySelector('.card__favorite-button');
    const likesCounter = newCard.querySelector('.card__favorite-counter');

    imgCard.src = card.link;
    imgCard.alt = card.name;
    namePlaceCard.textContent = card.name;

    if (card.likes.some((item) => item._id === userId)) {
        buttonFavorite.classList.add('card__favorite-button_active');
    }

    buttonFavorite.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('card__favorite-button_active')) {
            deleteFavoriteButton(card._id)
                .then((res) => {
                    evt.target.classList.remove('card__favorite-button_active');
                    likesCounter.textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })

            return
        }

        putFavoriteButton(card._id)
            .then((res) => {
                evt.target.classList.add('card__favorite-button_active');
                likesCounter.textContent = res.likes.length;
            })
            .catch((err) => {
                console.log(err);
            })
    });

    if (card.owner._id !== userId) {
        buttonDeleteCard.remove()
    }

    buttonDeleteCard.addEventListener('click', () => {
        deleteCard(card._id)
            .then(() => {
                newCard.remove();
            })
            .catch((err) => {
                console.log(err);
            })
    });

    likesCounter.textContent = card.likes.length;

    imgCard.addEventListener('click', () => {
        openPopupOnClickImage(card)
    });

    return newCard;
}

export function addCard(card) {
    containerCards.prepend(card);
}

export function createInitialCards(cards, userId) {
    cards.reverse().forEach((card) => {
        addCard(createCard(card, userId));
    });
}

