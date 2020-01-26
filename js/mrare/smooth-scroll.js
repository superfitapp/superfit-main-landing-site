
//
//
// smooth-scroll.js
//
// Initialises the smooth scroll plugin

import SmoothScroll from 'smooth-scroll';
import jQuery from 'jquery';

const mrSmoothScroll = (($) => {
  const smoothScroll = new SmoothScroll('a[data-smooth-scroll]',
    {
      speed: 400,
      speedAsDuration: true,
      offset: $('body').attr('data-smooth-scroll-offset')
        || 0,
    });
  return smoothScroll;
})(jQuery);

export default mrSmoothScroll;
