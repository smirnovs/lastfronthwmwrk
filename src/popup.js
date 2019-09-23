import { userName, userJob } from './user.js';
import { api } from './api.js';


export const popupCards = document.querySelector('.popup__cards');
export const addButton = popupCards.querySelector('.popup__button_add');
const popupImageContainer = document.querySelector('.popup__image');
const popupImage = popupImageContainer.querySelector('.popup__big-image');
const popupEdit = document.querySelector('.popup__useredit');

const editButton = popupEdit.querySelector('.popup__button_edit');
const openCardsPop = document.querySelector('.user-info__button');
const openEditPop = document.querySelector('.user-info__edit');
const openImagePop = document.querySelector('.places-list');
const popupContainer = document.querySelector('.popups');

const errorName = document.querySelector('.popup__error_name');
const errorUser = document.querySelector('.popup__error_username');
const errorJob = document.querySelector('.popup__error_userjob');
const errorUrl = document.querySelector('.popup__error_url');

const form = document.forms.new;
const editForm = document.forms.edit;
const username = editForm.elements.username;
const job = editForm.elements.userjob;
const name = form.elements.name;
const link = form.elements.link;

class Popup {
  returnValue(){
    const nameValue = name.value;
    const linkValue = link.value;
    return {nameValue, linkValue}
  }
  open(formname) {
    formname.classList.toggle('popup_is-opened');
  }
  close(formname) {
    formname.classList.toggle('popup_is-opened');
  }
  reset() {
    form.reset();
  }

  checkName(error, field) {
    if (field.value.length === 0) {
      error.textContent = 'Это обязательное поле';
      this.disableButton(addButton);
      return false;
    } else if (field.validity.tooShort) {
      error.textContent = 'Должно быть от 2 до 30 символов';
      this.disableButton(addButton);
      return false;
    } else {
      error.textContent = '';
      this.enableButton(addButton);
      return true;
    }
  }
  checkUrl(url) {
    if (link.value.length === 0) {
      url.textContent = 'Это обязательное поле';
      this.disableButton(addButton);
      return false;
    }
    if (!link.validity.valid) {
      url.textContent = 'Здесь должна быть ссылка';
      this.disableButton(addButton);
      return false;
    } else {
      url.textContent = '';
      return true;
    }
  }

  setImg() {
    let imgBg = event.target.style.backgroundImage;
    let imgUrl = imgBg.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
    popupImage.src = imgUrl;
  }
  editUser(event) {
    event.preventDefault();
    api.setUserName(username.value, job.value);
    userName.textContent = username.value;
    userJob.textContent = job.value;
    const formname = event.target.parentNode.parentNode;
    this.close(formname);
  }

  fillField(formname) {
    const userName = document.querySelector('.user-info__name').textContent;
    const userJob = document.querySelector('.user-info__job').textContent;
    formname.querySelector('.popup__input_type_username').value = userName;
    formname.querySelector('.popup__input_type_userjob').value = userJob;
  }
  disableButton(button) {
    button.setAttribute('disabled', true);
    button.style.backgroundColor = 'transparent';
    button.style.color = 'rgba(0, 0, 0, 0.2)';
  }
  enableButton(button) {
    button.removeAttribute('disabled');
    button.style.backgroundColor = '#000000';
    button.style.color = '#FFFFFF';
  }

  validateAddCardButton() {
    const isActiveName = this.checkName(errorName, name);
    const isActiveUrl = this.checkUrl(errorUrl);
    if (!isActiveName || !isActiveUrl) {
      this.disableButton(editButton);
    } else {
      this.enableButton(editButton);
    }
  }

  validateEditUserButton() {
    let isActiveName = this.checkName(errorJob, job);
    let isActiveJob = this.checkName(errorUser, username);
    if (!isActiveName || !isActiveJob) {
      this.disableButton(editButton);
    } else {
      this.enableButton(editButton);
    }
  }
}
export const popup = new Popup();

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

openImagePop.addEventListener('click', function(){
  if(event.target.classList.contains('place-card__image')){
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
