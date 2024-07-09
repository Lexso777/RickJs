
const episodesBox = document.getElementById('EpisodesBox');
const input = document.getElementById('input');

let episodes = [];
let currentEpisodesToShow = 20;
let filteredEpisodes = [];



async function getEpisodeds(){

    const response = await fetch(`https://rickandmortyapi.com/api/episode`);
    const apiResponse = await response.json();
    const pages = apiResponse.info.pages;
    

    const fetchPromise = [];

    for(let i = 1; i <= pages; i++){
        fetchPromise.push(fetch(`https://rickandmortyapi.com/api/episode/?page=${i}`));
    }

    const responses = await Promise.all(fetchPromise);

    for(const response of responses){
        const episodesResponse = await response.json();
        episodes.push(...episodesResponse.results);
    }
    filteredEpisodes = episodes;
    displayEpisodes(episodes);
}
getEpisodeds();


document.getElementById('buttonShowMore').addEventListener('click', function() {
    currentEpisodesToShow = currentEpisodesToShow + 20;
    displayEpisodes(filteredEpisodes);
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



function filterEpisodes(word, episodes){
    return episodes.filter(e =>{

        const regex = new RegExp(word, 'gi');
        return e.name.match(regex);
    })
}

function displayOptions(){
        filteredEpisodes = filterEpisodes(this.value, episodes);
        currentEpisodesToShow = 20; 
        displayEpisodes(filteredEpisodes);
}


input.addEventListener('keyup', displayOptions);


function displayEpisodes(arr){

    episodesBox.innerHTML = '';

    arr.slice(0,currentEpisodesToShow).forEach(element => {

        const a = document.createElement('a');
        const div = document.createElement('div');
        const name = document.createElement('div');
        const date = document.createElement('div');
        const seriesNumber = document.createElement('div');
        
        a.classList.add('episodesCard');
        name.classList.add('episodesCard__name');
        date.classList.add('episodesCard__date');
        seriesNumber.classList.add('episodesCard__seriesNumber');


        name.textContent = element.name;
        date.textContent = element.air_date;
        seriesNumber.textContent = element.episode;
        a.href = ("../episodesPage/episodes-detail.html?id=" + element.id);

        episodesBox.appendChild(a);
        a.appendChild(div)
        div.appendChild(name);
        div.appendChild(date);
        div.appendChild(seriesNumber);
    });
}