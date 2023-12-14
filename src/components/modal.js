import {addCard, createCard} from './card';
const nameProfile = document.querySelector('.profile__title');
const nameInput = document.getElementById('name');
const jobProfile = document.querySelector('.profile__subtitle');
const jobInput = document.getElementById('job');
const popupEditProfile = document.getElementById('edit-profile');
const inputNamePlaceCard = document.getElementById('place');
const inputImgCard = document.getElementById('link');
const popupOpenedImage = document.getElementById('opened-image');
const openedImage = popupOpenedImage.querySelector('.popup__image');
const openedTitle = popupOpenedImage.querySelector('.popup__title');
const popupAddCard = document.querySelector('#add-card');
const formElementAddCard = popupAddCard.querySelector('.popup__form');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__exit-btn');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');

const buttonCloseAddCard = popupAddCard.querySelector('.popup__exit-btn');
const buttonCloseImage = popupOpenedImage.querySelector('.popup__exit-btn');

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
    popup.removeEventListener('click', closePopupOverlay);
}

const popupsOverlay = document.querySelectorAll('.popup');
popupsOverlay.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup')) {
            closePopupOverlay(popup);
        }
    });
});