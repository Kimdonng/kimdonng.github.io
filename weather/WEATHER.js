//NewYork = 40.7128,-74.0060
//Seoul = 37.5665,126.9780
var map;
var country;
var syscountry;
var gps_accur;
var level;
var kakaoscope;
var feels_like_data = [{'deg':null},{'deg':null},{'deg':null},{'deg':null},{'deg':null},{'deg':null},{'deg':null},{'deg':null}];
var humidity_data = [{'humidity':null},{'humidity':null},{'humidity':null},{'humidity':null},{'humidity':null},{'humidity':null},{'humidity':null},{'humidity':null}];
var hour;
var unix;
var dayofweek;
var dayofweektostring = [{'str':'Sunday'},{'str':'Monday'},{'str':'Tuesday'},{'str':'Wednesday'},{'str':'Thursday'},{'str':'Friday'},{'str':'Saturday'}];
var week;
var forecast;
var timezone;
get(37.5665,126.9780);
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
var unix_time;
function get(lat,lon){
  getWeather(lat,lon);
  getForecast(lat,lon);
}

function success(pos) {
  var crd = pos.coords;
  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
  gps_accur = crd.accuracy;
  let lat= crd.latitude;
  let lon = crd.longitude;
  get(lat,lon);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};
navigator.geolocation.getCurrentPosition(success, error, options);
function getWeatherbycity(cityname){
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=78bb78e1cce7f39f91e9b3fceaefc452&units=metric`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    lat = data.coord.lat;
    lon = data.coord.lon;
    timezone = data.timezone;
    var temp = Math.round(data.main.temp);
    var weathers = data.weather[data.weather.length -1];
    var name = data.name;
    syscountry = data.sys.country;
    country = countrycode.result.find(element => element.code == data.sys.country).name;
    console.log(temp);
    console.log(weathers.icon);
    var feel = document.getElementById("feel");
    feel.innerHTML = weathers.main;
    var nowlocation = document.getElementById("nowlocation");
    nowlocation.innerHTML = ` ${name}, ${country}`;
    var tempdisplay = document.getElementById("temp");
    tempdisplay.innerHTML = `${temp}&#176C`;
    var imgIcon = document.getElementById("weatherIcon");
    imgIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
    unix = data.dt+data.timezone;
    console.log(unix);
    unix_time = new Date(unix * 1000).getUTCHours();
    console.log(unix_time);
    getForecast(lat,lon);
    getmap(lat,lon);
  })
}
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=78bb78e1cce7f39f91e9b3fceaefc452&units=metric`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      timezone = data.timezone;
      var temp = Math.round(data.main.temp);
      var weathers = data.weather[data.weather.length -1];
      var name = data.name;
      syscountry = data.sys.country;
      country = countrycode.result.find(element => element.code == data.sys.country).name;
      console.log(temp);
      console.log(weathers.icon);
      var feel = document.getElementById("feel");
      feel.innerHTML = weathers.main;
      var nowlocation = document.getElementById("nowlocation");
      nowlocation.innerHTML = ` ${name}, ${country}`;
      var tempdisplay = document.getElementById("temp");
      tempdisplay.innerHTML = `${temp}&#176C`;
      var imgIcon = document.getElementById("weatherIcon");
      imgIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
      unix = data.dt+data.timezone;
      console.log(unix);
      unix_time = new Date(unix * 1000).getUTCHours();
      console.log(unix_time);
      getmap(lat,lon);
    })
}
function getForecast(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=78bb78e1cce7f39f91e9b3fceaefc452&units=metric`)
  .then(res => res.json())
  .then(data => {
    hour = [{"hour":1, "id":"hour1","img_id":"hourimg1","temp":null,"temp_id":"hour1_temp","weather":null,"dt":null,"dt_txt":null,"main":null,"visibility":null,"wind":null},
    {"hour":2, "id":"hour2","img_id":"hourimg2","temp":null,"temp_id":"hour2_temp","weather":null,"dt":null,"dt_txt":null,"main":null,"visibility":null,"wind":null},
    {"hour":3, "id":"hour3","img_id":"hourimg3","temp":null,"temp_id":"hour3_temp","weather":null,"dt":null,"dt_txt":null,"main":null,"visibility":null,"wind":null},
    {"hour":4, "id":"hour4","img_id":"hourimg4","temp":null,"temp_id":"hour4_temp","weather":null,"dt":null,"dt_txt":null,"main":null,"visibility":null,"wind":null},
    {"hour":5, "id":"hour5","img_id":"hourimg5","temp":null,"temp_id":"hour5_temp","weather":null,"dt":null,"dt_txt":null,"main":null,"visibility":null,"wind":null},
    {"hour":6, "id":"hour6","img_id":"hourimg6","temp":null,"temp_id":"hour6_temp","weather":null,"dt":null,"dt_txt":null,"main":null,"visibility":null,"wind":null},
    {"hour":7, "id":"hour7","img_id":"hourimg7","temp":null,"temp_id":"hour7_temp","weather":null,"dt":null,"dt_txt":null,"main":null,"visibility":null,"wind":null},
    {"hour":8, "id":"hour8","img_id":"hourimg8","temp":null,"temp_id":"hour8_temp","weather":null,"dt":null,"dt_txt":null,"main":null,"visibility":null,"wind":null}];
    console.log(data);
    forecast = data;
    unix_time = unix_time+0.1;
    let display_hour = Math.ceil(unix_time/3)*3;
    console.log(display_hour);
    let dt = new Date(data.list[0].dt*1000).getUTCHours();
    console.log(dt);
    for(let i = 0; i<8; i++){
      let sel_hour = hour.find(findhour => findhour.hour == i+1);
      let sel = data.list[i];
      let city = data.city;
      sel_hour.temp = Math.round(sel.main.temp);
      sel_hour.weather = sel.weather;
      sel_hour.main = sel.main;
      sel_hour.visibility = sel.visibility;
      sel_hour.wind = sel.wind;
      let nowdt = sel.dt+city.timezone;
      nowdt = new Date(nowdt*1000).getUTCHours();
      console.log(nowdt);
      sel_hour.dt = nowdt.toString();
      console.log(sel_hour);
      let time = document.getElementById(sel_hour.id);
      let clock = sel_hour.dt;
      if(clock > 12){
        time.innerHTML = `${clock-12}PM`;
        hour[i].dt_txt = `${clock-12}PM`;
      }else if(clock == 12){
        time.innerHTML = "12PM";
        hour[i].dt_txt = "12PM";
      }else{
        if(clock == 0){
          time.innerHTML = "12AM";
          hour[i].dt_txt = "12AM";
        }else{
          time.innerHTML = `${clock.slice(0,2)}AM`;
          hour[i].dt_txt = `${clock.slice(0,2)}AM`;
        }
      }
      let icon = document.getElementById(sel_hour.img_id);
      let img = sel_hour.weather[0].icon;
      icon.src = `https://openweathermap.org/img/wn/${img}@2x.png`;
      let hour_temp = document.getElementById(sel_hour.temp_id);
      let hour_temps = sel_hour.temp;
      hour_temp.innerHTML = `${hour_temps}&#176`;
      //time.innerHTML = `${clock}°C`;
      //let imgIcon = document.getElementById("weatherIcon");
      //imgIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
      feels_like_data[i] = sel_hour.main.feels_like;
      humidity_data[i] = sel_hour.main.humidity;
    }
    console.log(feels_like_data);
    console.log(humidity_data);
    document.getElementById('feels_like_canvas').innerHTML = '<canvas id = "chart"></canvas>';
    document.getElementById('humid_canvas').innerHTML = '<canvas id = "chart2"></canvas>';
    feels_like(feels_like_data);
    humidity(humidity_data);
    getweek();
    for(let i=0;i<5;i++){
      let dayofweek_label = document.getElementById(`day${i+1}label`);
      if(new Date((forecast.list[0].dt+timezone)*1000).getUTCDay()+i<7){
        dayofweek_label.innerHTML = dayofweektostring[new Date((forecast.list[0].dt+timezone)*1000).getUTCDay()+i].str;
      }else{
        dayofweek_label.innerHTML = dayofweektostring[new Date((forecast.list[0].dt+timezone)*1000).getUTCDay()+i-7].str;
      }
      document.getElementById(`day${i+1}humid`).innerHTML = `${Math.ceil(week[i].humid_ave)}%`;
      if(week[i].icon != null){
        document.getElementById(`day${i+1}icon`).style = "width:50px; height:50px;";
        document.getElementById(`day${i+1}icon`).src = `https://openweathermap.org/img/wn/${week[i].icon}d@2x.png`;
        if(week[i].icon2 != null){
          document.getElementById(`day${i+1}icon2`).style = "display:block; width:50px; height:50px;";
          document.getElementById(`day${i+1}icon2`).src = `https://openweathermap.org/img/wn/${week[i].icon2}d@2x.png`;
        }else{
          document.getElementById(`day${i+1}icon`).style = "display:block; margin-left:25px; margin-right:25px; width:50px; height:50px;";
          document.getElementById(`day${i+1}icon2`).style = "display:none;";
        }
      }else{
        document.getElementById(`day${i+1}icon`).style = "display:none";
        document.getElementById(`day${i+1}icon2`).style = "display:none";
      }
      document.getElementById(`day${i+1}temp`).innerHTML = `${Math.ceil(week[i].temp_max)}&#176`;
      document.getElementById(`day${i+1}temp_min`).innerHTML = `${Math.ceil(week[i].temp_min)}&#176`;
    }
  })
}
function getmap(lat, lon){
  scope = {"list" : [{"level":1,"m":20},{"level":2,"m":30},{"level":3,"m":50},{"level":4,"m":100},
  {"level":5,"m":250},{"level":6,"m":500},{"level":7,"m":1000},{"level":8,"m":2000},{"level":9,"m":4000},
  {"level":10,"m":8000},{"level":11,"m":16000},{"level":12,"m":32000},{"level":13,"m":64000},{"level":14,"m":128000}]};
  if(gps_accur != null){
    for(let i = 0;i<=14;i++){
      console.log(i);
      if (scope.list[i].m > gps_accur){
        if(i > 0){
          level = scope.list[i-1].level;
          console.log(level);
          break;
        }else{
          level = scope.list[i].level;
          console.log(level);
          break;
        }
      }
    }
  }else{
    console.log("gps is not turned");
  }
  var kakaomap_element = document.getElementById("kakao_map");
  var leaflet_element = document.getElementById("leaflet");
  kakaomap_element.innerHTML = "";
  leaflet_element.innerHTML = "";
  if(gps_accur != null){
    if(syscountry == "KR"){
      kakaomap_element.innerHTML = "";
      leaflet_element.innerHTML = "";
      leaflet_element.style.display = "none";
      kakaomap_element.style.display = "block";
      var kakao_content = '<img draggable="false" src="img/mark.png" id="marker" style="min-width: 0px; min-height: 0px; max-width: 99999px; max-height: none; border: 0px; display: block; position: absolute; user-select: none; -webkit-user-drag: none; filter: drop-shadow(0 0 0.15rem grey); top: -10px; left: -10px; width: 20px; height: 20px;">'
      var container = document.getElementById('kakao_map');
      var options = {
        center: new kakao.maps.LatLng(lat,lon),
        //draggable: false,
        level: level
        //map.setZoomable();
      };
      var map = new kakao.maps.Map(container, options);
      var mapOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(lat,lon),
        content: kakao_content
      });
      mapOverlay.setMap(map);
      var circle = new kakao.maps.Circle({
        center : new kakao.maps.LatLng(lat, lon),  // 원의 중심좌표 입니다
        radius: gps_accur, // 미터 단위의 원의 반지름입니다
        strokeWeight: 1, // 선의 두께입니다
        strokeColor: '#0099ff', // 선의 색깔입니다
        strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'line',//'dashed', // 선의 스타일 입니다
        fillColor: '#61a2ff', // 채우기 색깔입니다
        fillOpacity: 0.3  // 채우기 불투명도 입니다
      });
      circle.setMap(map);
      // 지도에 원을 표시

    }else{
      kakaomap_element.innerHTML = "";
      leaflet_element.innerHTML = "";
      leaflet_element.style.display = "block";
      kakaomap_element.style.display = "none";
      var map = L.map('leaflet').setView([lat, lon], 20-level);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      var circle = L.circle([lat, lon], {
        fillColor: '#9cc3ff',
        fillOpacity: 0.3,
        radius: gps_accur
      }).addTo(map);
    }
  }else{
    if(syscountry == "KR"){
      if(kakaomap_element.hasChildNodes()){
        kakaomap_element.removeChild();
      }
      kakaomap_element.innerHTML = '';
      leaflet_element.innerHTML = '';
      leaflet_element.style.display = "none";
      kakaomap_element.style.display = "block";
      var container = kakaomap_element;
      var options = {
        center: new kakao.maps.LatLng(lat,lon),
        draggable: false,
        level: 7
        //map.setZoomable();
      };
      var map = new kakao.maps.Map(container, options);
    }else{
      kakaomap_element.innerHTML = '';
      leaflet_element.innerHTML = '';
      leaflet_element.style.display = "block";
      kakaomap_element.style.display = "none";
      console.log(L);
      var container = L.DomUtil.get('leaflet');
      if(container != null){
        container._leaflet_id = null;
      }
      var map = L.map('leaflet').setView([lat, lon], 20-7);
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }
  }
  /*
  var container = document.getElementById('map');
	var options = {
		center: new kakao.maps.LatLng(lat,lon),
		level: 3
    //map.setDraggable(false);
    //map.setZoomable(false);
	};
	var map = new kakao.maps.Map(container, options);
  */
}
function dayofweek_write(day){
  for(let i = 0;i<5;i++){
    let dayofweek_label = document.getElementById(`day${i+1}label`);
    dayofweek_label.innerHTML = dayofweektostring[day+i].str;
  }
}
function getweek(){
  //forecast.list[0].dt = forecast.list[0].dt-300000
  week = [{'temp_max':null,'temp_min':null,'humid_ave':null,'icon':null,'icon2':null},
  {'temp_max':null,'temp_min':null,'humid_ave':null,'icon':null,'icon2':null},
  {'temp_max':null,'temp_min':null,'humid_ave':null,'icon':null,'icon2':null},
  {'temp_max':null,'temp_min':null,'humid_ave':null,'icon':null,'icon2':null},
  {'temp_max':null,'temp_min':null,'humid_ave':null,'icon':null,'icon2':null}];
  week_temp_max(week);
  week_temp_min(week);
  week_humid_ave(week);
  week_icon(week);
  return week;
}
function week_temp_max(){
  for(let i = 0;i<5;i++){
    for(let ii = 0;ii<8;ii++){
      forecast.list[(ii)+(i*8)]
      if(week[i].temp_max != null){
        if(week[i].temp_max < forecast.list[(ii)+(i*8)].main.temp_max){
          week[i].temp_max = forecast.list[(ii)+(i*8)].main.temp_max;
        }
      }else{
        week[i].temp_max = forecast.list[(ii)+(i*8)].main.temp_max;
      }
    }
  }
}
function week_temp_min(){
  for(let i = 0;i<5;i++){
    for(let ii = 0;ii<8;ii++){
      if(i == 0 && ii == 0){
        ii = 8-(8-(Math.ceil((new Date((forecast.list[0].dt+timezone)*1000).getUTCHours())/3)*3)/3);
      }
      forecast.list[(ii)+(i*8)]
      if(week[i].temp_min != null){
        if(week[i].temp_min > forecast.list[(ii)+(i*8)].main.temp_min){
          week[i].temp_min = forecast.list[(ii)+(i*8)].main.temp_min;
        }
      }else{
        week[i].temp_min = forecast.list[(ii)+(i*8)].main.temp_min;
      }
    }
  }
}
function week_humid_ave(){
  var sum = 0;
  for(let i = 0;i<5;i++){
    for(let ii = 0;ii<8;ii++){
      if(i == 0 && ii == 0){
        ii = 8-(8-(Math.ceil((new Date((forecast.list[0].dt+timezone)*1000).getUTCHours())/3)*3)/3);
      }
      sum = sum+forecast.list[(ii)+(i*8)].main.humidity;
    }
    if(i==0){
      week[i].humid_ave = sum/(8-(Math.ceil((new Date((forecast.list[0].dt+timezone)*1000).getUTCHours())/3)*3)/3);
    }else{
      week[i].humid_ave = sum/8
    }
    sum = 0;
  }
}
function week_icon(){
  var mode = [{},{},{},{},{},{},{},{}];
  var mode_sel = [{'png':'01','time':0},{'png':'02','time':0},{'png':'03','time':0},{'png':'04','time':0},{'png':'09','time':0},{'png':'10','time':0},{'png':'11','time':0},{'png':'13','time':0},{'png':'50','time':0}];
  for(let i = 0;i<5;i++){
    for(let ii = 0;ii<8;ii++){
      if(i == 0 && ii == 0){
        ii = 8-(8-(Math.ceil((new Date((forecast.list[0].dt+timezone)*1000).getUTCHours())/3)*3)/3);
      }
      mode[ii] = forecast.list[(ii)+(i*8)].weather[0].icon.slice(0,2);
    }
    mode.sort((a,b) => (a-b));
    for(let ii = 0;ii<8;ii++){
      if(i == 0 && ii == 0){
        ii = 8-(8-(Math.ceil((new Date((forecast.list[0].dt+timezone)*1000).getUTCHours())/3)*3)/3);//--this code might be make error
      }
      if(mode[ii] == mode[ii+1] || mode[ii] != null){
        mode_sel.find(ele => ele.png == mode[ii]).time = mode_sel.find(ele => ele.png == mode[ii]).time + 1;
        console.log(mode_sel.find(ele => ele.png == mode[ii]).time);
      }
    }
    for(let ii = 0;ii<9;ii++){
      if(mode_sel[ii] != null){
        if(week[i].icon != null){
          if(mode_sel.find(ele => ele.png == week[i].icon).time < mode_sel[ii].time){
            week[i].icon = mode_sel[ii].png;
            week[i].icon2 = null;
          }else if(mode_sel.find(ele => ele.png == week[i].icon).time == mode_sel[ii].time && mode_sel.find(ele => ele.png == week[i].icon).time != 0){
            if(week[i].icon1 != mode_sel[ii].png){
              week[i].icon2 = mode_sel[ii].png;
            }
          }
        }else{
          week[i].icon = mode_sel[ii].png;
        }
      }
    }
    console.log(mode);
    console.log(mode_sel);
    mode_sel = [{'png':'01','time':0},{'png':'02','time':0},{'png':'03','time':0},{'png':'04','time':0},{'png':'09','time':0},{'png':'10','time':0},{'png':'11','time':0},{'png':'13','time':0},{'png':'50','time':0}];
    mode = [{},{},{},{},{},{},{},{}];
  }
}
