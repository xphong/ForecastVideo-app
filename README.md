# [ForecastVideo-app](http://forecastvideo.phonghuynh.ca/)
A responsive weather app that uses the [Forecast.io API v2](https://developer.forecast.io
) to query for current weather conditions while displaying a looping weather video in the background using [BigVideo.js](http://dfcb.github.io/BigVideo.js/
)

Automatically updates forecast every 15 minutes in celsius format, also updates and gets current time/date.

Location is your current location using the ipinfo.io API. If the API does not work the location is defaulted to Toronto, Canada.

Mobile uses a background image since videos do not autoplay on mobile devices.

[View Live](http://forecastvideo.phonghuynh.ca/)

## Quickstart
Watch runs on 127.0.0.1:9000
```
npm install
bower install
grunt build
grunt
```

Dist runs on 127.0.0.1:9001
```
npm install
bower install
grunt build
grunt publish
grunt server-dist
```

## Technologies Used
* Forecast.io API
* BigVideo.js
* ipinfo.io Geolocation API
* Zurb Foundation 5
* Sass
* Yeoman
* Grunt

### Forecast.io API
Weather API that returns current conditions in a JSON object using this format:
```
https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE
```

https://developer.forecast.io

### BigVideo.js
jQuery plugin for big background videos that fills the website frame.
http://dfcb.github.io/BigVideo.js/

### ipinfo.io API
A Geolocation API that returns the current IP's geolocation.
http://ipinfo.io/developers

### Grunt
* sass
* jshint
* connect
* usemin
* watch
* clean
* uncss
* concat
* mincss
* uglify
* copy

## Fonts
* Open Sans
* Meteocons Weather Icons http://www.alessioatzeni.com/meteocons/

## Videos & Images
Most free video clips are from http://www.beachfrontbroll.com/
Images are from http://www.sxc.hu/

You can replace them with your own by going into the folders:
```
app/images/background
app/videos
```
Just keep the same file name.

## Author
**Phong Huynh**
+ [Website](http://phonghuynh.ca)
+ [GitHub](http://github.com/xphong)

## Future Extension
Will be in separate app.
Features will include:
* Enter in location
* Select video or image background
* Select celsius or farenheit
* Background colour picker

## License
The MIT License (MIT)

Copyright (c) 2014 Phong Huynh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
