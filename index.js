let classes = ['red', 'green', 'blue', 'yellow', 'black', 'pink', 'orange', 'purple', 'red'];

let blocks = [];
let showBlocks =[];
let filterColors = [];
let filterList = [];


let body = document.querySelector('body');

let button = createElement('button');
button.innerHTML = 'Создать';
button.addEventListener('click', start);

function start() {
    blocksContainer.innerHTML = '';
    blocks = [];
    showBlocks = [];
    addColors();
    showDiws(showBlocks);
    createSearch();
    createSearchButton();
}

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
// ------------------------------- Search ---------------------

function createSearch() {
    removeAllSearch('container');
    removeAllSearch('searchContainer');
    removeAllSearch('searchButton');

    let searchContainer = createElement('div');
    searchContainer.classList.add('container')
    addElement(body, searchContainer);
    addNewSearch(searchContainer);
}

function removeAllSearch(className) {
    let listContainers = document.querySelectorAll(`.${className}`);
    listContainers.forEach(container => {
        container.remove();
    })
}

function addNewSearch(container) {

    let searchContainer = createElement('div');
    searchContainer.classList.add('searchContainer');
    addElement(container, searchContainer);

    let searchInput = createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Введите цвет';
    searchInput.id = `searchInput-${Math.random()}`

    addElement(searchContainer, searchInput);

    let btnAddFilter = createElement('button');
    btnAddFilter.innerHTML = 'Добавить новый фильтр';
    btnAddFilter.addEventListener('click', () => {
        addNewSearch(container)
    })
    addElement(searchContainer, btnAddFilter);

    createRadio(searchInput.id, searchContainer, searchInput);
}

function createSearchButton() {
    let searchButton = createElement('button');
    searchButton.classList.add('searchButton');
    searchButton.innerHTML = 'Отфильтровать';
    searchButton.addEventListener('click', search);
    addElement(body, searchButton);
    searchButton.addEventListener('click', showRadio);
    
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

        let localFilter = [];

        showBlocks.forEach(block => {
            if (filterList.includes(block) === false) {
                localFilter.push(block)
            }
        });

        filterColors = [... localFilter];
    })

    

    showDiws(filterColors)
}

// -------------------------- Radio Filter-------------------

function createRadio(inputId, container, input) {
    let radioContainer = createElement('div');
    radioContainer.classList.add('radioContainer');
    addElement(container, radioContainer);

    let radio = createElement('input');
    radio.type = 'radio';
    radio.name = `radio-${inputId}`;
    radio.dataSet = 'showColor';
    radio.checked = true;
    radio.classList.add('radio');
    radio.addEventListener('change', ()=> {
        checkRadio(radio, input)
    });

    let label = createElement('label');
    label.for = radio;
    label.innerHTML = 'Включая цвет';
    addElement(radioContainer, label)
    addElement(radioContainer, radio);

    let radio2 = createElement('input');
    radio2.type = 'radio';
    radio2.name = `radio-${inputId}`;
    radio2.dataSet = 'dontShowColor';
    radio2.classList.add('radio');
    radio2.addEventListener('change', ()=> {
        checkRadio(radio2, input)
    });

    let label2 = createElement('label');
    label2.for = radio2;
    label2.innerHTML = 'Исключая цвет';

    addElement(radioContainer, label2)
    addElement(radioContainer, radio2)

}

function showRadio() {
    let radioBtns = document.querySelectorAll('.radioContainer');
    
    radioBtns.forEach(radio => {
        radio.classList.add('show')
    })
}

function checkRadio(radio, input) {
    let color = input.value;
    let localFilter = [];
    blocksContainer.innerHTML = '';

    if (radio.dataSet === 'dontShowColor') {
       filterList.push(color);
    }
    if (radio.dataSet === 'showColor') {
        let arr = [];

        filterList.forEach(filterColor => {
            if (filterColor !== color) {
                arr.push(filterColor)
            }
        })

        filterList = [... arr];
    }

    showBlocks.filter(block => {
        if (filterList.includes(block) === false) {
            localFilter.push(block)
        }
    })

    filterColors = [... localFilter];

    showDiws(filterColors)

}

//  ----------------------- Supportive ------------------

function createElement(teg, id) {
    let elem = document.createElement(teg);
    return elem
}

function addElement(place, elem) {
    place.appendChild(elem)
}