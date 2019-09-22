import { popup, addButton, popupCards} from './popup.js';
import { Card } from './card.js';

export const cardContainer = document.querySelector('.places-list');

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
  }

  addCard(event) {
    event.preventDefault();    
    const fieldName = popup.returnValue().nameValue;
    const fieldLink = popup.returnValue().linkValue;   
    const cardElement = new Card(fieldName, fieldLink);
    
    this.container.bind(this);
    console.log(this.container);
    cardContainer.appendChild(cardElement.cardElement);
    
    const formname = event.target.parentNode.parentNode;
    popup.close(formname);
    popup.reset();
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
    this.container.addEventListener('click', this.cardActions);
  }
}
