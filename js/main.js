const cards = document.getElementById("cards")
let searchInp=document.getElementById("searchInp")

async function getWeather(location) {


    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bacc653bd42342e2a37155053240911&q=${location}&days=3`)

    if( response.status!= 200) return
    const result = await response.json()
    
    displayWeather(result)
    searchInp.value=""

}

function success(position) {

    const location = `${position.coords.latitude},${position.coords.longitude}`
    getWeather(location)
    


}


function displayWeather(result) {
    const days = result.forecast.forecastday
    let cartona = '';
    const now = new Date()



    for (let [index, day] of days.entries()) {
        const date = new Date(day.date)


        cartona += `
        
         <div class="col-md-4">
                    <div class="cards ">
                        <div class="card  mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent  d-flex justify-content-between text-white">
                                <div class="day">${date.toLocaleDateString('en-us', { weekday: 'long' })}</div>
                                <div class ="date">${date.getDate()}${date.toLocaleDateString('en-us', { month: 'short' })}</div>
                            </div>

                            <div class="card-body text-white py-2">
                                <div class="location">${result.location.name}</div>
                                <h5 class="card-title degree">${day.hour[now.getHours()].temp_c}°C</h5>
                                <img src="./imgs/conditions/${day.day.condition.text}.svg" width="70" alt="">
                                <div class="card-text text-info">${day.day.condition.text}</div>
                                <div class="weather-details mb-2">
                                    <span><img src="imgs/icon-umberella.png" alt="">${day.hour[now.getHours()].humidity}%</span>
                                    <span><img src="imgs/icon-wind.png" class="degree" alt=""> 18km/h </span>
                                    <span><img src="imgs/icon-compass.png" alt=""> East </span>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>
        
        
        
        `


    }
    cards.innerHTML = cartona

}

window.addEventListener("load", function () {
    navigator.geolocation.getCurrentPosition(success)
})

searchInp.addEventListener("blur", function () {
   getWeather(this.value)
});
