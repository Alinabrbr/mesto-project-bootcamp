function showErrorMessage (inputElement, errorMessage, settings) {
    const spanId = 'error-' + inputElement.id;
    const spanItem = document.getElementById(spanId);
    spanItem.textContent = errorMessage;
    inputElement.classList.add(settings.inputErrorClass);
}

function hideErrorMessage (inputElement, settings) {
    const spanId = 'error-' + inputElement.id;
    const spanItem = document.getElementById(spanId);
    spanItem.textContent = ' ';
    inputElement.classList.remove(settings.inputErrorClass);
}

function handleInput(inputElement, settings) {
    if(inputElement.validity.valid) {
        hideErrorMessage(inputElement, settings);
    } else {
        showErrorMessage(inputElement, inputElement.validationMessage, settings);
    }
}

function enableButton(button) {
    button.disabled = false;
}

export function disableButton(button) {
    button.disabled = true;
}

function checkValidForm(form, button) {
    if (form.checkValidity()) {
        enableButton(button);
    } else {
        disableButton(button);
    }
}

export function enableValidation (settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(form => {
        const inputs = form.querySelectorAll(settings.inputSelector);
        const saveButton = form.querySelector(settings.submitButtonSelector);
        checkValidForm(form, saveButton);
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                checkValidForm(form, saveButton, settings);
                handleInput(input, settings);
            });
        });
    });
}