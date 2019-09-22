import "./style.css";
import { Cardlist } from './cardlist.js';
import { api } from './api.js';
import { user } from './user.js';

const cardContainer = document.querySelector('.places-list');

api.getInitialCards().then(cards => {
  if (cards && cards.length > 0) {
    new Cardlist(cardContainer, cards);
  }
});
api.getUserName().then(res => user.setName(res.name, res.about));
