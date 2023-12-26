(()=>{"use strict";function e(e,t){e.checkValidity()?function(e){e.disabled=!1}(t):function(e){e.disabled=!0}(t)}function t(){document.querySelectorAll(".popup__form").forEach((function(t){var n=t.querySelectorAll(".popup__input"),o=t.querySelector(".popup__save-btn");e(t,o),n.forEach((function(n){n.addEventListener("input",(function(){var c;e(t,o),(c=n).validity.valid?function(e){var t="error-"+e.id;document.getElementById(t).textContent=" ",e.classList.remove("popup__input_type_error")}(c):function(e,t){var n="error-"+e.id;document.getElementById(n).textContent=t,e.classList.add("popup__input_type_error")}(c,c.validationMessage)}))}))}))}var n=document.getElementById("opened-image"),o=document.querySelector("#add-card"),c=o.querySelector(".popup__exit-btn"),r=n.querySelector(".popup__exit-btn"),a=document.querySelector("#delete-card"),u=a.querySelector(".popup__exit-btn"),i=document.getElementById("name"),d=document.querySelector(".profile__title"),l=document.getElementById("job"),s=document.querySelector(".profile__subtitle"),p=document.querySelector(".profile__avatar"),f=document.querySelector(".profile__add-button"),_=o.querySelector(".popup__form"),m=o.querySelector(".popup__save-btn"),v=document.querySelector(".profile__edit-button"),h=document.getElementById("edit-profile"),y=h.querySelector(".popup__exit-btn"),b=h.querySelector(".popup__form"),S=h.querySelector(".popup__save-btn"),E=document.querySelector(".profile__edit-avatar-button"),g=document.querySelector("#edit-avatar"),q=g.querySelector(".popup__exit-btn"),k=g.querySelector(".popup__save-btn"),L=g.querySelector(".popup__form"),x={baseUrl:"https://nomoreparties.co/v1/wbf-cohort-15",headers:{authorization:"ce4a2035-6e00-46fa-a0cc-a0f23b0a5bb3","Content-Type":"application/json"}};function C(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var B=document.getElementById("place"),I=document.getElementById("link"),U=n.querySelector(".popup__image"),T=n.querySelector(".popup__title"),N=document.getElementById("link-avatar");function O(e){e.classList.add("popup_opened"),document.addEventListener("keydown",w),t()}function J(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",w)}function w(e){27===e.keyCode&&J(document.querySelector(".popup_opened"))}document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&function(e){J(e)}(e)}))}));var A=document.getElementById("template-card").content.querySelector(".cards__item"),D=document.querySelector(".cards__list"),P="e5f6768b39a8d75be758ba67";function j(e){var t=A.cloneNode(!0),o=t.querySelector(".card__image"),c=t.querySelector(".card__text"),r=t.querySelector(".card__delete-button"),a=t.querySelector(".card__favorite-button"),u=t.querySelector(".card__favorite-counter");return o.src=e.link,o.alt=e.name,c.textContent=e.name,e.likes.some((function(e){return e._id===P}))&&a.classList.add("card__favorite-button_active"),a.addEventListener("click",(function(t){var n;t.target.classList.contains("card__favorite-button_active")?(n=e._id,fetch("".concat(x.baseUrl,"/cards/likes/").concat(n),{headers:x.headers,method:"DELETE",body:JSON.stringify({likes:n})}).then(C)).then((function(e){t.target.classList.remove("card__favorite-button_active"),u.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(x.baseUrl,"/cards/likes/").concat(e),{headers:x.headers,method:"PUT",body:JSON.stringify({likes:e})}).then(C)}(e._id).then((function(e){t.target.classList.add("card__favorite-button_active"),u.textContent=e.likes.length})).catch((function(e){console.log(e)}))})),e.owner._id!==P&&r.remove(),r.addEventListener("click",(function(){var n;console.log(e._id),(n=e._id,fetch("".concat(x.baseUrl,"/cards/").concat(n),{headers:x.headers,method:"DELETE",body:JSON.stringify({card:n})}).then(C)).then((function(){t.remove()})).catch((function(e){console.log(e)}))})),u.textContent=e.likes.length,o.addEventListener("click",(function(){!function(e){U.src=e.link,U.alt=e.name,T.textContent=e.name,O(n)}(e)})),t}function H(e){D.prepend(e)}fetch("".concat(x.baseUrl,"/users/me"),{method:"GET",headers:x.headers}).then(C).then((function(e){d.textContent=e.name,s.textContent=e.about,p.src=e.avatar,J(h)})).catch((function(e){console.log(e)})),fetch("".concat(x.baseUrl,"/cards"),{headers:x.headers}).then(C).then((function(e){e.reverse().forEach((function(e){H(j(e))}))})).catch((function(e){console.log(e)})),t(),b.addEventListener("submit",(function(e){var t,n;S.textContent="Сохранение...",e.preventDefault(),(t=i.value,n=l.value,fetch("".concat(x.baseUrl,"/users/me"),{headers:x.headers,method:"PATCH",body:JSON.stringify({name:t,about:n})}).then(C)).then((function(e){d.textContent=e.name,s.textContent=e.about,S.textContent="Сохранить",J(h)})).catch((function(e){console.log(e)}))})),y.addEventListener("click",(function(){return J(h)})),v.addEventListener("click",(function(){i.value=d.textContent,l.value=s.textContent,O(h)})),f.addEventListener("click",(function(){return O(o)})),c.addEventListener("click",(function(){return J(o)})),_.addEventListener("submit",(function(e){var t,n;m.textContent="Создание...",e.preventDefault(),(t=B.value,n=I.value,fetch("".concat(x.baseUrl,"/cards"),{headers:x.headers,method:"POST",body:JSON.stringify({name:t,link:n})}).then(C)).then((function(e){H(j(e)),_.reset(),J(o),m.textContent="Создать"})).catch((function(e){console.log(e)}))})),r.addEventListener("click",(function(){return J(n)})),u.addEventListener("click",(function(){return J(a)})),E.addEventListener("click",(function(){return O(g)})),q.addEventListener("click",(function(){return J(g)})),L.addEventListener("submit",(function(e){var t;k.textContent=" Сохранение...",e.preventDefault(),console.log(p),console.log(e),(t=N.value,fetch("".concat(x.baseUrl,"/users/me/avatar"),{headers:x.headers,method:"PATCH",body:JSON.stringify({avatar:t})}).then(C)).then((function(e){p.src=e.avatar,J(g),k.textContent=" Сохранить"})).catch((function(e){console.log(e)}))}))})();