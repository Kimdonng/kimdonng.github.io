//NewYork = 40.7128,-74.0060
//Seoul = 37.5665,126.9780
getWeather(40.7128,-74.0060);
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
  getWeather(crd.latitude,crd.longitude);
  getlocation(crd.latitude,crd.longitude)
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

function getlocation(lat, long){
  fetch(`https://my-location.org/?lat=${lat}&lng=${long}`)
}
navigator.geolocation.getCurrentPosition(success, error, options);
function getWeather(lat, long) {
    API_KEY="78bb78e1cce7f39f91e9b3fceaefc452"
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const temp = Math.round(data.main.temp);
      const weathers = data.weather[data.weather.length -1];
      const name = data.name;
      const country = data.sys.country;
      console.log(temp);
      console.log(weathers.icon);
      var nowlocation = document.getElementById("nowlocation");
      nowlocation.innerHTML = `${name} ${country}`;
      var tempdisplay = document.getElementById("temp");
      tempdisplay.innerHTML = `${temp}°C ${weathers.main}`;
      var imgIcon = document.getElementById("weatherIcon");
      imgIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
    })
}
