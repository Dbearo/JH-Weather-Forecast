
var apikey = "82d5c90ebbd4523a1d69f1cd7bbb8f14"

function setForcast(datas) {
  var count = 0;
  for (i = 0, i; datas.list.length; i += 8) {
    //for loop for setting all of the forcasts for future days
    var ftemp = datas.list[i].main.temp
    ftemp -= 273.15
    ftemp = ftemp.toFixed(2);
    $('#forecasts-cards-container .future-card:eq(' + count + ') .future-temp').text('Temp: ' + ftemp + 'C');
    $('#forecasts-cards-container .future-card:eq(' + count + ') .future-humidity').text('Humidity: ' + datas.list[i].main.humidity + "%");
    $('#forecasts-cards-container .future-card:eq(' + count + ') .future-wind').text('Wind Speed: ' + datas.list[i].wind.speed + 'MPS');
    var ficonCode = datas.list[i].weather[0].icon
    var ficonurl = "http://openweathermap.org/img/w/" + ficonCode + ".png";
    $('#forecasts-cards-container .future-card:eq(' + count + ') .future-icon').attr('src', ficonurl);
    count++
    futureDay = new dayjs().add(count, 'd')
    count--
    $('#forecasts-cards-container .future-card:eq(' + count + ') .future-date').text(futureDay);
    count++
  }
}
// gets all the relevent data from the API and sets the weather for the current time
function setCurrent(datas) {
  var temp = datas.main.temp
  temp -= 273.15
  temp = temp.toFixed(2);
  console.log(temp)
  $('.temp').text("Temp: " + temp + "C")
  $('.humidity').text("Humidity: " + datas.main.humidity + "%")
  $('.wind').text("Wind Speed: " + datas.wind.speed + "MPS")
  $('.name').text(datas.name)
  var currentDay = dayjs().format('dddd, MMMM D');
  $(".date").text(currentDay)
  var iconCode = datas.weather[0].icon
  console.log(iconCode)
  var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  $('.icon').attr('src', iconurl);

}

function weathers(city) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apikey, {

  })
    .then(response => response.json())
    .then(data => {


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
    .then(data => {
      console.log(data)
      setForcast(data)
    })


    .catch(error => {
      // Handle any errors
      console.error(error);
    });


}

function retrieveSearchHistory() {
  var searchHistory = localStorage.getItem('searchHistory');
  console.log
  if (searchHistory) {
    return JSON.parse(searchHistory);
  } else {
    return [];
  }
}

// Function to initialize the search history on page load
function initializeSearchHistory() {
  var searchHistory = retrieveSearchHistory();

  // Add each search item to the history list
  searchHistory.forEach(function (city) {
    var history = $('<li>').text(city);
    $('#history').append(history);
  });
}

// Call the initializeSearchHistory function when the page is loaded




// Event handler for search button click
$("#searchbtn").click(function () {
  var city = $(".search").val();
  console.log(city);
  weathers(city);

  // Retrieve the search history from local storage
  var searchHistory = retrieveSearchHistory();

  // Add the current search to the search history
  searchHistory.push(city);

  // Save the updated search history to local storage
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

  // Add the search to the history list
  var history = $('<li>').text(city);
  $('#history').append(history);
});

$(document).on("click", 'li', function () {
  var city = $(event.target).text()
  console.log(city)
  weathers(city);

})
initializeSearchHistory();