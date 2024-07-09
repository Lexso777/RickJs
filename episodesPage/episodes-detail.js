const episodeName = document.getElementById('episode__name');
const episode = document.getElementById('episode');
const date = document.getElementById('date');
const castBox = document.getElementById('Cast__box');
let cast = [];
let currentCharacterShow = 20;

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

let id = getQueryParam('id');


async function getEpisode(){

    const responce = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
    const apiEpisode = await responce.json();

    episodeName.textContent = apiEpisode.name;
    episode.textContent = apiEpisode. episode;
    date.textContent = apiEpisode.air_date;

    const castResponce = await Promise.all(apiEpisode.characters.map(url => fetch(url)));
    const castData = await Promise.all(castResponce.map(res => res.json()));

    cast.push(...castData);

    displayCharacters(cast);
}
getEpisode()

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
    displayCharacters(cast);
});



function displayCharacters(arr) {

    castBox.innerHTML = ''

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

        castBox.appendChild(a);
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
