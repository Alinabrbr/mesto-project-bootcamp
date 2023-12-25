import {addCard, createCard} from './card.js';
import {enableValidation} from './validate.js';
import {
    popupOpenedImage,
    nameProfile,
    jobProfile,
    nameInput,
    jobInput,
    popupEditProfile,
    formElementAddCard,
    popupAddCard,
    avatarProfile
} from './utils.js';
import {getInitialProfile, postCreatedCard, postEditProfileInfo} from './api.js';

const inputNamePlaceCard = document.getElementById('place');
const inputImgCard = document.getElementById('link');
const openedImage = popupOpenedImage.querySelector('.popup__image');
const openedTitle = popupOpenedImage.querySelector('.popup__title');

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    enableValidation();
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

export function createInitialProfile() {
    getInitialProfile()
        .then((data) => {
            nameProfile.textContent = data.name;
            jobProfile.textContent = data.about;
            avatarProfile.src = data.avatar;
            closePopup(popupEditProfile);
        })
        .catch((err) => {
            console.log(err);
        })
}

export function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    postEditProfileInfo(nameInput.value, jobInput.value)
        .then((data) => {
            nameProfile.textContent = data.name;
            jobProfile.textContent = data.about;
            closePopup(popupEditProfile);
        })
        .catch((err) => {
            console.log(err);
        })
}

export function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    postCreatedCard(inputNamePlaceCard.value, inputImgCard.value)
        .then((res) => {
            addCard(createCard(res));
            formElementAddCard.reset();
            closePopup(popupAddCard);
        })
        .catch((err) => {
            console.log(err);
        })
}

export function openPopupOnClickImage(card) {
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

function closePopupOverlay(popup) {
    closePopup(popup);
}

const popupsOverlay = document.querySelectorAll('.popup');
popupsOverlay.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopupOverlay(popup);
        }
    });
});