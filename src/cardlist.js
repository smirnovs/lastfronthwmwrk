import { popup, addButton, popupCards} from './popup.js';
import { Card } from './card.js';

export class Cardlist {
  constructor(container, cards) {
    this.cards = cards;
    this.container = container;
    this.addCard = this.addCard.bind(this);
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
    const { nameValue, linkValue } = popup.returnValue();
    const  { cardElement } = new Card(nameValue, linkValue);
    
    this.container.appendChild(cardElement);
    
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
