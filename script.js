
var apikey = "82d5c90ebbd4523a1d69f1cd7bbb8f14"
// apiurl = "api.openweathermap.org/data/2.5/forecast?q=$"+city+"&appid="
var apikey2 = "9799df0eb694f5cb50086ad03b3ab084"



function setForcast(datas){
   city = $(".search").val()
    var lon = datas.coord.lon.toString()
    var lat = datas.coord.lat.toString()
      console.log(lon);
    console.log(lat);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`, {

  })
    .then(response => response.json())
    .then(data =>{


      console.log(data)
    })
 

    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}


$("#searchbtn").click( function(){

  var city = $(".search").val()
  console.log(city)
fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+ apikey, {

  })
    .then(response => response.json())
    .then(data =>{


      console.log(data)
      setForcast(data)
    })
 

    .catch(error => {
      // Handle any errors
      console.error(error);
    });
  

    })

// Target the first child of the div
$('#forecasts-cards-container .future-card:eq(0)').css('color', 'red');

// Target the second child of the div
$('#forecasts-cards-container .future-card:eq(1)').css('color', 'blue');