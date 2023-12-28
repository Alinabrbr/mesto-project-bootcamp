import './pages/index.css';
import {enableValidation} from './components/validate.js';
import {createInitialCards} from './components/card.js';

import {
    handleEditProfileFormSubmit,
    handleAddCardFormSubmit,
    openPopup,
    closePopup,
    createInitialProfile,
    handleEditAvatarFormSubmit
} from './components/modal.js';

import {
    popupEditProfile,
    popupAddCard,
    popupOpenedImage,
    nameInput,
    nameProfile,
    jobInput,
    jobProfile,
    formElementEditProfile,
    buttonCloseEditProfile,
    buttonEditProfile,
    buttonAddCard,
    buttonCloseAddCard,
    formElementAddCard,
    buttonCloseImage,
    buttonCloseDeleteCard,
    popupDeleteCard,
    buttonEditAvatar,
    popupEditAvatar,
    buttonClosePopupEditAvatar,
    formElementEditAvatar
} from './components/constants.js';
import {getInitialCards, getInitialProfile} from "./components/api";
export let userId;

Promise.all([getInitialProfile(), getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        createInitialProfile(userData);
        createInitialCards(cards, userId);
    })
    .catch(console.error);

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn:disabled',
    inputErrorClass: 'popup__input_type_error'
});

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

buttonCloseDeleteCard.addEventListener('click', () => closePopup(popupDeleteCard));

buttonEditAvatar.addEventListener('click', () => openPopup(popupEditAvatar));
buttonClosePopupEditAvatar.addEventListener('click', () => closePopup(popupEditAvatar));
formElementEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});
