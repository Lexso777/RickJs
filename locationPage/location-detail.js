




const type = document.getElementById('type');
const dimension = document.getElementById('dimension');
const ResidentsBox = document.getElementById('Residents__box');
const locationName = document.getElementById('location__name');
let currentCharacterShow = 20;
let residents = [];

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
let id = getQueryParam('id');


async function getLocation(){

    const responce = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
    const locationApi = await responce.json();

    locationName.textContent = locationApi.name;
    type.textContent = locationApi.type;
    dimension.textContent = locationApi.dimension;

    
    console.log(locationApi);
    const residentsResponses = await Promise.all(locationApi.residents.map(url => fetch(url)));
    const residentsData = await Promise.all(residentsResponses.map(res => res.json()));

    residents.push(...residentsData)

    displayCharacters(residents);


}

getLocation();

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


document.getElementById('buttonShowMore').addEventListener('click', function() {
    currentCharacterShow = currentCharacterShow + 20;
    displayCharacters(residents);
});



function displayCharacters(arr) {

    ResidentsBox.innerHTML = ''

    arr.slice(0,currentCharacterShow).forEach(element => {

        const a = document.createElement('a');
        const div = document.createElement('div');
        const name = document.createElement('div');
        const species = document.createElement('div');
        const img = document.createElement('img');

        a.href = ('../characterPage/character-detail.html?id=' + element.id);
        div.classList.add('characterCard');
        img.classList.add('characterCard__img');
        name.classList.add('characterCard__name');
        species.classList.add('characterCard__species');

        name.textContent = element.name
        species.textContent = element.species;
        img.src = element.image;

        ResidentsBox.appendChild(a);
        a.appendChild(div);
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(species);
    })

    if (arr.length <= currentCharacterShow) {
        buttonShowMore.classList.add('no-more-characters');
    } else {
        buttonShowMore.classList.remove('no-more-characters');
    }
}


