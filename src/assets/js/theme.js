/*!
  * SuperFit - Sports Workout App
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('aos'), require('jquery'), require('jquery-countdown'), require('scrollmonitor')) :
    typeof define === 'function' && define.amd ? define(['exports', 'aos', 'jquery', 'scrollmonitor', 'prismjs', 'typed.js'], factory) :
      (global = global || self, factory(global.theme = {}, global.AOS, global.jQuery, null, global.scrollMonitor, null, global.Prism, global.SmoothScroll, global.Typed));
}(this, function (exports, AOS, jQuery$1, scrollMonitor, SmoothScroll) {
  'use strict';

  AOS = AOS && AOS.hasOwnProperty('default') ? AOS['default'] : AOS;
  jQuery$1 = jQuery$1 && jQuery$1.hasOwnProperty('default') ? jQuery$1['default'] : jQuery$1;
  scrollMonitor = scrollMonitor && scrollMonitor.hasOwnProperty('default') ? scrollMonitor['default'] : scrollMonitor;
  SmoothScroll = SmoothScroll && SmoothScroll.hasOwnProperty('default') ? SmoothScroll['default'] : SmoothScroll;

  //
  AOS.init({
    once: true
  });

  //

  (function ($) {
    if ('objectFit' in document.documentElement.style === false) {
      $('.bg-image').each(function attachBg() {
        var img = $(this);
        var src = img.attr('src');
        var classes = img.get(0).classList; // Replaces the default <img.bg-image> element with a <div.bg-image>
        // to attach background using legacy friendly CSS rules

        img.before($("<div class=\"" + classes + "\" style=\"background: url(" + src + "); background-size: cover; background-position: 50% 50%;\"></div>")); // Removes original <img.bg-image> as it is no longer required

        img.remove();
      });
    }
  })(jQuery$1);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }


  var __assign = undefined && undefined.__assign || function () { return (__assign = Object.assign || function (t) { for (var i, a = 1, s = arguments.length; a < s; a++)for (var n in i = arguments[a]) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]); return t }).apply(this, arguments) }, CountUp = function () { function t(t, i, a) { var s = this; this.target = t, this.endVal = i, this.options = a, this.version = "2.0.4", this.defaults = { startVal: 0, decimalPlaces: 0, duration: 2, useEasing: !0, useGrouping: !0, smartEasingThreshold: 999, smartEasingAmount: 333, separator: ",", decimal: ".", prefix: "", suffix: "" }, this.finalEndVal = null, this.useEasing = !0, this.countDown = !1, this.error = "", this.startVal = 0, this.paused = !0, this.count = function (t) { s.startTime || (s.startTime = t); var i = t - s.startTime; s.remaining = s.duration - i, s.useEasing ? s.countDown ? s.frameVal = s.startVal - s.easingFn(i, 0, s.startVal - s.endVal, s.duration) : s.frameVal = s.easingFn(i, s.startVal, s.endVal - s.startVal, s.duration) : s.countDown ? s.frameVal = s.startVal - (s.startVal - s.endVal) * (i / s.duration) : s.frameVal = s.startVal + (s.endVal - s.startVal) * (i / s.duration), s.countDown ? s.frameVal = s.frameVal < s.endVal ? s.endVal : s.frameVal : s.frameVal = s.frameVal > s.endVal ? s.endVal : s.frameVal, s.frameVal = Math.round(s.frameVal * s.decimalMult) / s.decimalMult, s.printValue(s.frameVal), i < s.duration ? s.rAF = requestAnimationFrame(s.count) : null !== s.finalEndVal ? s.update(s.finalEndVal) : s.callback && s.callback(); }, this.formatNumber = function (t) { var i, a, n, e, r, o = t < 0 ? "-" : ""; if (i = Math.abs(t).toFixed(s.options.decimalPlaces), n = (a = (i += "").split("."))[0], e = a.length > 1 ? s.options.decimal + a[1] : "", s.options.useGrouping) { r = ""; for (var l = 0, h = n.length; l < h; ++l)0 !== l && l % 3 == 0 && (r = s.options.separator + r), r = n[h - l - 1] + r; n = r; } return s.options.numerals && s.options.numerals.length && (n = n.replace(/[0-9]/g, function (t) { return s.options.numerals[+t] }), e = e.replace(/[0-9]/g, function (t) { return s.options.numerals[+t] })), o + s.options.prefix + n + e + s.options.suffix }, this.easeOutExpo = function (t, i, a, s) { return a * (1 - Math.pow(2, -10 * t / s)) * 1024 / 1023 + i }, this.options = __assign({}, this.defaults, a), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(i), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.decimalMult = Math.pow(10, this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, "" === this.options.separator && (this.options.useGrouping = !1), this.el = "string" == typeof t ? document.getElementById(t) : t, this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined"; } return t.prototype.determineDirectionAndSmartEasing = function () { var t = this.finalEndVal ? this.finalEndVal : this.endVal; this.countDown = this.startVal > t; var i = t - this.startVal; if (Math.abs(i) > this.options.smartEasingThreshold) { this.finalEndVal = t; var a = this.countDown ? 1 : -1; this.endVal = t + a * this.options.smartEasingAmount, this.duration = this.duration / 2; } else this.endVal = t, this.finalEndVal = null; this.finalEndVal ? this.useEasing = !1 : this.useEasing = this.options.useEasing; }, t.prototype.start = function (t) { this.error || (this.callback = t, this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = !1, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal)); }, t.prototype.pauseResume = function () { this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused; }, t.prototype.reset = function () { cancelAnimationFrame(this.rAF), this.paused = !0, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal); }, t.prototype.update = function (t) { cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(t), this.endVal !== this.frameVal && (this.startVal = this.frameVal, this.finalEndVal || this.resetDuration(), this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)); }, t.prototype.printValue = function (t) { var i = this.formattingFn(t); "INPUT" === this.el.tagName ? this.el.value = i : "text" === this.el.tagName || "tspan" === this.el.tagName ? this.el.textContent = i : this.el.innerHTML = i; }, t.prototype.ensureNumber = function (t) { return "number" == typeof t && !isNaN(t) }, t.prototype.validateValue = function (t) { var i = Number(t); return this.ensureNumber(i) ? i : (this.error = "[CountUp] invalid start or end value: " + t, null) }, t.prototype.resetDuration = function () { this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration; }, t }();

  var mrCountup = function ($) {
    /**
     * Check for scrollMonitor dependency
     * scrollMonitor - https://github.com/stutrek/scrollMonitor
     */
    if (typeof scrollMonitor === 'undefined') {
      throw new Error('mrCountup requires scrollMonitor.js (https://github.com/stutrek/scrollMonitor)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrCountup';
    var VERSION = '1.1.0';
    var DATA_KEY = 'mr.countup';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Options = {
      START: 'start',
      END: 'end',
      DURATION: 'duration',
      GROUPING: 'grouping',
      SEPARATOR: 'separator',
      DECIMAL_CHARACTER: 'decimal-character',
      DECIMAL_PLACES: 'decimal-places',
      PREFIX: 'prefix',
      SUFFIX: 'suffix',
      EASING: 'easing'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: "resize" + EVENT_KEY
    };
    var Selector = {
      DATA_ATTR: 'countup',
      DATA_COUNTUP: '[data-countup]'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Countup =
      /*#__PURE__*/
      function () {
        function Countup(element) {
          var $element = $(element); // Grab data-attributes

          this.start = parseFloat($element.data(Options.START), 10) || 0;
          this.end = parseFloat($element.data(Options.END), 10) || parseFloat($element.text(), 10);
          this.duration = parseFloat($element.data(Options.DURATION), 10) || 2.5;
          this.grouping = $element.data(Options.GROUPING) === true || false;
          this.separator = $element.data(Options.SEPARATOR) || ',';
          this.decimalCharacter = $element.data(Options.DECIMAL_CHARACTER) || '.';
          this.decimalPlaces = parseInt($element.data(Options.DECIMAL_PLACES), 10) || 0;
          this.prefix = $element.data(Options.PREFIX) || '';
          this.suffix = $element.data(Options.SUFFIX) || ''; // the easing data attribute will only disable easing if false is specified. Defaults to true.

          var easing = $element.data(Options.EASING);
          this.easing = easing === false ? easing : true;
          this.element = element;
          this.initWatcher(element);
          this.startCounting();
        } // getters


        var _proto = Countup.prototype;

        _proto.initWatcher = function initWatcher(element) {
          var _this = this;

          this.CountUp = new CountUp(element, this.end, {
            startVal: this.start,
            decimalPlaces: this.decimalPlaces,
            duration: this.duration,
            useEasing: this.easing,
            useGrouping: this.grouping,
            separator: this.separator,
            decimal: this.decimalCharacter,
            prefix: this.prefix,
            suffix: this.suffix
          });
          var watcher = scrollMonitor.create(element);
          this.watcher = watcher;
          watcher.stateChange(function () {
            _this.startCounting();
          });
        };

        _proto.startCounting = function startCounting() {
          if (this.watcher.isFullyInViewport) {
            if (!this.CountUp.error) {
              this.CountUp.start();
            } else {
              throw new Error(this.CountUp.error);
            }
          }
        };

        Countup.jQueryInterface = function jQueryInterface() {
          return this.each(function jqEachCountup() {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Countup(this);
              $element.data(DATA_KEY, data);
            }
          });
        };

        _createClass(Countup, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }]);

        return Countup;
      }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var countupElements = $.makeArray($(Selector.DATA_COUNTUP));
      /* eslint-disable no-plusplus */

      for (var i = countupElements.length; i--;) {
        var $countup = $(countupElements[i]);
        Countup.jQueryInterface.call($countup, $countup.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = Countup.jQueryInterface;
    $.fn[NAME].Constructor = Countup;

    $.fn[NAME].noConflict = function CountupNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Countup.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return Countup;
  }(jQuery$1);

  //

  var mrUtil = function ($) {
    var VERSION = '1.2.0';
    var Tagname = {
      SCRIPT: 'script'
    };
    var Selector = {
      RECAPTCHA: '[data-recaptcha]'
    }; // Activate tooltips

    var Util = {
      version: VERSION,
      selector: Selector,
      activateIframeSrc: function activateIframeSrc(iframe) {
        var $iframe = $(iframe);

        if ($iframe.attr('data-src')) {
          $iframe.attr('src', $iframe.attr('data-src'));
        }
      },
      idleIframeSrc: function idleIframeSrc(iframe) {
        var $iframe = $(iframe);
        $iframe.attr('data-src', $iframe.attr('src')).attr('src', '');
      },
      forEach: function forEach(array, callback, scope) {
        if (array) {
          if (array.length) {
            for (var i = 0; i < array.length; i += 1) {
              callback.call(scope, i, array[i]); // passes back stuff we need
            }
          } else if (array[0] || mrUtil.isElement(array)) {
            callback.call(scope, 0, array);
          }
        }
      },
      dedupArray: function dedupArray(arr) {
        return arr.reduce(function (p, c) {
          // create an identifying String from the object values
          var id = JSON.stringify(c); // if the JSON string is not found in the temp array
          // add the object to the output array
          // and add the key to the temp array

          if (p.temp.indexOf(id) === -1) {
            p.out.push(c);
            p.temp.push(id);
          }

          return p; // return the deduped array
        }, {
          temp: [],
          out: []
        }).out;
      },
      isElement: function isElement(obj) {
        return !!(obj && obj.nodeType === 1);
      },
      getFuncFromString: function getFuncFromString(funcName, context) {
        var findFunc = funcName || null; // if already a function, return

        if (typeof findFunc === 'function') return funcName; // if string, try to find function or method of object (of "obj.func" format)

        if (typeof findFunc === 'string') {
          if (!findFunc.length) return null;
          var target = context || window;
          var func = findFunc.split('.');

          while (func.length) {
            var ns = func.shift();
            if (typeof target[ns] === 'undefined') return null;
            target = target[ns];
          }

          if (typeof target === 'function') return target;
        } // return null if could not parse


        return null;
      },
      getScript: function getScript(source, callback) {
        var script = document.createElement(Tagname.SCRIPT);
        var prior = document.getElementsByTagName(Tagname.SCRIPT)[0];
        script.async = 1;
        script.defer = 1;

        script.onreadystatechange = function (_, isAbort) {
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = null;
            script.onreadystatechange = null;
            script = undefined;

            if (!isAbort && callback && typeof callback === 'function') {
              callback();
            }
          }
        };

        script.onload = script.onreadystatechange;
        script.src = source;
        prior.parentNode.insertBefore(script, prior);
      }
    };
    return Util;
  }(jQuery$1);

  var mrDropdownGrid = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'mrDropdownGrid';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.dropdownGrid';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME]; // KeyboardEvent.which value for Escape (Esc) key

    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for space key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for tab key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for up arrow key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for down arrow key

    var ARROW_DOWN_KEYCODE = 40; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var RIGHT_MOUSE_BUTTON_WHICH = 3;
    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var ClassName = {
      SHOW: 'show'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: "resize" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      MOUSE_ENTER: "mouseenter" + EVENT_KEY,
      MOUSE_LEAVE: "mouseleave" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown-grid"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      CONTAINER: '.dropdown-menu',
      CONTENT: '[data-dropdown-content]',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var Options = {
      HOVER: 'data-hover',
      BODY_HOVER: 'data-dropdown-grid-hover'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var DropdownGrid =
      /*#__PURE__*/
      function () {
        function DropdownGrid(element) {
          this.ticking = false;
          this.isActive = false;
          this.element = element;
          this.getOptions();
          this.parent = DropdownGrid.getParentFromElement(this.element);
          this.menu = this.getMenuElement();
          this.container = this.getContainerElement();
          this.content = this.getContentElement();
          this.isSubmenu = this.hasParentMenu();

          if (this.isSubmenu) {
            this.siblingMenus = this.getSiblingMenus();
          }

          this.submenus = this.getSubmenus();
          this.hover = this.options.hover;
          this.addEventListeners();
          this.setResizeEvent();
        }

        var _proto = DropdownGrid.prototype;

        _proto.getOptions = function getOptions() {
          if (!this.options) {
            this.options = {};
            this.options.hover = (this.element.getAttribute(Options.HOVER) === 'true' || document.body.getAttribute(Options.BODY_HOVER) === 'true') && this.element.getAttribute(Options.HOVER) !== 'false';
          }
        };

        _proto.toggle = function toggle(event) {
          this.getParentMenu();

          if (this.element.disabled || $(this.element).hasClass(ClassName.DISABLED)) {
            return;
          }

          this.isActive = $(this.menu).hasClass(ClassName.SHOW);
          var togglingOff = this.isActive;
          var togglingOn = !this.isActive;

          if (!this.isSubmenu) {
            DropdownGrid.clearMenus();
          }

          if (!this.isSubmenu && togglingOff) {
            return;
          }

          if (!this.isSubmenu && togglingOn && event && event.type === Event.MOUSE_LEAVE) {
            return;
          }

          if (this.isSubmenu && this.isActive) {
            DropdownGrid.clearMenus(null, this.element);
            DropdownGrid.clearMenus(null, this.submenus);
            return;
          }

          if (this.isSubmenu && !this.isActive) {
            DropdownGrid.clearMenus(null, this.siblingMenus);
          }

          var relatedTarget = {
            relatedTarget: this.element
          };
          var showEvent = $.Event(Event.SHOW, relatedTarget);
          $(this.parent).trigger(showEvent);

          if (showEvent.isDefaultPrevented()) {
            return;
          } // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


          if ('ontouchstart' in document.documentElement && $(this.parent).closest(Selector.NAVBAR_NAV).length === 0) {
            $(document.body).children().on('mouseover', null, $.noop);
          }

          this.element.focus();
          this.element.setAttribute('aria-expanded', true);
          $(this.menu).toggleClass(ClassName.SHOW); // Recalculate positions after applying the shown class
          // This is because jQuery can't measure an invisible element.

          this.updatePosition();
          this.isActive = true;
          $(this.parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
        };

        _proto.updatePosition = function updatePosition(winWidth) {
          var windowWidth = winWidth || window.innerWidth;
          var trigger = mrDropdownGrid.getDimensionsFromElement(this.element);
          this.positionContainer(trigger.offsetLeft);
          this.positionContent(windowWidth, trigger.offsetLeft);
        };

        _proto.positionContainer = function positionContainer(offsetLeft) {
          if (this.container) {
            this.container.style.left = "-" + offsetLeft + "px";
          } else {
            throw new TypeError('No element matching .dropdown-menu.container found.');
          }
        };

        _proto.positionContent = function positionContent(windowWidth, offsetLeft) {
          if (this.content) {
            var leftValue; // let topValue;

            var contentRect = mrDropdownGrid.getDimensionsFromElement(this.content);
            var contentWidth = contentRect.width; // If submenu, the left of the content needs to sit to the side of the trigger's content

            if (this.isSubmenu) {
              this.getParentMenu();
              var parentContent = mrDropdownGrid.getDimensionsFromElement(this.parentMenu.content); // Calculate X Offset

              if (parentContent.offsetLeft + parentContent.width + contentWidth <= windowWidth) {
                // Submenu can fit next to parent menu
                leftValue = parentContent.offsetLeft + parentContent.width;
              } else if (parentContent.offsetLeft >= contentWidth) {
                // No room for submenu to fit to the right of parent, sit it to the left instead.
                leftValue = parentContent.offsetLeft - contentWidth;
              } else {
                leftValue = 0;
              } // Calculate Y offset

            } else if (contentWidth + offsetLeft >= windowWidth) {
              // Not a submenu, but if the content won't fit, sit content close to the right boundary
              leftValue = windowWidth - contentWidth;
            } else {
              // Not a submenu, and there is room to fit normally and sit below trigger
              leftValue = offsetLeft;
            }

            var leftString = Math.round(leftValue) + "px";
            this.content.style.left = leftString;
          } else {
            throw new TypeError('No [data-dropdown-content] element was found.');
          }
        };

        _proto.setResizeEvent = function setResizeEvent() {
          var _this = this;

          $(window).on(Event.RESIZE, function () {
            if (!_this.ticking) {
              window.requestAnimationFrame(function () {
                _this.updatePosition();

                _this.ticking = false;
              });
              _this.ticking = true;
            }
          });
        };

        _proto.getMenuElement = function getMenuElement() {
          if (!this.menu) {
            if (this.parent) {
              this.menu = this.parent.querySelector(Selector.MENU);
            }
          }

          return this.menu;
        };

        _proto.getContainerElement = function getContainerElement() {
          if (!this.container) {
            if (this.parent) {
              this.container = this.parent.querySelector("" + Selector.MENU + Selector.CONTAINER);
            }
          }

          return this.container;
        };

        _proto.getContentElement = function getContentElement() {
          if (!this.content) {
            if (this.parent) {
              this.content = this.container.querySelector(Selector.CONTENT);
            }
          }

          return this.content;
        };

        _proto.hasParentMenu = function hasParentMenu() {
          return $(this.element).closest(Selector.CONTENT).length > 0;
        };

        _proto.getParentMenu = function getParentMenu() {
          if (this.isSubmenu && !this.parentMenu) {
            this.parentMenu = $(this.parent).closest(Selector.MENU).siblings(Selector.DATA_TOGGLE).data(DATA_KEY);
          }
        };

        _proto.getSiblingMenus = function getSiblingMenus() {
          return $(this.element).closest(Selector.CONTENT).get(0).querySelectorAll(Selector.DATA_TOGGLE);
        };

        _proto.getSubmenus = function getSubmenus() {
          var children = this.content.querySelectorAll(Selector.DATA_TOGGLE);
          this.isParent = children.length !== 0;
          return children;
        };

        _proto.addEventListeners = function addEventListeners() {
          var _this2 = this;

          $(this.element).on(Event.CLICK, function (event) {
            event.preventDefault();
            event.stopPropagation();

            _this2.toggle();
          });

          if (this.hover) {
            $(this.parent).on(Event.MOUSE_ENTER + " " + Event.MOUSE_LEAVE, function (event) {
              event.preventDefault();
              event.stopPropagation();

              if ("" + event.type + EVENT_KEY === Event.MOUSE_ENTER && _this2.isActive || "" + event.type + EVENT_KEY === Event.MOUSE_LEAVE && !_this2.isActive) {
                return;
              }

              _this2.toggle(event);
            });
          }
        };

        DropdownGrid.getDimensionsFromElement = function getDimensionsFromElement(element) {
          if (element && mrUtil.isElement(element)) {
            var rect = element.getBoundingClientRect();
            rect.offsetLeft = Math.round(rect.left + window.pageXOffset - document.documentElement.clientLeft);
            return rect;
          } // If not an element, throw an error


          throw new TypeError('Can\'t get a measurement from a non-element');
        };

        DropdownGrid.getParentFromElement = function getParentFromElement(element) {
          return element.parentNode;
        };

        DropdownGrid.clearMenus = function clearMenus(event, specificToggle) {
          if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup') && event.which !== TAB_KEYCODE) {
            return;
          }

          var toggles;

          if (specificToggle && typeof specificToggle === 'object') {
            toggles = specificToggle;
          } else {
            toggles = document.querySelectorAll(Selector.DATA_TOGGLE);
          }

          mrUtil.forEach(toggles, function (index, toggle) {
            var parent = DropdownGrid.getParentFromElement(toggle);
            var context = $(toggle).data(DATA_KEY);
            var relatedTarget = {
              relatedTarget: toggle
            };

            if (event && event.type === 'click') {
              relatedTarget.clickEvent = event;
            }

            if (!context) {
              return;
            }

            var dropdownMenu = context.menu;

            if (!$(parent).hasClass(ClassName.SHOW)) {
              return;
            }

            if (event) {
              if ((event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
                return;
              }
            }

            if (event) {
              if (event.type === 'click' && ($.contains(context.content, event.target) || context.content.isSameNode(event.target))) {
                return;
              }
            }

            var hideEvent = $.Event(Event.HIDE, relatedTarget);
            $(parent).trigger(hideEvent);

            if (hideEvent.isDefaultPrevented()) {
              return;
            } // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support


            if ('ontouchstart' in document.documentElement) {
              $(document.body).children().off('mouseover', null, $.noop);
            }

            toggle.setAttribute('aria-expanded', 'false');
            context.isActive = false;
            $(dropdownMenu).removeClass(ClassName.SHOW);
            $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
          });
        };

        DropdownGrid.jQueryInterface = function jQueryInterface(config) {
          return this.each(function jqEachDropdownGrid() {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new DropdownGrid(this);
              $element.data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }

              data[config]();
            }
          });
        } // eslint-disable-next-line complexity
          ;

        DropdownGrid.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
          // If not input/textarea:
          //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
          // If input/textarea:
          //  - If space key => not a dropdown command
          //  - If key is other than escape
          //    - If key is not up or down => not a dropdown command
          //    - If trigger inside the menu => not a dropdown command
          if (/input|textarea/i.test(event.target.tagName) ? (event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE) && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();

          if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
            return;
          }

          var parent = DropdownGrid.getParentFromElement(this);
          var isActive = $(parent).hasClass(ClassName.SHOW);

          if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
            if (event.which === ESCAPE_KEYCODE) {
              var toggle = parent.querySelector(Selector.DATA_TOGGLE);
              $(toggle).trigger('focus');
            }

            $(this).trigger('click');
            return;
          }

          var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

          if (items.length === 0) {
            return;
          }

          var index = items.indexOf(event.target);

          if (event.which === ARROW_UP_KEYCODE && index > 0) {
            // Up
            index -= 1;
          }

          if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
            // Down
            index += 1;
          }

          if (index < 0) {
            index = 0;
          }

          items[index].focus();
        };

        _createClass(DropdownGrid, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }]);

        return DropdownGrid;
      }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, DropdownGrid.dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, DropdownGrid.dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, DropdownGrid.clearMenus).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */

    $(document).ready(function () {
      var dropdownGridElements = $.makeArray($(Selector.DATA_TOGGLE));
      /* eslint-disable no-plusplus */

      for (var i = dropdownGridElements.length; i--;) {
        var $dropdownGrid = $(dropdownGridElements[i]);
        DropdownGrid.jQueryInterface.call($dropdownGrid, $dropdownGrid.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = DropdownGrid.jQueryInterface;
    $.fn[NAME].Constructor = DropdownGrid;

    $.fn[NAME].noConflict = function DropdownGridNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return DropdownGrid.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return DropdownGrid;
  }(jQuery$1);

  //
  //
  //  fade-page.js
  //
  //
  // Page Transition to fade out when clicking a link which has opted in using class 'fade-page'
  (function () {
    var ATTR_HREF = 'href';
    var EVENT_CLICK = 'click';
    var SELECTOR_FADE = 'fade-page';
    var EFFECT_DELAY = 500;
    var fadePage = document.getElementsByClassName(SELECTOR_FADE);

    function fadePageFunction(event) {
      if (!(event.ctrlKey || event.shiftKey || event.metaKey || event.button && event.button === 1)) {
        event.preventDefault();
        event.stopPropagation();
        document.body.classList.add(SELECTOR_FADE);
        var href = this.getAttribute(ATTR_HREF);
        setTimeout(function () {
          if (href !== '' && href !== '#') {
            window.location.href = href;
          }
        }, EFFECT_DELAY);
      }
    } // Bind click event


    for (var i = 0; i < fadePage.length; i += 1) {
      fadePage[i].addEventListener(EVENT_CLICK, fadePageFunction, false);
    }
  })();

  var mrOverlayNav = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'mrOverlayNav';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.overlayNav';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      RESIZE: "resize" + EVENT_KEY,
      RESIZED: "resized" + EVENT_KEY,
      IMAGE_LOAD: 'load',
      TOGGLE_SHOW: 'show.bs.collapse',
      TOGGLE_HIDE: 'hide.bs.collapse',
      NOTIFICATION_CLOSE: '',
      ALERT_CLOSE: 'close.bs.alert'
    };
    var Selector = {
      CONTAINER: 'body > div.navbar-container',
      OVERLAY_NAV: 'body > div.navbar-container > nav[data-overlay]',
      NAV: 'nav',
      OVERLAY_SECTION: '[data-overlay]',
      IMAGE: 'img'
    };
    var ClassName = {
      TOGGLED_SHOW: 'navbar-toggled-show'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var OverlayNav =
      /*#__PURE__*/
      function () {
        function OverlayNav(element) {
          this.ticking = false; // Used to debounce resize event

          this.element = element;
          this.navHeight = this.getNavHeight();
          this.container = OverlayNav.getContainerElement();
          this.overlayElement = OverlayNav.getFirstOverlayElement();
          this.setImageLoadEvent();
          this.updateValues();
          this.setResizeEvent();
          this.setToggleEvent();
        } // getters


        var _proto = OverlayNav.prototype;

        _proto.getNavHeight = function getNavHeight() {
          this.navHeight = this.element.getBoundingClientRect().height;
        };

        _proto.updateValues = function updateValues() {
          this.getNavHeight();
          this.updateContainer();
          this.updateOverlayElement();
          $(this.element).trigger($.Event(Event.RESIZED));
        };

        _proto.updateContainer = function updateContainer() {
          if (!this.container) {
            return;
          }

          this.container.style.minHeight = this.navHeight + "px";
          this.container.style.marginBottom = "-" + this.navHeight + "px";
        };

        _proto.updateOverlayElement = function updateOverlayElement() {
          if (!this.overlayElement) {
            return;
          }

          this.overlayElement.style.setProperty('padding-top', this.navHeight + "px", 'important');
        };

        _proto.setResizeEvent = function setResizeEvent() {
          var _this = this;

          $(window).on(Event.RESIZE + " " + Event.ALERT_CLOSE, function () {
            if (!_this.ticking) {
              window.requestAnimationFrame(function () {
                _this.updateValues();

                _this.ticking = false;
              });
              _this.ticking = true;
            }
          });
        };

        _proto.setToggleEvent = function setToggleEvent() {
          var _this2 = this;

          $(this.container).on(Event.TOGGLE_SHOW + " " + Event.TOGGLE_HIDE, function (evt) {
            var action = evt.type + "." + evt.namespace === Event.TOGGLE_SHOW ? 'add' : 'remove';

            _this2.element.classList[action](ClassName.TOGGLED_SHOW);
          });
        };

        _proto.setImageLoadEvent = function setImageLoadEvent() {
          var _this3 = this;

          var images = this.container.querySelectorAll(Selector.IMAGE);
          mrUtil.forEach(images, function (index, image) {
            image.addEventListener(Event.IMAGE_LOAD, function () {
              return _this3.updateValues();
            });
          });
        };

        OverlayNav.getContainerElement = function getContainerElement() {
          if (!this.container) {
            this.container = document.querySelector(Selector.CONTAINER);
          }

          return this.container;
        };

        OverlayNav.getFirstOverlayElement = function getFirstOverlayElement() {
          return document.querySelector(Selector.OVERLAY_SECTION + ":not(" + Selector.NAV + ")");
        };

        OverlayNav.jQueryInterface = function jQueryInterface() {
          return this.each(function jqEachoverlayNav() {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new OverlayNav(this);
              $element.data(DATA_KEY, data);
            }
          });
        };

        _createClass(OverlayNav, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }]);

        return OverlayNav;
      }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(document).ready(function () {
      var overlayNavElements = $.makeArray($(Selector.OVERLAY_NAV));
      /* eslint-disable no-plusplus */

      for (var i = overlayNavElements.length; i--;) {
        var $overlayNav = $(overlayNavElements[i]);
        OverlayNav.jQueryInterface.call($overlayNav, $overlayNav.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = OverlayNav.jQueryInterface;
    $.fn[NAME].Constructor = OverlayNav;

    $.fn[NAME].noConflict = function overlayNavNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return OverlayNav.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return OverlayNav;
  }(jQuery$1);


  (function ($) {
    $(document).on('hide.bs.tab', function (evt) {
      $($(evt.target).attr('href')).find('[data-toggle="popover"]').popover('hide');
    });
    $(document).on('hide.bs.collapse', function (evt) {
      $(evt.target).find('[data-toggle="popover"]').popover('hide');
    });
  })(jQuery$1);

  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Medium Rare JavaScript requires jQuery. jQuery must be included before theme.js.');
    }
  })();

  exports.mrDropdownGrid = mrDropdownGrid;
  exports.mrOverlayNav = mrOverlayNav;
  exports.mrUtil = mrUtil;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=theme.js.map
