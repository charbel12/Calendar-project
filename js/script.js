const form = document.querySelector('form');
const input = document.querySelector('input');
const imagesSection = document.querySelector('.images');
const loadingImage = document.querySelector('#loadingImage');

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}


function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
loadingImage.style.display = 'none';


form.addEventListener('submit', formSubmitted);

function formSubmitted() {
    event.preventDefault();
    const searchTerm = input.value;
    console.log(searchTerm);
    search(searchTerm).then(displayImages);
}

function search(searchTerm) {
    loadingImage.style.display = '';
    imagesSection.innerHTML = '';
    return fetch(
            `https://pixabay.com/api/?key=11493426-2cdb0244bb87550715119519b&q=${searchTerm}&image_type=photo&pretty=true`
        )
        .then(res => res.json())
        .then(result => {
            loadingImage.style.display = 'none';
            return result.hits;
        });
}

function displayImages(pics) {
    for (let i = 0; i < 2; i++) {
        let pic = pics[i];
        const img = new Image();
        const imageElement = document.createElement('img');
        imageElement.style.height = '200px';
        imageElement.style.width = '350';
        imageElement.style.padding = '0px 0px 10px 10px';
        imageElement.src = pic.webformatURL;
        imagesSection.appendChild(imageElement);
    }
}