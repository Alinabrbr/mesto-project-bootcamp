import {openPopupOnClickImage} from './modal.js';
import {deleteCard, deleteFavoriteButton, getInitialCards, putFavoriteButton} from './api.js';

const cardTemplate = document.getElementById('template-card').content.querySelector('.cards__item');
const containerCards = document.querySelector('.cards__list');
const userID = 'e5f6768b39a8d75be758ba67';

export function createCard(card) {
    const newCard = cardTemplate.cloneNode(true);
    const imgCard = newCard.querySelector('.card__image');
    const namePlaceCard = newCard.querySelector('.card__text');
    const buttonDeleteCard = newCard.querySelector('.card__delete-button');
    const buttonFavorite = newCard.querySelector('.card__favorite-button');
    const likesCounter = newCard.querySelector('.card__favorite-counter');

    imgCard.src = card.link;
    imgCard.alt = card.name;
    namePlaceCard.textContent = card.name;

    if (card.likes.some((item) => item._id === userID)) {
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

    if (card.owner._id !== userID) {
        buttonDeleteCard.remove()
    }

    buttonDeleteCard.addEventListener('click', () => {
        console.log(card._id);
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

export function createInitialCards() {
    getInitialCards()
        .then((data) => {
            data.reverse().forEach((card) => {
                addCard(createCard(card));
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

