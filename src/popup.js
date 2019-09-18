import { userName, userJob } from './user.js';
import { form, addButton } from './cardlist.js';
import { api } from './api.js';

export const popupImageContainer = document.querySelector('.popup__image');
const popupImage = popupImageContainer.querySelector('.popup__big-image');
export const popupEdit = document.querySelector('.popup__useredit');
export const editButton = popupEdit.querySelector('.popup__button_edit');

export const errorName = document.querySelector('.popup__error_name');
export const errorUser = document.querySelector('.popup__error_username');
export const errorJob = document.querySelector('.popup__error_userjob');
export const errorUrl = document.querySelector('.popup__error_url');

export const editForm = document.forms.edit;
export const username = editForm.elements.username;
export const job = editForm.elements.userjob;
export const name = form.elements.name;
export const link = form.elements.link;

class Popup {
  open(formname) {
    formname.classList.toggle('popup_is-opened');
  }
  close(formname) {
    formname.classList.toggle('popup_is-opened');
  }
  reset(formname) {
    formname.reset();
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
    button.style.color = 'rgba(#000, .2)';
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
