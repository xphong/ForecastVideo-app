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
