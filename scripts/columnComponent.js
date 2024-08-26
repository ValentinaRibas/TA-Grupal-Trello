//Ejemplo sin datos
localStorage.setItem('title', 'BACKLOG');
localStorage.setItem('inner-title', 'Título');
localStorage.setItem('inner-description', 'Descripción');


const titleElement = document.getElementById('title');
const innerTitleElement = document.getElementById('inner-title');
const innerDescriptionElement = document.getElementById('inner-description');

const title = localStorage.getItem('title');
const innerTitle = localStorage.getItem('inner-title');
const innerDescription = localStorage.getItem('inner-description');

titleElement.innerHTML = title;
innerTitleElement.innerHTML = innerTitle;
innerDescriptionElement.innerHTML = innerDescription;
