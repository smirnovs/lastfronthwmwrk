import { popup, form, name, link, popupImageContainer } from './popup.js';
import { Card } from './card.js';

export const cardContainer = document.querySelector('.places-list');
export const popupCards = document.querySelector('.popup__cards');
export const addButton = popupCards.querySelector('.popup__button_add');

export class Cardlist {
  constructor(container, cards) {
    this.cards = cards;
    this.container = container;
    this.addListener();
    this.render();
  }

  cardActions() {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
    if (event.target.classList.contains('place-card__delete-icon')) {
      event.target.closest('.place-card').remove();
    }
    if (event.target.classList.contains('place-card__image')) {
      popup.open(popupImageContainer);
      popup.setImg();
    }
  }

  addCard(event) {
    event.preventDefault();
    const cardElement = new Card(name.value, link.value);
    cardContainer.appendChild(cardElement.create());
    popup.reset(form);
    const formname = event.target.parentNode.parentNode;
    popup.close(formname);
    addButton.setAttribute('disabled', true);
  }

  render() {
    for (let i = 0; i < this.cards.length; i++) {
      const { cardElement } = new Card(this.cards[i].name, this.cards[i].link);
      this.container.appendChild(cardElement);
    }
  }

  addListener() {
    popupCards.addEventListener('submit', this.addCard);
    cardContainer.addEventListener('click', this.cardActions);
  }
}