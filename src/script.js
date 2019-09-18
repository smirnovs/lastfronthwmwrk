const cardContainer = document.querySelector('.places-list');
const openCardsPop = document.querySelector('.user-info__button');
const openEditPop = document.querySelector('.user-info__edit');
const popupContainer = document.querySelector('.popups');
const popupCards = document.querySelector('.popup__cards');
const popupEdit = document.querySelector('.popup__useredit');
const popupImageContainer = document.querySelector('.popup__image');
const popupImage = popupImageContainer.querySelector('.popup__big-image');
const addButton = popupCards.querySelector('.popup__button_add');
const editButton = popupEdit.querySelector('.popup__button_edit');

let userName = document.querySelector('.user-info__name'); // Можно лучше - const - селектор не перезаписывается
let userJob = document.querySelector('.user-info__job'); // Можно лучше - const

const form = document.forms.new;
const name = form.elements.name;
const link = form.elements.link;

const editForm = document.forms.edit;
const username = editForm.elements.username;
const job = editForm.elements.userjob;

const errorName = document.querySelector('.popup__error_name');
const errorUser = document.querySelector('.popup__error_username');
const errorJob = document.querySelector('.popup__error_userjob');
const errorUrl = document.querySelector('.popup__error_url');

class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
    // Надо исправить // Проверка #2 - исправлено
    // В поля класса стоит записывать конкретные ключи
    // чтобы без отладчиков было понятно какие данные ожидаем
    // в случае с api это url и headers
    // constructor({ url, headers})
    // this.url = url
    // this.headers = headers
    // вызовы методов получения данных правильнее указывать в других классах где
    // класс стоит разместить перед остальным кодом чтобы вызовы были доступны
    // как вариант перенести в самый верх вместо initialCards const

    //удалил вызов методов
  }
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
      // Проверка #2 - исправлено
      /* правильнее в методе возвращать результат запроса, а работу с данными делать в других классах
       return fetch ( , {}).then(res => {
         if (res.ok) {
           return Promise.relove(res.json...
         }

         return Promise.reject(res.status)
       })       
       */
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUserName() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        } else {
          console.log('Кажется сайт не отвечает или неправильный урл');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  setUserName(username, about) {
    fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: username,
        about: about // Проверка #3 можно улучшить: когда ключи совпадают
        // можно не дублировать { name: username, about}
        // для удобства проще передавать name тогда запись будет { name, about }
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log('Кажется сайт не отвечает или неправильный урл');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

class Card {
  constructor(name, url) {
    this.nameValue = name;
    this.urlValue = url;
    this.cardElement = this.create();
  }

  /**
   * Проверка #3 - исправлено
   * Проверка #2 - Надо исправить - в случае использования делегирования это логика другого класса
   * cardList
   *
   * при удалении надежнее искать карточку по event.target.closest('.place-card')
   * так при изменении разметки код не сломается
   * https://developer.mozilla.org/ru/docs/Web/API/Element/closest
   *
   * оба метода правильнее разместить в cardsList
   */

  //перенес like, remove и addListener в cardlist
  create() {
    const newCard = document.createElement('div');
    newCard.classList.add('place-card');

    const cardBg = document.createElement('div');
    cardBg.classList.add('place-card__image');
    cardBg.style.backgroundImage = `url(${this.urlValue})`;

    const cardDelete = document.createElement('button');
    cardDelete.classList.add('place-card__delete-icon');

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = this.nameValue;

    const cardLike = document.createElement('button');
    cardLike.classList.add('place-card__like-icon');

    /**
     * Переменные принято размещать в начале тела функции для лучшей читаемости
     */

    //я сгруппировал их так специально - переменная-создание элемента -> добавление этому элементу класса, на мой взгляд именно в этом случае, в виде исключения,
    //так читается лучше.

    newCard.appendChild(cardBg);
    cardBg.appendChild(cardDelete);
    newCard.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(cardLike);

    return newCard;
  }
}
// Проверка #2 - Можно улучшить
// Получение данных снаружи позволяет сократить зависимости и не размещать один класс в другом
// пример инициализации:

// api.getInitialCards().then(cards => {
//  if (cards && cards.length > 0) {
//    new Cardlist(cardContainer, cards);
//  }
// });

//сделано Проверка #3 - отлично, данные передаются оптимальным образом
class Cardlist {
  constructor(container, cards) {
    this.cards = cards;
    this.container = container;
    this.addListener();
    this.render();
    // Проверка #2 - Можно улучшить Проверка #3 - вызовы логичны - выглядит чисто
    // Можно передавать cards вторым параметром так мы не привязаны к способу получения данных
    // this.cards = cards
    // this.render() позволит избежать лишних параметров
    // api.getInitialCards().then(cards => this.render(cards));
    // если карточек нет или ошибка запроса
    // в консоли ошибка - стоит проверять массив и количество элементов

    //перенес установку имени и работы в класс User, вынес получение данных наружу.
    // Проверка #3 - исправлено
    // Проверка #2 - Надо исправить - пользователь не имеет отношения к списку карточек
    // это другой класс Profile или User
    // данные стоит попробовать размещать вне класса
    // это полезный навык по созданию более гибкого кода
    // const user = new User()
    // api.getUserName().then(res => user.setName())
  }

  cardActions() {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
    if (event.target.classList.contains('place-card__delete-icon')) {
      event.target.closest('.place-card').remove();
    }
  }

  //   // Проверка #2 - Надо исправить 
  //   // это логика класса placesList - хватит одного обработчика внутри которого работает проверка
  //   // if (likeElem) { like() } if (removeElem) { remove() }
  // }

  // убрал методы like и remove, заменил на один метод - Проверка #3 - исправлено

  addCard(event) {
    /* Можно лучше: - Проверка #3 - попробуйте в свободное время
     * Не очень хорошая практика, когда мы напрямую подтягиваем другие классы в методы текущего класса.
     * Устанавливается очень большое количество зависимостей между классами.
     *
     * Попробуйте передать callback-функцию внутрь addCard
     * Например, внутри конструктора создать поле this.onAddCard = null;
     *
     * В метод addCard передавать параметр fn - это и будет наша коллбэк функция:
     * this.onAddCard = fn;
     *
     * После чего проверить, что пришло нам в качестве параметра fn и вызвать этот коллбэк:
     * evt.preventDefault();
     * return typeof this.onAddCard === `function` && this.onAddCard();
     *
     * https://habr.com/ru/post/151716/
     * */
    event.preventDefault();
    const cardElement = new Card(name.value, link.value);
    cardContainer.appendChild(cardElement.create());
    popup.reset(form);
    const formname = event.target.parentNode.parentNode;
    popup.close(formname);
    addButton.setAttribute('disabled', true);
    // Проверка #3 - можно писать так addButton.disabled = true
    // по аналогии можно поступать и с другими атрибутами img.src и тд
  }

  render() {
    for (let i = 0; i < this.cards.length; i++) {
      const { cardElement } = new Card(this.cards[i].name, this.cards[i].link);
      /* Можно лучше:
       * Не очень хорошая практика, когда мы напрямую подтягиваем другие классы в методы текущего класса.
       * Устанавливается очень большое количество зависимостей между классами.
       *
       * Попробуйте передать callback-функцию внутрь render
       * */
      this.container.appendChild(cardElement);
    }
  }

  addListener() {
    popupCards.addEventListener('submit', this.addCard);
    cardContainer.addEventListener('click', this.cardActions);
  }
}

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
    // Проверка #3 - можно лучше - closest не привязан к разметке
    this.close(formname); //закрываю попап
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
    button.style.color = 'rgba(0, 0, 0, .2)';
    // Проверка #3 - rgba(#000, .2); так проще писать
  }
  enableButton(button) {
    button.removeAttribute('disabled');
    button.style.backgroundColor = '#000000';
    button.style.color = '#FFFFFF';
  }

  validateAddCardButton() {
    let isActiveName = this.checkName(errorName, name);
    let isActiveUrl = this.checkUrl(errorUrl);
    // Проверка #3 const - нет перезаписи

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

class User {
  // Проверка #3 - лучше в конструктор записать данные чтобы они не потерялись
  setName(name, about) {
    userName.textContent = name;
    userJob.textContent = about;
  }
}

const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort2',
  headers: {
    authorization: '9b5510e1-e0ed-4f9f-8a0a-8043e75d5894',
    'Content-Type': 'application/json'
  }
});

