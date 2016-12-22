//setup
var appid = "463596c81d45982112016c6be4b400bb";

//grab current location of user
var myWeather = navigator.geolocation.getCurrentPosition(function(position){
  var lat = Math.floor(position.coords.latitude);
  var lon = Math.floor(position.coords.longitude);

  //make API call
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather",
    data: {
      appid: appid,
      lat: lat,
      lon: lon
    },
    //on success, grab everything, let the magic begin!
    success: function(data){

      //grab responses
      var city = data.name;
      var currentConditions = data.weather[0].description;
      var currentTemp = Math.floor((((data.main.temp)-273)*9/5)+32);
      var weatherIcon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";

      //append the DOM
      $('#city').append("<h3>"+city+"</h3>");
      $('#currentConditions').append("<h3>"+currentConditions+"</h3>");
      $('#weatherIcon').append("<img src="+weatherIcon+" />")
      $('#temp').append("<p>"+currentTemp+"</p>");

      //radio button - click converts temp in f to temp in c...weirdos
      $("input[type='radio']").click(function(){
        //math.floor, because i hate decimals
        currentTemp = Math.floor((currentTemp - 32)*5/9);
        $('#temp').replaceWith("<h3>"+currentTemp+"</h3>");
      });
    },

    //when ajax call is complete, remove the hidden class
    complete: function(){
      $('#myWell').removeClass('hidden');
    }
  });
});
