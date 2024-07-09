let locations = [];

const locationBox = document.getElementById('LocationsBox');
const input = document.getElementById('input');

let currentLocationsShow = 20;
let filteredLocations = [];

async function getLocations(){

    const responce = await fetch(`https://rickandmortyapi.com/api/location`);
    const apiResponce = await responce.json();
    const pages = apiResponce.info.pages;


    const fetchPromise = [];

    for(let i = 1; i <= pages; i++){
        fetchPromise.push(fetch(`https://rickandmortyapi.com/api/location?page=${i}`));
    }

    const responses = await Promise.all(fetchPromise)

    for(const response of responses){
        const locationResponce = await response.json();
        locations.push(...locationResponce.results);
    }
    filteredLocations = locations;
    displayLocations(locations);
}

getLocations();

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
    currentLocationsShow = currentLocationsShow + 20;
    displayLocations(filteredLocations);
});


function filterLocations(word, locations){

    return locations.filter(l => {

        const regex = new RegExp(word, 'gi');
        return l.name.match(regex);
    })
}

function displayOptions(){

    filteredLocations = filterLocations(this.value, locations)
    currentLocationsShow = 20;
    displayLocations(filteredLocations);
}

input.addEventListener('keyup', displayOptions);


function displayLocations(arr){

    locationBox.innerHTML = '';

    arr.slice(0,currentLocationsShow).forEach(element => {

        const a = document.createElement('a');
        const div = document.createElement('div');
        const name = document.createElement('div');
        const type = document.createElement('div');

        a.classList.add('locationCard');
        name.classList.add('locationCard__name');
        type.classList.add('locationCard__type');

        a.href = (`../locationPage/location-detail.html?id=` + element.id);
        name.textContent = element.name;
        type.textContent = element.type;
        
        
        locationBox.appendChild(a);
        a.appendChild(div);
        div.appendChild(name);
        div.appendChild(type);

    });
}