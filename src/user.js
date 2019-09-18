export const userName = document.querySelector('.user-info__name');
export const userJob = document.querySelector('.user-info__job');

class User {
  setName(name, about) {
    userName.textContent = name;
    userJob.textContent = about;
  }
}
export const user = new User();
