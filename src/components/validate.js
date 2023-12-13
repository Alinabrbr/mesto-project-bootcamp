function showErrorMessage (inputElement, errorMessage) {
    const spanId = 'error-' + inputElement.id;
    const spanItem = document.getElementById(spanId);
    spanItem.textContent = errorMessage;
    inputElement.classList.add('popup__input_type_error');
}

function hideErrorMessage (inputElement) {
    const spanId = 'error-' + inputElement.id;
    const spanItem = document.getElementById(spanId);
    spanItem.textContent = ' ';
    inputElement.classList.remove('popup__input_type_error');
}

function handleInput(inputElement) {
    if(inputElement.validity.valid) {
        hideErrorMessage(inputElement);
    } else {
        showErrorMessage(inputElement, inputElement.validationMessage);
    }
}

function enableButton(button) {
    button.disabled = false;
}

function disableButton(button) {
    button.disabled = true;
}

function checkValidForm(form, button) {
    if (form.checkValidity()) {
        enableButton(button);
    } else {
        disableButton(button);
    }
}

export function enableValidation () {
    const forms = document.querySelectorAll('.popup__form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('.popup__input');
        const saveButton = form.querySelector('.popup__save-btn');
        checkValidForm(form, saveButton);
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                checkValidForm(form, saveButton);
                handleInput(input);
            });
        });
    });
}