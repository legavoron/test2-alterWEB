let classes = ['red', 'green', 'blue', 'yellow', 'black', 'pink', 'orange', 'purple', 'red'];

let blocks = [];
let showBlocks =[];

let body = document.querySelector('body');

function createElement(teg, id) {
    let elem = document.createElement(teg);
    return elem
}

function addElement(place, elem) {
    place.appendChild(elem)
}

let button = createElement('button');
button.innerHTML = 'Создать';
button.addEventListener('click', start);

addElement(body, button);

let blocksContainer = createElement('div');
blocksContainer.classList.add('blocksContainer');
addElement(body, blocksContainer);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
  
function addColors() {
    for( let i = 0; i < 24; i++) {
        let randomNum = getRandomIntInclusive(0, classes.length - 1);
        blocks.push(classes[randomNum]);
        showBlocks = [...blocks];
    }
}

function showDiws(arr) {
    arr.forEach(block => {
        let elem = createElement('div');
        elem.classList.add('block');
        elem.classList.add(block);
        addElement(blocksContainer, elem);
    })
}

function createSearch() {
    removeAllSearch();
    
    let searchContainer = createElement('div');
    searchContainer.classList.add('searchContainer')
    addElement(body, searchContainer);

    addNewSearch(searchContainer);

}

function removeAllSearch() {
    let listContainers = document.querySelectorAll('.searchContainer');
    listContainers.forEach(container => {
        container.remove();
    })

    let listBtnsSearch = document.querySelectorAll('.searchButton');
    listBtnsSearch.forEach(btn => {
        btn.remove();
    })
}

function addNewSearch(container) {

    let searchContainer = createElement('div');
    searchContainer.classList.add('searchContainer');
    addElement(container, searchContainer);

    let searchInput = createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Введите цвет';
    addElement(searchContainer, searchInput);

    let btnAddFilter = createElement('button');
    btnAddFilter.innerHTML = 'Добавить новый фильтр';
    btnAddFilter.addEventListener('click', () => {
        addNewSearch(container)
    })
    addElement(searchContainer, btnAddFilter);
}

function createSearchButton() {
    let searchButton = createElement('button');
    searchButton.classList.add('searchButton');
    searchButton.innerHTML = 'Отфильтровать';
    searchButton.addEventListener('click', search);
    addElement(body, searchButton);
}

function start() {
    blocksContainer.innerHTML = '';
    blocks = [];
    showBlocks = [];
    addColors();
    showDiws(showBlocks);
    createSearch();
    createSearchButton();
}

function search() {
    showBlocks = [];
    blocksContainer.innerHTML = '';

    let searchList = document.querySelectorAll('input');
    let searchColors = [];

    searchList.forEach(elem => {
        searchColors.push(elem.value)
    })

    blocks.forEach(block => {
        searchColors.forEach(color => {
            if (color === block) {
                showBlocks.push(color)
            }
        })
    })

    console.log(showBlocks)
    
    showDiws(showBlocks)
}