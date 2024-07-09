

const characterInfo = document.getElementById('character__info');
const name = document.getElementById('character__name');
const img = document.getElementById('character__img');
const gender = document.getElementById('gender__name');
const status = document.getElementById('status');
const specie = document.getElementById('specie');
const origin = document.getElementById('origin');
const type = document.getElementById('type');
const locations = document.getElementById('locations');
const location_link = document.getElementById('location_link');

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
let id = getQueryParam('id');
let locationId = '';
let episodes = [];

async function getChracter() {

    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const apiResponce = await response.json();

    console.log(apiResponce)

    if (apiResponce.location.url) {
        const locationUrl = await fetch(apiResponce.location.url);
        const locationid = await locationUrl.json();
        locationId = locationid.id;
    }

    const episodeUrlsString = JSON.stringify(apiResponce.episode);
    const apiEpisodes = JSON.parse(episodeUrlsString);


    const episodeRequests = apiEpisodes.slice(0, 4).map(url => fetch(url));
    const episodeResponse = await Promise.all(episodeRequests);


    episodes = await Promise.all(episodeResponse.map(response => response.json()));


    displayCharacter(apiResponce)
    displayEpisodes(episodes);

}
getChracter()


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


function displayCharacter(arr) {

    if (arr.type === '') {
        arr.type = 'Unknown';
    }
    if (locationId === '') {
        location_link.classList.add('disabled');
    }

    name.textContent = arr.name;
    img.src = arr.image;
    gender.textContent = arr.gender;
    status.textContent = arr.status;
    specie.textContent = arr.species;
    origin.textContent = arr.origin.name;
    type.textContent = arr.type;
    locations.textContent = arr.location.name;
    location_link.href = (`../locationPage/location-detail.html?id=` + locationId); 

}


    
const episodesBox = document.getElementById('additional__episodes');



function displayEpisodes(arr) {
    arr.forEach(element => {

        const div = document.createElement('div');
        const seriesNumber = document.createElement('div');
        const seriesName = document.createElement('div');
        const seriesData = document.createElement('div');
        const line = document.createElement('div');
        const arrowRight = document.createElement('div');
        const link = document.createElement('a');


        div.classList.add('additional__specification');
        seriesNumber.classList.add('additional__title');
        seriesName.classList.add('additional__name');
        seriesData.classList.add('additional__date');
        line.classList.add('border__line');
        arrowRight.classList.add('arrow_right');


        seriesNumber.textContent = element.episode;
        seriesName.textContent = element.name;
        seriesData.textContent = element.air_date;  
        link.href = `../episodesPage/episodes-detail.html?id=${element.id}`;

        link.innerHTML = `
        <svg width="7.410034" height="12.000000" viewBox="0 0 7.41003 12" fill="none"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs />
            <path id="↳Color" d="M1.41 0L0 1.41L4.57 6L0 10.59L1.41 12L7.41 6L1.41 0Z"
                fill="#8E8E93" fill-opacity="1.000000" fill-rule="evenodd" />
            <path id="↳Color" d="M0 1.41L4.57 6L0 10.59L1.41 12L7.41 6L1.41 0L0 1.41Z"
                stroke="#979797" stroke-opacity="0" stroke-width="0.000000" />
        </svg>
    `;

        episodesBox.appendChild(div)
        div.appendChild(seriesNumber);
        div.appendChild(arrowRight);
        arrowRight.appendChild(link);
        div.appendChild(seriesName);
        div.appendChild(seriesData);
        div.appendChild(line);
    });

}










