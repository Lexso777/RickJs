"use strict"



const characterBox = document.getElementById('CharactersBox');
const input = document.getElementById('input');
let currentCharacterShow = 20;
let filteredCharacters = [];


const characters = [];

async function getChracters() {

    const response = await fetch(`https://rickandmortyapi.com/api/character`);
    const apiResponse = await response.json();
    const pages = apiResponse.info.pages;
    
    const fetchPromise = [];

    for(let i = 1; i <= pages; i++){
        fetchPromise.push(fetch(`https://rickandmortyapi.com/api/character/?page=${i}`));
    }

    const responses = await Promise.all(fetchPromise);

    for(const response of responses){
        const characterResponce = await response.json();
        characters.push(...characterResponce.results);
    }
    filteredCharacters = characters
    displayCharacters(filteredCharacters);
}
getChracters();

document.getElementById('buttonShowMore').addEventListener('click', function() {
    currentCharacterShow = currentCharacterShow + 20;
    displayCharacters(filteredCharacters);
});


document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector('.burger__btn');
    const nav = document.querySelector('.nav');

    function toggleNav() {
        if (window.innerWidth <= 767) {
            nav.classList.toggle('open');
            burgerBtn.classList.toggle('open');
        }
    }

    burgerBtn.addEventListener('click', toggleNav);

    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            nav.classList.remove('open');
            burgerBtn.classList.remove('open');
        }
    });
});


function filterCharacters(word, character){

    return character.filter(c => {

        const regex = new RegExp(word, 'gi');
        return c.name.match(regex);
    })
}

function displayOptions(){

    filteredCharacters = filterCharacters(this.value, characters);
    currentCharacterShow = 20;
    displayCharacters(filteredCharacters)
}

input.addEventListener('keyup', displayOptions)


function displayCharacters(arr) {

    characterBox.innerHTML = ''

    arr.slice(0,currentCharacterShow).forEach(element => {

        const a = document.createElement('a');
        const div = document.createElement('div');
        const name = document.createElement('div');
        const species = document.createElement('div');
        const img = document.createElement('img');

        a.href = ('character-detail.html?id=' + element.id);
        div.classList.add('characterCard');
        img.classList.add('characterCard__img');
        name.classList.add('characterCard__name');
        species.classList.add('characterCard__species');

        name.textContent = element.name
        species.textContent = element.species;
        img.src = element.image;

        characterBox.appendChild(a);
        a.appendChild(div);
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(species);
    })
}

