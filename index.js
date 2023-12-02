const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.getElementById("edit-profile");
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');
const buttonCloseEditProfile = popupEditProfile.querySelector(".popup__exit-btn");
const formElementEditProfile =  popupEditProfile.querySelector(".popup__form");

const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector("#add-card");
const buttonCloseAddCard = popupAddCard.querySelector(".popup__exit-btn");
const formElementAddCard = popupAddCard.querySelector('.popup__form');
const cardTemplate = document.getElementById('template-card').content.querySelector('.card__item-container');
const inputNamePlaceCard = document.getElementById('place');
const inputImgCard = document.getElementById('link');
const containerCards = document.querySelector('.cards__list');

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

    function openPopup(namePopup) {
        namePopup.classList.add("popup_opened");
    }

    function closePopup(namePopup) {
        namePopup.classList.remove("popup_opened");
    }

    function handleEditProfileFormSubmit(evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        nameProfile.textContent = nameInput.value;
        jobProfile.textContent = jobInput.value;
        closePopup(popupEditProfile);
    }

    function handleAddCardFormSubmit(evt) {
        evt.preventDefault();
        addCard(createCard());
        formElementAddCard.reset();
        closePopup(popupAddCard);
    }

formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);

    function createCard () {
        const newCard = cardTemplate.cloneNode(true);
        const imgCard = newCard.querySelector('.card__image');
        const namePlaceCard = newCard.querySelector('.card__text');

        imgCard.src = inputImgCard.value;
        imgCard.alt = inputNamePlaceCard.value;
        namePlaceCard.textContent = inputNamePlaceCard.value;

        return newCard;
    }

    function addCard(card){
        containerCards.prepend(card);
    }

formElementEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

buttonEditProfile.addEventListener("click", () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(popupEditProfile)
});

buttonCloseEditProfile.addEventListener("click", () => closePopup(popupEditProfile));

buttonAddCard.addEventListener("click", () => openPopup(popupAddCard));

buttonCloseAddCard.addEventListener("click",() => closePopup(popupAddCard));




