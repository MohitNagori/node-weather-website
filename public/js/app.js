console.log('çlient side javascript file is loaded !!!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

const fetchWeather = (address) => {
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageTwo.textContent = '';        
    if (!location) {
        messageOne.textContent = 'Please provide some location';
    } else {
        messageOne.textContent = 'Loading...';
        fetchWeather(location);
    } 
})