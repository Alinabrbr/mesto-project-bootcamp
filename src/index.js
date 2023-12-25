import './pages/index.css';
import {enableValidation} from './components/validate.js';
import {createInitialCards} from './components/card.js';
import {handleEditProfileFormSubmit, handleAddCardFormSubmit, openPopup, closePopup, createInitialProfile} from './components/modal.js';
import {popupEditProfile, popupAddCard, popupOpenedImage, nameInput, nameProfile, jobInput, jobProfile, formElementEditProfile, buttonCloseEditProfile, buttonEditProfile, buttonAddCard, buttonCloseAddCard, formElementAddCard, buttonCloseImage} from './components/utils.js';

createInitialProfile()
createInitialCards();
enableValidation();

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
