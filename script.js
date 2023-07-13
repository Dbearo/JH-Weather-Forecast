// var day1 = $('#forecasts-cards-container .future-card:eq(0)')
// var day2 = $('#forecasts-cards-container .future-card:eq(1)')
// var day3 = $('#forecasts-cards-container .future-card:eq(2)')
// var day4 = $('#forecasts-cards-container .future-card:eq(3)')
// var day5 = $('#forecasts-cards-container .future-card:eq(4)')
// $('#forecasts-cards-container .future-card:eq(1) .future-temp');
// example for when I set the forcast days
var apikey = "82d5c90ebbd4523a1d69f1cd7bbb8f14"
// apiurl = "api.openweathermap.org/data/2.5/forecast?q=$"+city+"&appid="
var apikey2 = "9799df0eb694f5cb50086ad03b3ab084"
var storage = []


function setForcast(datas){
var count = 0;
for(i=0,i;datas.list.length;i+=8){
var ftemp = datas.list[i].main.temp
ftemp -= 273.15
ftemp = ftemp.toFixed(2);
$('#forecasts-cards-container .future-card:eq('+count+') .future-temp').text('Temp: '+ftemp+'C');
$('#forecasts-cards-container .future-card:eq('+count+') .future-humidity').text('Humidity: '+datas.list[i].main.humidity+"%");
$('#forecasts-cards-container .future-card:eq('+count+') .future-wind').text('Wind Speed: '+datas.list[i].wind.speed+'MPS');
var ficonCode = datas.list[i].weather[0].icon
var ficonurl = "http://openweathermap.org/img/w/" + ficonCode + ".png";
$('#forecasts-cards-container .future-card:eq('+count+') .future-icon').attr('src', ficonurl);
count++
futureDay = new dayjs().add(count,'d')
count--
$('#forecasts-cards-container .future-card:eq('+count+') .future-date').text(futureDay);
count++
}}

function setCurrent(datas){
  var temp = datas.main.temp
  temp -= 273.15
  temp = temp.toFixed(2);
  console.log(temp)
  $('.temp').text("Temp: "+temp+"C" )
  $('.humidity').text("Humidity: "+datas.main.humidity+"%")
  $('.wind').text("Wind Speed: "+datas.wind.speed+"MPS")
  $('.name').text(datas.name)
  var currentDay = dayjs().format('dddd, MMMM D');
  $(".date").text(currentDay)
  var iconCode = datas.weather[0].icon
  console.log(iconCode)
  var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  $('.icon').attr('src', iconurl);

}

function weathers(city) {
fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+ apikey, {

  })
    .then(response => response.json())
    .then(data =>{


      console.log(data)

      setCurrent(data)
    })
 

    .catch(error => {
      // Handle any errors
      console.error(error);
    });
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`, {

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


}



$("#searchbtn").click( function(){

  var city = $(".search").val()
  console.log(city)
  weathers(city);
  var history = $('<li>').text(city);
 
  $('#history').append(history);
    })

$(document).on("click",'li',function(){
var city = $(event.target).text()
console.log(city)
weathers(city);

})