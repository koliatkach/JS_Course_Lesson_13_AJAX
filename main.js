/*
1. Створити сайт використовуючи swapi.dev. вибрати 1 з 6 проперті (films, characters etc..)і зробити запит по них,
    вибрати одну з перших проперті що отримаєте і витягнувши з неї "url" - отримати конкретну(планету,фільм, персонажа)
з всією інформацією про нього. Додати кнопку при натисканні на яку вивести всю наявну інформацію на екран красиво структуровано.
*/
let j; //counter
let i; //counter
let node = null;
let URL =  'https://swapi.dev/api/people/?page=1';
let btnTas1Add = document.getElementById('btn-1-test-add-ajax');
let btnTask1Next = document.getElementById('btn-1-test');
let divTask1 = document.getElementById('div_task1');

// робимо фетч та виводимо на сторінку перші 10 елементів
btnTas1Add.onclick = function () {
    sendRequest('GET',defaultURL())
        .then(createTable)
}

//добавляємо ще 10 елементів при клікові (не знаю як зробити заміну =((   )
btnTask1Next.onclick = function () {
    goToNextPage();
}

function sendRequest(method,url,body = null) {
    return node = fetch(url)
        .then(response => response.json())
        .then(result => node = result)
        .catch(err => console.log(err));
}

function goToNextPage() {
    i++;
    sendRequest('GET',changeNumOfPageToNext())
        .then(remove)
        .then(createTable);
}

function remove() {
    let divChild = divTask1.childNodes;
    for (let k = 0; k < divChild.length; k++) {
        divChild[k].remove();
    }
}

function searchInNextPage() {
    i++;
    sendRequest('GET',changeNumOfPageToNext());
}

function createTable() {
    let divTask1 = document.getElementById('div_task1');

    for (i = 0; i < node.results.length; i++) {
        let charName = document.createElement('h3');
        let tableOfChar = document.createElement('table');
        let div = document.createElement('div');


        for (let key in node.results[i]) {

            let trKeyAndValue = document.createElement('tr');
            let tdKey = document.createElement('td');
            let tdValue = document.createElement('td');

            charName.innerText = node.results[i].name;
            tdKey.innerText = key;
            tdValue.innerText = node.results[i][key];

            trKeyAndValue.appendChild(tdKey);
            trKeyAndValue.appendChild(tdValue);
            tableOfChar.before(charName);
            tableOfChar.appendChild(trKeyAndValue);
            div.appendChild(tableOfChar);
        }
        divTask1.appendChild(div);
        console.log(i);
    }
}

function defaultURL() {
    return URL;
}

// Приводимо юрл до масиву
function convertUrlToArr(str) {
    let urlArr = str.split('');
    return urlArr;
}

//Змінюємо останній елемент в юрл масиві , щоб сторінка перейшла на наступну
function changeNumOfPageToNext() {
    let newUrlArr = convertUrlToArr(URL);
    newUrlArr[newUrlArr.length - 1] = (+newUrlArr[newUrlArr.length - 1] + 1).toString();
    let newUrlStr = newUrlArr.join('');
    URL = newUrlStr;
    convertUrlToArr(URL);
    return URL;
}

/*2. Використовуючи параметр серч, розробити сайт який буде з допомогою інпута робити пошук за конкретним параметром
і виводити дані на сторінку. (якщо 1 знахідка - вивести всю інфу про айтем, якщо більше 1 то вивести список по філду).*/

let btnTask2Search = document.getElementById('btn-2-test');
let task2Select = document.getElementById('person');
let input = document.getElementById('input_search');
let divMain = document.getElementById('div_main');
let divTask2 = document.getElementById('div_task2');

function genderSearch() {
    sendRequest('GET',defaultURL())
        .then(function (){
            for (let j = 0; j < node.results.length; j++) {
                if (node.results[j].gender === input.value.toLowerCase()) {
                    try {
                        divMain.appendChild(searchCreateTable(node.results[j]));
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        })
}

function hairColorSearch() {
    sendRequest('GET',defaultURL())
        .then(function (){
            for (let j = 0; j < node.results.length; j++) {
                if (node.results[j].hair_color === input.value.toLowerCase()) {
                    try {
                        divMain.appendChild(searchCreateTable(node.results[j]));
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        })
}

function heightSearch() {
    sendRequest('GET',defaultURL())
        .then(function (){
            for (let j = 0; j < node.results.length; j++) {
                if (node.results[j].height === input.value.toLowerCase()) {
                    console.log(node.results[j]);
                    try {
                        divMain.appendChild(searchCreateTable(node.results[j]));
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        })
}

function selector () {
    let sel = task2Select.selectedIndex;
    let options = task2Select.options;
    return options[sel].text;
}

btnTask2Search.onclick = function () {
    if (selector() === 'gender') {
        genderSearch();
        searchInNextPage();
    }
    if (selector() === 'hair color') {
        hairColorSearch();
        searchInNextPage();
    }
    if (selector() === 'height') {
        heightSearch();
        searchInNextPage();
    }
}

function searchCreateTable(obj) {
    let charName = document.createElement('h3');
    let tableOfChar = document.createElement('table');
    let div = document.createElement('div');

    for (let key in obj) {
        let trKeyAndValue = document.createElement('tr');
        let tdKey = document.createElement('td');
        let tdValue = document.createElement('td');

        charName.innerText = obj.name;
        tdKey.innerText = key;
        tdValue.innerText = obj[key];

        trKeyAndValue.appendChild(tdKey);
        trKeyAndValue.appendChild(tdValue);
        tableOfChar.before(charName);
        tableOfChar.appendChild(trKeyAndValue);
        div.appendChild(tableOfChar);
    }
    return div;
}





