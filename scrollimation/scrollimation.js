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
  var half = $(window).height()/2;

  $('header').css({
    top: half-t*half,
    height: Math.max(100, half/2 * (1-t))
  });

  $('header > div').css({
    right: 50 - t * 50 + '%'
  });

  $('#logo').css({
    right: 50 - t * 50 + '%'
  });

});



var randoms = 'RISKY'.split('').map(Math.random);


scrollimation('#section3', function(t) {
  var canvas = $('#risky')[0];
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width, canvas.height);

  ctx.font = "100px Helvetica";

  var offset = 0;
  'RISKY'.split('').forEach(function(letter,i) {
    ctx.save();

    var spacing = offset-i*(t)*100;
    spacing = Math.max(0,spacing);

    var x = spacing + offset;
    var y = 100;

    // Fully collapsed, do the crazy stuff
    if(t > 0.75) {
      var random = randoms[i];

      var subt = t-0.75;

      ctx.translate(x,y);
      ctx.rotate((random-0.5) * (t-0.75)*10);
      ctx.translate(-x,-y);


      if(letter === 'K') {
        ctx.translate(x*subt*10, y*subt*10);
      }
    }

    ctx.fillText(letter, x, y); 

    offset += ctx.measureText(letter).width + spacing;

    ctx.restore();

  });

});
