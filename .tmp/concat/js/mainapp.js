var app = (function() {
  var privateVariable = 'app fired!',
    docElem = document.documentElement;

  return {
    publicFunction: function() {
      console.log(privateVariable);
    },
    userAgentInit: function() {
      docElem.setAttribute('data-useragent', navigator.userAgent);
    }
  };

})();

(function() {
  //foundation init
  $(document).foundation();

  app.publicFunction();
  app.userAgentInit();

})();

(function() {
  // Preloader
  $(window).load(function() {
    $('.loader').fadeOut('slow');
  });

  // Perfectly center on resize
/*  if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  }
  else {
    $(window).resize(function(){
      $('.container').css({
        height: $(window).height(),
        width: $(window).width()
      });
      $('.weather-container').css({
        position: 'absolute',
        left: ($(window).width() - $('.weather-container').outerWidth())/2,
        top: ($(window).height() - $('.weather-container').outerHeight())/2
      });
    });

    $(window).resize();
  }*/
  $(window).resize(function(){
    $('.container').css({
      height: $(window).height(),
      width: $(window).width()
    });
    $('.weather-container').css({
      position: 'absolute',
      left: ($(window).width() - $('.weather-container').outerWidth())/2,
      top: ($(window).height() - $('.weather-container').outerHeight())/2
    });
  });

  $(window).resize();

})();

