;(function(window, $) {
	var Forecast = function() {
		//throws error if you try to do new Forecast()
		throw ('this is not to be instantiated');
	};

	var f = Forecast;
  var BV = new $.BigVideo();

  // array of all weather videos
  var videos = [
    "videos/clouds.mp4",
    "videos/sunny-vid.mp4",
    "videos/rain.mp4",
    "videos/snow.mp4"
  ];

  // array of all weather background images
  var BGimg = [
  	"images/backgrounds/cloudy-bg.jpg",
  	"images/backgrounds/rain-bg.jpg",
  	"images/backgrounds/sunny-bg.jpg",
  	"images/backgrounds/winter-bg.jpg",
  ];

	// initialize background video
	BV.init();
	window.BV = BV;
	
	// jQuery selectors
	f.$temperature = $("#temperature"); 
	f.$aTemperature = $("#atemperature");
	f.$summary = $("#summary");
	f.$icon = $("#icon");
	f.$wind = $("#wind");
	f.$pop = $("#pop");
	f.$humidity = $("#humidity");

	// Private variables
	f._apiKey ="8638f2d6a266f36f9ed32a2e21ad4174"; // api key for forecast.io
	f._lat = 43.6486;// Toronto latitude
	f._long = -79.3853; // Toronto longitude
	f._url = "https://api.forecast.io/forecast/" + f._apiKey + "/" + f._lat + "," + f._long; // api url for ajax call
	f._currentTemperature = null;
	f._celsius = null; 

	// Clock
	f.clock = null;

	//initializes our Forecast object by getting the forecast
	f.__initialize = function(){
		// probably do some other stuff here as well
		// we would call getForecast on some interval to update the forecast throughout the day
		// for now I'm only calling it once
		f.getForecast();
		f.clock = new Clock($('#minutes'), $('#point'), $('#hours'), $('#date'), $('#day'));

		// get forecast every 5 minutes
		setInterval(f.getForecast, 300000);
	};

	// converts farenheit result from forecast.io to celsius
	f.getCelsius = function(tempFarenheit){
		return Math.round((tempFarenheit - 32) * 5 / 9);
	};

	// set background video and icon according to weather
	// if on mobile - set to background image
	f.displayBG = function(icon) {
		switch (icon) {
			case "clear-day":
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "B");
				break;
			case "rain":
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "R");
				break;
			case "snow":
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "W");
				break;
			case "sleet":
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "X");
				break;
			case "wind":
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "S");
				break;
			case "fog":
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "M");
				break;
			case "cloudy":
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "Y");
				break;
			case "partly-cloudy-day":
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "H");
				break;
			case "partly-cloudy-night":
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "I");
				break;
			case "clear-night":
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "C");
				break;
			default:
				(Modernizr.touch) ? BV.show('images/rain-bg.jpg') : BV.show(videos[1],{ambient:true});
				f.$icon.attr("data-icon", "Y");
		}
	};

	// round wind speed in KM
	f.getWindSpeed = function(windSpeed){
		return Math.round(windSpeed*1.60934);
	};

	// converts wind degrees to direction
	f.getWindDir = function(windDir) {
		var direction;
		if (windDir == 0){
			direction = "N";
		}
		else if (windDir > 0 && windDir < 90){
			direction = "NE";
		}
		else if (windDir == 90) {
			direction = "E";
		}
		else if (windDir > 90 && windDir < 180) {
			direction = "SE";
		}
		else if (windDir == 180){
			direction = "S";
		}
		else if (windDir > 180 && windDir < 270) {
			direction = "SW";
		}
		else if (windDir == 270) {
			direction = "W";
		}
		else if (windDir > 270 && windDir < 360) {
			direction = "NW";
		}
		else {
			direction = "";
		}
		return direction;
	};

	f.getPOP = function (pop) {
		return Math.round((pop*100)) + "%";
	};

	f.getHumidity = function(humidity) {
		return Math.round((humidity*100)) + "%";
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
		f.$temperature.html(f._temperature + "<sup>°</sup>");
		f.$aTemperature.html("<strong>Feels like " + f._aTemperature + "</strong>");
		f.$summary.html(f._summary);
		f.$wind.html("Wind " + f._windDir + " " + f._windSpeed + " km/h");
		f.$pop.html("P.O.P. " + f._pop);
		f.$humidity.html("Humidity " + f._humidity);
	};

	// makes ajax call to forecast.io
	// do this on an interval throughout the day (max 1000 calls)
	// calls updateDisplay when done
	// sets f._currentTemperature to the "currently" property of the result - this should hold all the data we need from the api
	f.getForecast = function(){
		$.ajax({
			url:f._url,
			dataType:"jsonp"
		}).done(function(result){
			f._currentTemperature = result.currently;
			console.log(f._currentTemperature);
			return f.updateDisplay();
		});
	};
	
	// attaches to the window object (as window.Forecast) incase we want to call from other js files.
	window.Forecast = f
	
	// call this from anywhere to initialize the Forecast object
	window.Forecast.__initialize();
}(window, jQuery));
