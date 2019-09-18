import { api } from './api.js';

export const userName = document.querySelector('.user-info__name');
export const userJob = document.querySelector('.user-info__job');

class User {
  setName(name, about) {
    userName.textContent = name;
    userJob.textContent = about;
  }
}
const user = new User();
api.getUserName().then(res => user.setName(res.name, res.about));
