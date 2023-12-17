import {addCard, createCard} from './card';
import {enableValidation} from "./validate.js";
import {popupOpenedImage, nameProfile, jobProfile, nameInput, jobInput, popupEditProfile, formElementAddCard, popupAddCard} from "./utils";

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

export function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

export function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    addCard(createCard({
        name: inputNamePlaceCard.value,
        link: inputImgCard.value
    }));
    formElementAddCard.reset();
    closePopup(popupAddCard);
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

function closePopupOverlay (popup) {
    closePopup(popup);
}

const popupsOverlay = document.querySelectorAll('.popup');
popupsOverlay.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup')) {
            closePopupOverlay(popup);
        }
    });
});