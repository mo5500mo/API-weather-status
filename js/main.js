
let searchIco = document.getElementById('mySearch');
let btnIco = document.getElementById('myBtn');



let weather = [];
let myDate = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getWeather(e) {
    let myHttp = new XMLHttpRequest;
    myHttp.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=443800131c974fadb4331557221510&q=${e}&days=4&aqi=no&alerts=no`);
    myHttp.send();

    myHttp.addEventListener("readystatechange", function () {
        if (myHttp.status == 200 && myHttp.readyState == 4) {
            weather = JSON.parse(myHttp.response);
            
            console.log(weather);
            displayData(weather);

        }

    })


}

getWeather('cairo');

function displayData(x) {
    temp = ``;
    for (let i = 0; i < 1; i++) {

        temp += `
            <div class="col-md-3 card1  my-5" id = "myCard">
                <div class="card-header ">
                    <div class="d-flex justify-content-between mx-2 pt-2">
                        <p>${weekDays[myDate.getDay()]}</p>
                        <p>${myDate.getDate()}${monthNames[myDate.getMonth()]}</p>
                    </div>
                </div>
                <div class="mx-3 my-5">
                    <div class="card-body">
                        <p class="fw-bold">${x.location.name}</p>
                        <div class = "d-flex justify-content-between">
                        <h1 class="fw-bolder">${x.forecast.forecastday[i].day.avgtemp_c}C</h1>
                        <img src=${x.forecast.forecastday[i].day.condition.icon} alt="">
                        </div>
                        <p>${x.forecast.forecastday[i].day.condition.text}</p>
                    </div>
                    <div class="card-footer d-lg-flex">
                        <div class="sec1 d-flex">
                            <img src="assets/img/icon-umberella.png" width="20px" height="25px" alt="">
                            <p class="ms-2">20%</p>
                        </div>
                        <div class="sec2 mx-lg-3 mx-sm-0 d-flex">
                            <img src="assets/img/icon-wind.png" width="20px" height="25px" alt="">
                            <p class="ms-2">${x.current.wind_kph}km/h</p>
                        </div>
                        <div class="sec3 d-flex">
                            <img src="assets/img/icon-compass.png" width="20px" height="25px" alt="">
                            <p class="ms-2">${x.current.wind_dir}</p>
                        </div>
                    </div>
                </div>
            </div>`


    }

    for (let i = 1; i < 4; i++) {

        let a = myDate.getDay();
        let b = a + i;
        if (b >= 7) {
            b = -2 + i;
        }
        else {
            b = a + i
        }
        temp += `
            <div class="col-md-3 card2  my-5" id = "myCard">
                <div class="card-header ">
                    <div class="d-flex justify-content-center mx-2 pt-2">
                        <p>${weekDays[b]}</p>
                    </div>
                </div>
                <div class="mx-3 my-5">
                    <div class="card-body text-center ">
                        <img src=${x.forecast.forecastday[i].day.condition.icon} alt="">
                        <h1 class="myh1">${x.forecast.forecastday[i].day.avgtemp_c}C</h1>
                        <p>${x.forecast.forecastday[i].day.condition.text}</p>
                    </div>
                    
                </div>
            </div>`


    }
    document.getElementById('myCards').innerHTML = temp;
}


searchIco.addEventListener('input', function () {
    getWeather(searchIco.value);

})
