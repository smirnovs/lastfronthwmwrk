export class Card {
  constructor(name, url) {
    this.nameValue = name;
    this.urlValue = url;
    this.cardElement = this.create();
  }

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

    newCard.appendChild(cardBg);
    cardBg.appendChild(cardDelete);
    newCard.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(cardLike);

    return newCard;
  }
}