(function(window) {
  var Clock = window.Clock = function($minutes, $point, $hours, $date, $day) {
    this.$minutes = $minutes;
    this.$point = $point;
    this.$hours = $hours;
    this.$date = $date;
    this.$day = $day;
    this.__initialize();
  };

  var p = Clock.prototype;

  // set minute for clock
  p.getMinute = function() {
    var minutes = new Date().getMinutes();

    // add a leading zero to the minutes value
    this.$minutes.html(( minutes < 10 ? '0' : '' ) + minutes);
  };

  // set hour for clock
  p.getHour = function() {
    // create a newDate() object and extract the hours of the current time on the visitor's
    var hours = new Date().getHours();

    // 12 hour clock
    if (hours > 12) {
      hours -= 12;
    }
    else if (hours === 0) {
      hours = 12;
    }

    // add a leading zero to the hours value
    this.$hours.html(( hours < 10 ? '0' : '' ) + hours);
  };

  p.checkTime = function() {
    /* jshint ignore:start */
    var self = this;

    // check for change every 30 secs
    setInterval(function(){self.getMinute()}, 30000);
    // check for change every minute
    setInterval(function(){self.getHour()}, 30000);
    /* jshint ignore:end */
  };

  p.getDayDate = function() {
    var currentDate = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var currentday = days[currentDate.getDay()];

    this.$day.html(currentday);
    this.$date.html(day + '/' + month + '/' + year);
  };

  p.__initialize = function() {
    // initialize position
    this.getMinute();
    this.getHour();
    this.checkTime();
    this.getDayDate();
  };

}(window));
(function(window, $) {
  var Forecast = function() {
    //throws error if you try to do new Forecast()
    throw ('this is not to be instantiated');
  };

  var f = Forecast;
  var BV = new $.BigVideo();

  // array of all weather videos
  var videos = [
    'videos/clouds-vid.mp4',
    'videos/sunny-vid.mp4',
    'videos/overcast-vid.mp4',
    'videos/fog-vid.mp4',
    'videos/snow-vid.mp4',
    'videos/rain-vid.mp4',
    'videos/clearnight-vid.mp4',
    'videos/cloudynight-vid.mp4'
  ];

  // array of all weather background images
  var BGimg = [
    'images/backgrounds/cloudy-bg.jpg',
    'images/backgrounds/sunny-bg.jpg',
    'images/backgrounds/overcast-bg.jpg',
    'images/backgrounds/fog-bg.jpg',
    'images/backgrounds/winter-bg.jpg',
    'images/backgrounds/rain-bg.jpg',
    'images/backgrounds/clearnight-bg.jpg',
    'images/backgrounds/cloudynight-bg.jpg'
  ];

  // initialize background video
  BV.init();
  window.BV = BV;

  // jQuery selectors
  f.$temperature = $('#temperature');
  f.$aTemperature = $('#atemperature');
  f.$summary = $('#summary');
  f.$icon = $('#icon');
  f.$wind = $('#wind');
  f.$pop = $('#pop');
  f.$humidity = $('#humidity');

  // private variables
  f._apiKey ='8638f2d6a266f36f9ed32a2e21ad4174'; // api key for forecast.io
  f._lat = 43.6486;// Toronto latitude
  f._long = -79.3853; // Toronto longitude
  f._url = 'https://api.forecast.io/forecast/' + f._apiKey + '/' + f._lat + ',' + f._long; // api url for ajax call
  f._currentTemperature = null;
  f._celsius = null;

  // clock variable
  f.clock = null;

  // initializes our Forecast object by getting the forecast
  f.__initialize = function(){
    f.getForecast();
    f.clock = new Clock($('#minutes'), $('#point'), $('#hours'), $('#date'), $('#day'));

    // get forecast every 15 minutes
    setInterval(f.getForecast, 900000);
  };

  // converts farenheit result from forecast.io to celsius
  f.getCelsius = function(tempFarenheit){
    return Math.round((tempFarenheit - 32) * 5 / 9);
  };

  // set background video and icon according to weather
  // if on mobile - set to background image
  f.displayBG = function(icon) {
    switch (icon) {
      case 'clear-day':
        if (Modernizr.touch) {
          BV.show(BGimg[1]);
        }
        else {
          BV.show(videos[1],{ambient:true});
        }
        f.$icon.attr('data-icon', 'B');
        break;
      case 'rain':
        if (Modernizr.touch) {
          BV.show(BGimg[5]);
        }
        else {
          BV.show(videos[5],{ambient:true});
        }
        f.$icon.attr('data-icon', 'R');
        break;
      case 'snow':
        if (Modernizr.touch) {
          BV.show(BGimg[4]);
        }
        else {
          BV.show(videos[4],{ambient:true});
        }
        f.$icon.attr('data-icon', 'W');
        break;
      case 'sleet':
        if (Modernizr.touch) {
          BV.show(BGimg[5]);
        }
        else {
          BV.show(videos[5],{ambient:true});
        }
        f.$icon.attr('data-icon', 'X');
        break;
      case 'wind':
        if (Modernizr.touch) {
          BV.show(BGimg[0]);
        }
        else {
          BV.show(videos[0],{ambient:true});
        }
        f.$icon.attr('data-icon', 'S');
        break;
      case 'fog':
        if (Modernizr.touch) {
          BV.show(BGimg[3]);
        }
        else {
          BV.show(videos[3],{ambient:true});
        }
        f.$icon.attr('data-icon', 'M');
        break;
      case 'cloudy':
        if (Modernizr.touch) {
          BV.show(BGimg[2]);
        }
        else {
          BV.show(videos[2],{ambient:true});
        }
        f.$icon.attr('data-icon', 'Y');
        break;
      case 'partly-cloudy-day':
        if (Modernizr.touch) {
          BV.show(BGimg[0]);
        }
        else {
          BV.show(videos[0],{ambient:true});
        }
        f.$icon.attr('data-icon', 'H');
        break;
      case 'partly-cloudy-night':
        if (Modernizr.touch) {
          BV.show(BGimg[7]);
        }
        else {
          BV.show(videos[7],{ambient:true});
        }
        f.$icon.attr('data-icon', 'I');
        break;
      case 'clear-night':
        if (Modernizr.touch) {
          BV.show(BGimg[6]);
        }
        else {
          BV.show(videos[6],{ambient:true});
        }
        f.$icon.attr('data-icon', 'C');
        break;
      default:
        if (Modernizr.touch) {
          BV.show(BGimg[0]);
        }
        else {
          BV.show(videos[0],{ambient:true});
        }
        f.$icon.attr('data-icon', 'Y');
    }
  };

  // round wind speed in KM
  f.getWindSpeed = function(windSpeed){
    return Math.round(windSpeed*1.60934);
  };

  // converts wind degrees to direction
  f.getWindDir = function(windDir) {
    var direction;
    if (windDir === 0){
      direction = 'N';
    }
    else if (windDir > 0 && windDir < 90) {
      direction = 'NE';
    }
    else if (windDir === 90) {
      direction = 'E';
    }
    else if (windDir > 90 && windDir < 180) {
      direction = 'SE';
    }
    else if (windDir === 180){
      direction = 'S';
    }
    else if (windDir > 180 && windDir < 270) {
      direction = 'SW';
    }
    else if (windDir === 270) {
      direction = 'W';
    }
    else if (windDir > 270 && windDir < 360) {
      direction = 'NW';
    }
    else {
      direction = '';
    }
    return direction;
  };

  f.getPOP = function (pop) {
    return Math.round((pop*100)) + '%';
  };

  f.getHumidity = function(humidity) {
    return Math.round((humidity*100)) + '%';
  };

  // updates the display after making the call to forecast.io
  f.updateDisplay = function(){
    f._temperature =  f.getCelsius(f._currentTemperature.temperature);
    f._aTemperature = f.getCelsius(f._currentTemperature.apparentTemperature);
    f._summary = f._currentTemperature.summary;
    f._icon = f._currentTemperature.icon;
    f._windSpeed = f.getWindSpeed(f._currentTemperature.windSpeed);
    f._windDir = f.getWindDir(f._currentTemperature.windBearing);
    f._pop = f.getPOP(f._currentTemperature.precipProbability);
    f._humidity = f.getHumidity(f._currentTemperature.humidity);

    f.displayBG(f._icon);
    f.$temperature.html(f._temperature + '<sup>°</sup>');
    f.$aTemperature.html('<strong>Feels like ' + f._aTemperature + '</strong>');
    f.$summary.html(f._summary);
    f.$wind.html('Wind ' + f._windDir + ' ' + f._windSpeed + ' km/h');
    f.$pop.html('P.O.P. ' + f._pop);
    f.$humidity.html('Humidity ' + f._humidity);
  };

  // makes ajax call to forecast.io
  f.getForecast = function(){
    $.ajax({
      url:f._url,
      dataType:'jsonp'
    }).done(function(result){
      f._currentTemperature = result.currently;
      console.log(f._currentTemperature);
      return f.updateDisplay();
    });
  };

  window.Forecast = f;

  // call this from anywhere to initialize the Forecast object
  window.Forecast.__initialize();
}(window, jQuery));
