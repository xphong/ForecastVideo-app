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