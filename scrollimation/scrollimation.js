(function() {
  var scrollimations = [];

  function update() {
    for(var i=0,l=scrollimations.length; i < l; ++i) {
      var s = scrollimations[i];
      var btop = $(s.selector).position().top;
      var bheight = $(s.selector).height();
      var y = $(document.body).scrollTop() + $(window).height();
      var t = (y - btop) / bheight; // Current time
      var prevt = $(s.select).data('prevt'); // Previous time

      // Prevent updating when nothing has changed
      if(t === prevt) continue;

      // Clip to 0-1
      t = Math.max(t,0);
      t = Math.min(t,1);

      // Call the updater function
      s.func.call(s.elem, t);

      // Save previous t for next update
      $(s.select).data('prevt', t);
    }
  }

  $(function() {
    $(window).on('scroll', update);
    $(window).on('resize', update);
    update();
  });

  window.scrollimation = function(selector, func) {
    scrollimations.push({
      selector: selector,
      func: func
    });
  }
})();


scrollimation('#section2', function(t) {
  var half = $(window).height();
  $('header').css({
    top: half-t*half,
    height: half * (1-t) + 100
  });

  $('header > div').css({
    marginLeft: t * 100
  });
});
