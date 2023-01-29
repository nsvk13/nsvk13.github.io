const trigger = document.querySelector('.trigger');
const nav = document.querySelector('.full-screen');
const backdrop = document.querySelector('.backdrop');

trigger.addEventListener('click', () => nav.classList.add('open'));
backdrop.addEventListener('click', () => nav.classList.remove('open'));