// const cardlist = new Cardlist(cardContainer);
// Лучше const класс не перезаписывается и у него не можут меняться тип
// Можно улучшить разместив логику получения данных вне класса
// api.getInitialCards().then(cards => {
//  if (cards && cards.length > 0) {
//    new Cardlist(cardContainer, cards);
//  }
// });
const popup = new Popup();
const user = new User();

api.getUserName().then(res => user.setName(res.name, res.about));
// Проверка #3 все ок но можно просто передавать поля в конструктор пользователя
// и тамже запускать setName так нам проще - не нужно знать про логику
// просто объявляем класс и он работает сам дальше
api.getInitialCards().then(cards => {
  if (cards && cards.length > 0) {
    new Cardlist(cardContainer, cards);
  }
});

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

/**
 * Проверка #2 - Хорошо
 *
 * Работа выполняет функционал по получению и работе с данными.
 * Класс api не содержит лишней логики, обратите внимание комментарии.
 * Получаются лишние зависимости. Комментарии "Надо исправить" обязательны.
 */

 // Проверка #3 отличная работа реализован весь функционал задания
 // обратите внимание на форму добавления карточки стоит запускать
 //  валидацию полей только после начала ввода данных

 // подумайте о разделении кода на файлы модули это пригодится в следующих спринтах
 // и сделает код более легким визуально