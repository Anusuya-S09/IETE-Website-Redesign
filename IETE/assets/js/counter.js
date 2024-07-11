let revealClass = 'animated';
let targetClass = '.has-scroll-reveal:not(' + revealClass + ')';
let offset = 200; // Offset from bottom of viewport in pixels.
let winHeight = jQuery(window).height();
// Recalc height of window in case of resize
jQuery(window).bind('resizeEnd', function() {
winHeight = jQuery(window).height();
});
// Fire when page loads
triggerAnimation(revealClass, targetClass, offset, winHeight);
// Also fire on scroll
jQuery(window).on('scroll', function() {
triggerAnimation(revealClass, targetClass, offset, winHeight);
}); // window.on('scroll')
function triggerAnimation(revealClass, targetClass, offset, winHeight) {
// Get current scrollPos
let trigger = jQuery(window).scrollTop() + winHeight - offset;
// Loop through elements we're affecting
jQuery(targetClass).each(function() {
  let elementOffset = jQuery(this).offset().top;
//   Number counter. I start this without the offset you can have on the normal animaitons so it starts as soon as it's on screen.
  if(elementOffset < jQuery(window).scrollTop() + winHeight) {
    if(jQuery(this).hasClass('counter')) {
      var $this = jQuery(this);
//       Remove the "has-scroll-reveal" class or it will get interrupted by scrolling
      $this.removeClass('has-scroll-reveal');
//       Remove all commas and turn the datasource into a number +1. Dunno why we have to add one to it but after I put in the code to add the commas it started stopping 1 digit before finish
          countTo = parseInt($this.attr("data-countto").replace(/,/g, ''));
//       The magic
      jQuery({ counter: $this.text() }).animate(
        {
          counter: countTo
        },
        {
          duration: 4000,
          easing: "swing",
          step: function () {
// Put the commas back in. Remove the .replace if you want to leave commas out.            
           $this.text(Math.floor(this.counter).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
          },
// For larger numbers, the step might not finish in time. Not sure why at this point. Hence the following:
          complete: function() {
$this.text(Math.floor(this.counter).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
          }
        }
      );
    }   
  }
//   Reveal standard animations
  if( elementOffset < trigger ) {
    jQuery(this).addClass( revealClass );
  }
});
}