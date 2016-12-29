//setup
var appid = "6445edbbe277fc18245051f69202a06c";
var url = "http://api.openweathermap.org/data/2.5/weather";

//grab current location of user
var myWeather = navigator.geolocation.getCurrentPosition(function(position){
  var lat = Math.floor(position.coords.latitude);
  var lon = Math.floor(position.coords.longitude);

  //make API call
  $.getJSON({
    url: url,
    data: {
      appid: appid,
      lat: lat,
      lon: lon
    },
    //on success, grab everything, let the magic begin!
    success: function(data){
//addedforfunx
      //grab responses
      var city = data.name;
      var currentConditions = data.weather[0].description;
      var currentTemp = Math.floor((((data.main.temp)-273)*9/5)+32);
      var weatherIcon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";

      //append the DOM
      $('#city').append("<h3>"+city+"</h3>");
      $('#currentConditions').append("<p>"+currentConditions+"</p>");
      $('#weatherIcon').append("<img src="+weatherIcon+" />")
      $('#temp').append("<p>"+currentTemp+" F</p>");

      //button click changes temp display

      var ftemp = currentTemp;
      var ctemp = Math.floor(((ftemp - 32)*5/9));
      $("#chk").click(function(){
        if($(this).text() == "Get Temp in F"){
          $('#temp').text(ftemp +" F");
          $(this).text("Get Temp in C");
        }else{
          $('#temp').text(ctemp+ " C");
          $(this).text("Get Temp in F");
        };
      });
    },

    //when ajax call is complete, remove the hidden class
    complete: function(){
      $('#myWell').removeClass('hidden');
    }
  });
});
