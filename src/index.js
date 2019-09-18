import {
  popup,
  editForm,
  popupImageContainer,
  editButton,
  errorJob,
  job,
  errorUser,
  username,
  errorName,
  name,
  errorUrl,
  popupEdit
} from './popup.js';
import { form, cardContainer, popupCards } from './cardlist.js';

const openCardsPop = document.querySelector('.user-info__button');
const openEditPop = document.querySelector('.user-info__edit');
const popupContainer = document.querySelector('.popups');

openCardsPop.addEventListener('click', function() {
  popup.open(popupCards);
  popup.reset(form);
  popup.checkUrl(errorUrl);
  popup.checkName(errorName, name);
});
openEditPop.addEventListener('click', function() {
  popup.open(popupEdit);
  popup.fillField(editForm);
  popup.checkName(errorUser, username);
  popup.checkName(errorJob, job);
  popup.enableButton(editButton);
});
cardContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('place-card__image')) {
    popup.open(popupImageContainer);
    popup.setImg();
  }
});

popupContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('popup__close')) {
    const popupName = event.target.parentNode.parentNode;
    popup.close(popupName);
  }
});

popupEdit.addEventListener('submit', function() {
  popup.editUser(event);
});

form.addEventListener('input', function() {
  popup.validateAddCardButton();
});

editForm.addEventListener('input', function() {
  popup.validateEditUserButton();
});
