const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-15',
    headers: {
        authorization: 'ce4a2035-6e00-46fa-a0cc-a0f23b0a5bb3',
        'Content-Type': 'application/json'
    }
}

function checkResponseAPI(res) {
    if (res.ok) {
        return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(checkResponseAPI)
}

export const postCreatedCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({name: name, link: link})
    })
        .then(checkResponseAPI)
}

export const getInitialProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
        .then(checkResponseAPI)
}

export const postEditProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({name: name, about: about})
    })
        .then(checkResponseAPI)
}

export const putFavoriteButton = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'PUT',
        body: JSON.stringify({likes: cardId})
    })
        .then(checkResponseAPI)
}

export const deleteFavoriteButton = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'DELETE',
        body: JSON.stringify({likes: cardId})
    })
        .then(checkResponseAPI)
}

export const patchEditAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({avatar: link})
    })
        .then(checkResponseAPI)
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        headers: config.headers,
        method: 'DELETE',
        body: JSON.stringify({card: cardId})
    })
        .then(checkResponseAPI)
}



