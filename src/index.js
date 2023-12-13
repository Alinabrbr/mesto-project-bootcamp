import {enableValidation} from "./components/validate.js";

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.getElementById('edit-profile');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__exit-btn');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#add-card');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__exit-btn');
const formElementAddCard = popupAddCard.querySelector('.popup__form');
const cardTemplate = document.getElementById('template-card').content.querySelector('.cards__item');
const inputNamePlaceCard = document.getElementById('place');
const inputImgCard = document.getElementById('link');
const containerCards = document.querySelector('.cards__list');

const popupOpenedImage = document.getElementById('opened-image');
const openedImage = popupOpenedImage.querySelector('.popup__image');
const openedTitle = popupOpenedImage.querySelector('.popup__title');
const buttonCloseImage = popupOpenedImage.querySelector('.popup__exit-btn');

const popupsOverlay = document.querySelectorAll('.popup');

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

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    addCard(createCard({
        name: inputNamePlaceCard.value,
        link: inputImgCard.value
    }));
    formElementAddCard.reset();
    closePopup(popupAddCard);
}

function createCard(card) {
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

function addCard(card) {
    containerCards.prepend(card);
}

function openPopupOnClickImage(card) {
    openedImage.src = card.link;
    openedImage.alt = card.name;
    openedTitle.textContent = card.name;
    openPopup(popupOpenedImage);
}

function closeByEsc(evt) {
    if (evt.keyCode === 27) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function closePopupOverlay (popup) {
    closePopup(popup);
    popup.removeEventListener('click', closePopupOverlay);
}

formElementEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonEditProfile.addEventListener('click', () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(popupEditProfile)
});

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));
buttonCloseAddCard.addEventListener('click', () => closePopup(popupAddCard));
formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);

buttonCloseImage.addEventListener('click', () => closePopup(popupOpenedImage));


popupsOverlay.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup')) {
            closePopupOverlay(popup);
        }
    });
});

enableValidation();
