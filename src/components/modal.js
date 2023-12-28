import {addCard, createCard} from './card.js';

import {
    popupOpenedImage,
    nameProfile,
    jobProfile,
    nameInput,
    jobInput,
    popupEditProfile,
    formElementAddCard,
    popupAddCard,
    avatarProfile,
    popupEditAvatar,
} from './constants.js';

import {patchEditAvatar, postCreatedCard, postEditProfileInfo} from './api.js';

import {disableButton} from './validate.js';

import {userId} from '../index.js';

const inputNamePlaceCard = document.getElementById('place');
const inputImgCard = document.getElementById('link');
const openedImage = popupOpenedImage.querySelector('.popup__image');
const openedTitle = popupOpenedImage.querySelector('.popup__title');
const inputLinkAvatar = document.getElementById('link-avatar');

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

export function createInitialProfile(data) {
    nameProfile.textContent = data.name;
    jobProfile.textContent = data.about;
    avatarProfile.src = data.avatar;
}

export function handleEditProfileFormSubmit(evt) {
    evt.submitter.textContent = "Сохранение...";
    evt.preventDefault();
    postEditProfileInfo(nameInput.value, jobInput.value)
        .then((data) => {
            nameProfile.textContent = data.name;
            jobProfile.textContent = data.about;
            closePopup(popupEditProfile);
        })
        .catch(console.error)
        .finally(() => {
            evt.submitter.textContent = "Сохранить";
        });
}

export function handleEditAvatarFormSubmit(evt) {
    evt.submitter.textContent = "Сохранение..."
    evt.preventDefault();
    console.log(avatarProfile);
    console.log(evt);
    patchEditAvatar(inputLinkAvatar.value)
        .then((res) => {
            avatarProfile.src = res.avatar;
            closePopup(popupEditAvatar);
        })
        .catch(console.error)
        .finally(() => {
            evt.submitter.textContent = "Сохранить";
    });
}

export function handleAddCardFormSubmit(evt) {
    evt.submitter.textContent = "Создание...";
    evt.preventDefault();
    postCreatedCard(inputNamePlaceCard.value, inputImgCard.value)
        .then((res) => {
            addCard(createCard(res, userId));
            formElementAddCard.reset();
            disableButton(evt.submitter);
            closePopup(popupAddCard);
        })
        .catch(console.error)
        .finally(() => {
            evt.submitter.textContent = "Создать";
        });
}

export function openPopupOnClickImage(card) {
    openedImage.src = card.link;
    openedImage.alt = card.name;
    openedTitle.textContent = card.name;
    openPopup(popupOpenedImage);
}

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

