var ctx = document.getElementById('chart');
var a = '3';
var myChart;
function feels_like(feels_like_data){
  ctx = document.getElementById('chart');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [hour[0].dt_txt, hour[1].dt_txt, hour[2].dt_txt, hour[3].dt_txt, hour[4].dt_txt, hour[5].dt_txt, hour[6].dt_txt, hour[7].dt_txt],
      datasets: [{
        label: 'feels_like',
        data: [feels_like_data[0], feels_like_data[1], feels_like_data[2], feels_like_data[3], feels_like_data[4], feels_like_data[5], feels_like_data[6], feels_like_data[7]],
        lineTension: 0,
        fill:false,
        backgroundColor: [
          'rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)'
        ],
        borderColor: [
          'rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      legend: {
        display: false,
        showDatapoints: true,
      },
      elements: {
        point:{
          radius: 3,
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes:[{
          ticks:{
						fontColor : 'rgba(250, 250, 250, 1)',
						fontSize : 14
					},
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          gridLines: {
            display:false
          },
          ticks: {
            beginAtZero: true,
            fontColor : 'rgba(250, 250, 250, 1)',
						fontSize : 14,
          }
        }],
      },
    },
  });
}
function humidity(humidity_data){
  ctx = document.getElementById('chart2');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [hour[0].dt_txt, hour[1].dt_txt, hour[2].dt_txt, hour[3].dt_txt, hour[4].dt_txt, hour[5].dt_txt, hour[6].dt_txt, hour[7].dt_txt],
      datasets: [{
        label: 'Humidity',
        data: [humidity_data[0], humidity_data[1], humidity_data[2], humidity_data[3], humidity_data[4], humidity_data[5], humidity_data[6], humidity_data[7]],
        lineTension: 0,
        fill:false,
        backgroundColor: [
          'rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)','rgba(0, 162, 255, 0.2)'
        ],
        borderColor: [
          'rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)','rgba(0, 162, 255, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      legend: {
        display: false,
        showDatapoints: true,
      },
      elements: {
        point:{
          radius: 3,
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes:[{
          ticks:{
						fontColor : 'rgba(150, 150, 150, 1)',
						fontSize : 14
					},
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          gridLines: {
            display:false
          },
          ticks: {
            beginAtZero: true,
            fontColor : 'rgba(150, 150, 150, 1)',
						fontSize : 14,
          }
        }],
      },
    },
  });
}
