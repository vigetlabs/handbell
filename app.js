(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/javascript/app.coffee":[function(require,module,exports){
var Handbell, container, handbell, onDing, onDong, onReady, text;

Handbell = require('./lib/Handbell');

container = document.body;

text = document.getElementById('text');

handbell = new Handbell('bell-F4.wav');

onDing = function() {
  container.setAttribute('class', 'ding');
  return text.innerText = "ding!";
};

onDong = function() {
  container.setAttribute('class', 'dong');
  return text.innerText = "dong!";
};

onReady = function() {
  text.innerText = "ready!";
  container.removeEventListener('touchstart', handbell.initialize, false);
  return handbell.sound.play();
};

handbell.on('ding', onDing).on('dong', onDong).on('ready', onReady);

container.addEventListener('touchstart', handbell.initialize, false);

container.addEventListener('mousedown', handbell.initialize, false);



},{"./lib/Handbell":"/Users/greypants/Sites/handbell/src/javascript/lib/Handbell.coffee"}],"/Users/greypants/Sites/handbell/node_modules/smokesignals/index.js":[function(require,module,exports){
(function (global){
var existed = false;
var old;

if ('smokesignals' in global) {
    existed = true;
    old = global.smokesignals;
}

require('./smokesignals');

module.exports = smokesignals;

if (existed) {
    global.smokesignals = old;
}
else {
    delete global.smokesignals;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./smokesignals":"/Users/greypants/Sites/handbell/node_modules/smokesignals/smokesignals.js"}],"/Users/greypants/Sites/handbell/node_modules/smokesignals/smokesignals.js":[function(require,module,exports){
smokesignals = {
    convert: function(obj, handlers) {
        // we store the list of handlers as a local variable inside the scope
        // so that we don't have to add random properties to the object we are
        // converting. (prefixing variables in the object with an underscore or
        // two is an ugly solution)
        // we declare the variable in the function definition to use two less
        // characters (as opposed to using 'var ').  I consider this an inelegant
        // solution since smokesignals.convert.length now returns 2 when it is
        // really 1, but doing this doesn't otherwise change the functionallity of
        // this module, so we'll go with it for now
        handlers = {};

        // add a listener
        obj.on = function(eventName, handler) {
            // either use the existing array or create a new one for this event
            (handlers[eventName] || (handlers[eventName] = []))
                // add the handler to the array
                .push(handler);

            return obj;
        }

        // add a listener that will only be called once
        obj.once = function(eventName, handler) {
            // create a wrapper listener, that will remove itself after it is called
            function wrappedHandler() {
                // remove ourself, and then call the real handler with the args
                // passed to this wrapper
                handler.apply(obj.off(eventName, wrappedHandler), arguments);
            }
            // in order to allow that these wrapped handlers can be removed by
            // removing the original function, we save a reference to the original
            // function
            wrappedHandler.h = handler;

            // call the regular add listener function with our new wrapper
            return obj.on(eventName, wrappedHandler);
        }

        // remove a listener
        obj.off = function(eventName, handler) {
            // loop through all handlers for this eventName, assuming a handler
            // was passed in, to see if the handler passed in was any of them so
            // we can remove it
            for (var list = handlers[eventName], i = 0; handler && list && list[i]; i++) {
                // either this item is the handler passed in, or this item is a
                // wrapper for the handler passed in.  See the 'once' function
                list[i] != handler && list[i].h != handler ||
                    // remove it!
                    list.splice(i--,1);
            }
            // if i is 0 (i.e. falsy), then there are no items in the array for this
            // event name (or the array doesn't exist)
            if (!i) {
                // remove the array for this eventname (if it doesn't exist then
                // this isn't really hurting anything)
                delete handlers[eventName];
            }
            return obj;
        }

        obj.emit = function(eventName) {
            // loop through all handlers for this event name and call them all
            for(var list = handlers[eventName], i = 0; list && list[i];) {
                list[i++].apply(obj, list.slice.call(arguments, 1));
            }
            return obj;
        }

        return obj;
    }
}

},{}],"/Users/greypants/Sites/handbell/src/javascript/lib/Handbell.coffee":[function(require,module,exports){
var Handbell, Sound, eventsModule, isAndroid,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Sound = require('./Sound');

eventsModule = require('smokesignals');

isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;

module.exports = Handbell = (function() {
  Handbell.prototype.threshold = 400;

  function Handbell(audioUrl) {
    this.ring = __bind(this.ring, this);
    this.ready = __bind(this.ready, this);
    this.initialize = __bind(this.initialize, this);
    eventsModule.convert(this);
    this.sound = new Sound(audioUrl);
  }

  Handbell.prototype.initialize = function() {
    this.sound.volume = 0;
    this.sound.play();
    this.sound.volume = 1;
    window.addEventListener("devicemotion", this.ring, false);
    if (this.sound.buffer) {
      return this.ready();
    } else {
      return this.sound.on('ready', this.ready);
    }
  };

  Handbell.prototype.ready = function() {
    return this.emit('ready');
  };

  Handbell.prototype.ring = function(e) {
    var motion;
    motion = e.rotationRate.alpha;
    if (motion) {
      if (isAndroid) {
        if (isAndroid) {
          motion *= 60;
        }
      }
    } else {
      motion = e.acceleration.z * 50;
    }
    if (this.forwardRing(motion)) {
      this.ding();
    } else if (this.backwardsRing(motion)) {
      this.dong();
    }
    return this.updatePositionValues(motion);
  };

  Handbell.prototype.ding = function() {
    this.isForwardPosition = true;
    this.sound.play();
    return this.emit('ding');
  };

  Handbell.prototype.dong = function() {
    this.isBackPosition = true;
    this.sound.play();
    return this.emit('dong');
  };

  Handbell.prototype.forwardRing = function(motion) {
    return motion < -this.threshold && !this.isForwardPosition;
  };

  Handbell.prototype.backwardsRing = function(motion) {
    return motion > this.threshold * 1.75 && !this.isBackPosition;
  };

  Handbell.prototype.updatePositionValues = function(motion) {
    this.isBackPosition = this.backPosition ? motion >= this.threshold * 0.9 : void 0;
    return this.isForwardPosition = this.isForwardPosition ? motion <= -this.threshold * 0.9 : void 0;
  };

  return Handbell;

})();



},{"./Sound":"/Users/greypants/Sites/handbell/src/javascript/lib/Sound.coffee","smokesignals":"/Users/greypants/Sites/handbell/node_modules/smokesignals/index.js"}],"/Users/greypants/Sites/handbell/src/javascript/lib/Sound.coffee":[function(require,module,exports){
var AudioContext, Sound, eventsModule,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

eventsModule = require('smokesignals');

AudioContext = window.AudioContext || window.webkitAudioContext;

module.exports = Sound = (function() {
  Sound.prototype.volume = 1;

  function Sound(url) {
    this.saveBuffer = __bind(this.saveBuffer, this);
    this.decodeAudio = __bind(this.decodeAudio, this);
    this.play = __bind(this.play, this);
    eventsModule.convert(this);
    this.context = new AudioContext();
    this.load(url);
  }

  Sound.prototype.play = function() {
    var gainNode, source;
    if (this.buffer) {
      source = this.context.createBufferSource();
      gainNode = this.context.createGain();
      source.buffer = this.buffer;
      gainNode.gain.value = this.volume;
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      return source.start(0);
    } else if (!this.queued) {
      this.queued = true;
      return this.once('ready', this.play);
    }
  };

  Sound.prototype.load = function(url) {
    var request;
    request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    request.onload = this.decodeAudio;
    return request.send();
  };

  Sound.prototype.decodeAudio = function(e) {
    return this.context.decodeAudioData(e.currentTarget.response, this.saveBuffer);
  };

  Sound.prototype.saveBuffer = function(incomingBuffer) {
    this.buffer = incomingBuffer;
    return this.emit('ready');
  };

  return Sound;

})();



},{"smokesignals":"/Users/greypants/Sites/handbell/node_modules/smokesignals/index.js"}]},{},["./src/javascript/app.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL3NyYy9qYXZhc2NyaXB0L2FwcC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL25vZGVfbW9kdWxlcy9zbW9rZXNpZ25hbHMvaW5kZXguanMiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL25vZGVfbW9kdWxlcy9zbW9rZXNpZ25hbHMvc21va2VzaWduYWxzLmpzIiwiL1VzZXJzL2dyZXlwYW50cy9TaXRlcy9oYW5kYmVsbC9zcmMvamF2YXNjcmlwdC9saWIvSGFuZGJlbGwuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9TaXRlcy9oYW5kYmVsbC9zcmMvamF2YXNjcmlwdC9saWIvU291bmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSw0REFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGdCQUFSLENBQVgsQ0FBQTs7QUFBQSxTQUVBLEdBQVksUUFBUSxDQUFDLElBRnJCLENBQUE7O0FBQUEsSUFHQSxHQUFPLFFBQVEsQ0FBQyxjQUFULENBQXdCLE1BQXhCLENBSFAsQ0FBQTs7QUFBQSxRQUlBLEdBQWUsSUFBQSxRQUFBLENBQVMsYUFBVCxDQUpmLENBQUE7O0FBQUEsTUFNQSxHQUFTLFNBQUEsR0FBQTtBQUNQLEVBQUEsU0FBUyxDQUFDLFlBQVYsQ0FBdUIsT0FBdkIsRUFBZ0MsTUFBaEMsQ0FBQSxDQUFBO1NBQ0EsSUFBSSxDQUFDLFNBQUwsR0FBaUIsUUFGVjtBQUFBLENBTlQsQ0FBQTs7QUFBQSxNQVVBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsRUFBQSxTQUFTLENBQUMsWUFBVixDQUF1QixPQUF2QixFQUFnQyxNQUFoQyxDQUFBLENBQUE7U0FDQSxJQUFJLENBQUMsU0FBTCxHQUFpQixRQUZWO0FB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LElBQVIsQ0FBYSxLQUFiLEVBQW9CLEdBQXBCLEVBQXlCLElBQXpCLENBREEsQ0FBQTtBQUFBLElBRUEsT0FBTyxDQUFDLFlBQVIsR0FBdUIsYUFGdkIsQ0FBQTtBQUFBLElBR0EsT0FBTyxDQUFDLE1BQVIsR0FBaUIsSUFBQyxDQUFBLFdBSGxCLENBQUE7V0FJQSxPQUFPLENBQUMsSUFBUixDQUFBLEVBTEk7RUFBQSxDQXJCTixDQUFBOztBQUFBLGtCQTRCQSxXQUFBLEdBQWEsU0FBQyxDQUFELEdBQUE7V0FDWCxJQUFDLENBQUEsT0FBTyxDQUFDLGVBQVQsQ0FBeUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUF6QyxFQUFtRCxJQUFDLENBQUEsVUFBcEQsRUFEVztFQUFBLENBNUJiLENBQUE7O0FBQUEsa0JBK0JBLFVBQUEsR0FBWSxTQUFDLGNBQUQsR0FBQTtBQUNWLElBQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxjQUFWLENBQUE7V0FDQSxJQUFDLENBQUEsSUFBRCxDQUFNLE9BQU4sRUFGVTtFQUFBLENBL0JaLENBQUE7O2VBQUE7O0lBTEYsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJIYW5kYmVsbCA9IHJlcXVpcmUoJy4vbGliL0hhbmRiZWxsJylcblxuY29udGFpbmVyID0gZG9jdW1lbnQuYm9keVxudGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0JylcbmhhbmRiZWxsID0gbmV3IEhhbmRiZWxsKCdiZWxsLUY0LndhdicpXG5cbm9uRGluZyA9IC0+XG4gIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2RpbmcnKVxuICB0ZXh0LmlubmVyVGV4dCA9IFwiZGluZyFcIlxuXG5vbkRvbmcgPSAtPlxuICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkb25nJylcbiAgdGV4dC5pbm5lclRleHQgPSBcImRvbmchXCJcblxub25SZWFkeSA9IC0+XG4gIHRleHQuaW5uZXJUZXh0ID0gXCJyZWFkeSFcIlxuICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciAndG91Y2hzdGFydCcsIGhhbmRiZWxsLmluaXRpYWxpemUsIGZhbHNlXG4gIGhhbmRiZWxsLnNvdW5kLnBsYXkoKVxuXG5oYW5kYmVsbFxuICAub24gJ2RpbmcnLCBvbkRpbmdcbiAgLm9uICdkb25nJywgb25Eb25nXG4gIC5vbiAncmVhZHknLCBvblJlYWR5XG5cbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyICd0b3VjaHN0YXJ0JywgaGFuZGJlbGwuaW5pdGlhbGl6ZSwgZmFsc2VcbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyICdtb3VzZWRvd24nLCBoYW5kYmVsbC5pbml0aWFsaXplLCBmYWxzZVxuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIGV4aXN0ZWQgPSBmYWxzZTtcbnZhciBvbGQ7XG5cbmlmICgnc21va2VzaWduYWxzJyBpbiBnbG9iYWwpIHtcbiAgICBleGlzdGVkID0gdHJ1ZTtcbiAgICBvbGQgPSBnbG9iYWwuc21va2VzaWduYWxzO1xufVxuXG5yZXF1aXJlKCcuL3Ntb2tlc2lnbmFscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNtb2tlc2lnbmFscztcblxuaWYgKGV4aXN0ZWQpIHtcbiAgICBnbG9iYWwuc21va2VzaWduYWxzID0gb2xkO1xufVxuZWxzZSB7XG4gICAgZGVsZXRlIGdsb2JhbC5zbW9rZXNpZ25hbHM7XG59XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsInNtb2tlc2lnbmFscyA9IHtcbiAgICBjb252ZXJ0OiBmdW5jdGlvbihvYmosIGhhbmRsZXJzKSB7XG4gICAgICAgIC8vIHdlIHN0b3JlIHRoZSBsaXN0IG9mIGhhbmRsZXJzIGFzIGEgbG9jYWwgdmFyaWFibGUgaW5zaWRlIHRoZSBzY29wZVxuICAgICAgICAvLyBzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gYWRkIHJhbmRvbSBwcm9wZXJ0aWVzIHRvIHRoZSBvYmplY3Qgd2UgYXJlXG4gICAgICAgIC8vIGNvbnZlcnRpbmcuIChwcmVmaXhpbmcgdmFyaWFibGVzIGluIHRoZSBvYmplY3Qgd2l0aCBhbiB1bmRlcnNjb3JlIG9yXG4gICAgICAgIC8vIHR3byBpcyBhbiB1Z2x5IHNvbHV0aW9uKVxuICAgICAgICAvLyB3ZSBkZWNsYXJlIHRoZSB2YXJpYWJsZSBpbiB0aGUgZnVuY3Rpb24gZGVmaW5pdGlvbiB0byB1c2UgdHdvIGxlc3NcbiAgICAgICAgLy8gY2hhcmFjdGVycyAoYXMgb3Bwb3NlZCB0byB1c2luZyAndmFyICcpLiAgSSBjb25zaWRlciB0aGlzIGFuIGluZWxlZ2FudFxuICAgICAgICAvLyBzb2x1dGlvbiBzaW5jZSBzbW9rZXNpZ25hbHMuY29udmVydC5sZW5ndGggbm93IHJldHVybnMgMiB3aGVuIGl0IGlzXG4gICAgICAgIC8vIHJlYWxseSAxLCBidXQgZG9pbmcgdGhpcyBkb2Vzbid0IG90aGVyd2lzZSBjaGFuZ2UgdGhlIGZ1bmN0aW9uYWxsaXR5IG9mXG4gICAgICAgIC8vIHRoaXMgbW9kdWxlLCBzbyB3ZSdsbCBnbyB3aXRoIGl0IGZvciBub3dcbiAgICAgICAgaGFuZGxlcnMgPSB7fTtcblxuICAgICAgICAvLyBhZGQgYSBsaXN0ZW5lclxuICAgICAgICBvYmoub24gPSBmdW5jdGlvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIC8vIGVpdGhlciB1c2UgdGhlIGV4aXN0aW5nIGFycmF5IG9yIGNyZWF0ZSBhIG5ldyBvbmUgZm9yIHRoaXMgZXZlbnRcbiAgICAgICAgICAgIChoYW5kbGVyc1tldmVudE5hbWVdIHx8IChoYW5kbGVyc1tldmVudE5hbWVdID0gW10pKVxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgaGFuZGxlciB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAucHVzaChoYW5kbGVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBhIGxpc3RlbmVyIHRoYXQgd2lsbCBvbmx5IGJlIGNhbGxlZCBvbmNlXG4gICAgICAgIG9iai5vbmNlID0gZnVuY3Rpb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYSB3cmFwcGVyIGxpc3RlbmVyLCB0aGF0IHdpbGwgcmVtb3ZlIGl0c2VsZiBhZnRlciBpdCBpcyBjYWxsZWRcbiAgICAgICAgICAgIGZ1bmN0aW9uIHdyYXBwZWRIYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBvdXJzZWxmLCBhbmQgdGhlbiBjYWxsIHRoZSByZWFsIGhhbmRsZXIgd2l0aCB0aGUgYXJnc1xuICAgICAgICAgICAgICAgIC8vIHBhc3NlZCB0byB0aGlzIHdyYXBwZXJcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmFwcGx5KG9iai5vZmYoZXZlbnROYW1lLCB3cmFwcGVkSGFuZGxlciksIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpbiBvcmRlciB0byBhbGxvdyB0aGF0IHRoZXNlIHdyYXBwZWQgaGFuZGxlcnMgY2FuIGJlIHJlbW92ZWQgYnlcbiAgICAgICAgICAgIC8vIHJlbW92aW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiwgd2Ugc2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWxcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uXG4gICAgICAgICAgICB3cmFwcGVkSGFuZGxlci5oID0gaGFuZGxlcjtcblxuICAgICAgICAgICAgLy8gY2FsbCB0aGUgcmVndWxhciBhZGQgbGlzdGVuZXIgZnVuY3Rpb24gd2l0aCBvdXIgbmV3IHdyYXBwZXJcbiAgICAgICAgICAgIHJldHVybiBvYmoub24oZXZlbnROYW1lLCB3cmFwcGVkSGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgYSBsaXN0ZW5lclxuICAgICAgICBvYmoub2ZmID0gZnVuY3Rpb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGhhbmRsZXJzIGZvciB0aGlzIGV2ZW50TmFtZSwgYXNzdW1pbmcgYSBoYW5kbGVyXG4gICAgICAgICAgICAvLyB3YXMgcGFzc2VkIGluLCB0byBzZWUgaWYgdGhlIGhhbmRsZXIgcGFzc2VkIGluIHdhcyBhbnkgb2YgdGhlbSBzb1xuICAgICAgICAgICAgLy8gd2UgY2FuIHJlbW92ZSBpdFxuICAgICAgICAgICAgZm9yICh2YXIgbGlzdCA9IGhhbmRsZXJzW2V2ZW50TmFtZV0sIGkgPSAwOyBoYW5kbGVyICYmIGxpc3QgJiYgbGlzdFtpXTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gZWl0aGVyIHRoaXMgaXRlbSBpcyB0aGUgaGFuZGxlciBwYXNzZWQgaW4sIG9yIHRoaXMgaXRlbSBpcyBhXG4gICAgICAgICAgICAgICAgLy8gd3JhcHBlciBmb3IgdGhlIGhhbmRsZXIgcGFzc2VkIGluLiAgU2VlIHRoZSAnb25jZScgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBsaXN0W2ldICE9IGhhbmRsZXIgJiYgbGlzdFtpXS5oICE9IGhhbmRsZXIgfHxcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGl0IVxuICAgICAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLS0sMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBpIGlzIDAgKGkuZS4gZmFsc3kpLCB0aGVuIHRoZXJlIGFyZSBubyBpdGVtcyBpbiB0aGUgYXJyYXkgZm9yIHRoaXNcbiAgICAgICAgICAgIC8vIGV2ZW50IG5hbWUgKG9yIHRoZSBhcnJheSBkb2Vzbid0IGV4aXN0KVxuICAgICAgICAgICAgaWYgKCFpKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBhcnJheSBmb3IgdGhpcyBldmVudG5hbWUgKGlmIGl0IGRvZXNuJ3QgZXhpc3QgdGhlblxuICAgICAgICAgICAgICAgIC8vIHRoaXMgaXNuJ3QgcmVhbGx5IGh1cnRpbmcgYW55dGhpbmcpXG4gICAgICAgICAgICAgICAgZGVsZXRlIGhhbmRsZXJzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqLmVtaXQgPSBmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgaGFuZGxlcnMgZm9yIHRoaXMgZXZlbnQgbmFtZSBhbmQgY2FsbCB0aGVtIGFsbFxuICAgICAgICAgICAgZm9yKHZhciBsaXN0ID0gaGFuZGxlcnNbZXZlbnROYW1lXSwgaSA9IDA7IGxpc3QgJiYgbGlzdFtpXTspIHtcbiAgICAgICAgICAgICAgICBsaXN0W2krK10uYXBwbHkob2JqLCBsaXN0LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG59XG4iLCJTb3VuZCAgICAgICAgPSByZXF1aXJlKCcuL1NvdW5kJylcbmV2ZW50c01vZHVsZSA9IHJlcXVpcmUoJ3Ntb2tlc2lnbmFscycpXG5pc0FuZHJvaWQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImFuZHJvaWRcIikgPiAtMVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEhhbmRiZWxsXG5cbiAgdGhyZXNob2xkOiA0MDAgIyBldmVudC5yb3RhdGlvblJhdGUuYWxwaGEgdGhyZXNob2xkXG5cbiAgY29uc3RydWN0b3I6IChhdWRpb1VybCkgLT5cbiAgICBldmVudHNNb2R1bGUuY29udmVydChAKVxuICAgIEBzb3VuZCA9IG5ldyBTb3VuZChhdWRpb1VybClcblxuICBpbml0aWFsaXplOiAoKSA9PlxuICAgICMgQmVsbCBtdXN0IGJlIGluaXRpYWxpemVkIGJ5IHVzZXIgaW5wdXQgKHRvdWNoKSB0byBwbGF5IHNvdW5kcyBvbiBpT1NcbiAgICBAc291bmQudm9sdW1lID0gMFxuICAgIEBzb3VuZC5wbGF5KClcbiAgICBAc291bmQudm9sdW1lID0gMVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJkZXZpY2Vtb3Rpb25cIiwgQHJpbmcsIGZhbHNlXG5cbiAgICBpZiBAc291bmQuYnVmZmVyXG4gICAgICBAcmVhZHkoKVxuICAgIGVsc2VcbiAgICAgIEBzb3VuZC5vbigncmVhZHknLCBAcmVhZHkpXG5cbiAgcmVhZHk6ID0+XG4gICAgQGVtaXQoJ3JlYWR5JylcblxuICByaW5nOiAoZSkgPT5cbiAgICBtb3Rpb24gPSBlLnJvdGF0aW9uUmF0ZS5hbHBoYVxuXG4gICAgaWYgbW90aW9uXG4gICAgICAjIE5vcm1hbGl6ZSBhbmRyb2lkIHZhbHVlc1xuICAgICAgaWYgaXNBbmRyb2lkXG4gICAgICAgIG1vdGlvbiAqPSA2MCBpZiBpc0FuZHJvaWRcbiAgICBlbHNlXG4gICAgICAjIEZhbGxiYWNrIHRvIGFjY2VsZXJhdGlvbiBpZiBtb3RcbiAgICAgIG1vdGlvbiA9IGUuYWNjZWxlcmF0aW9uLnogKiA1MFxuXG4gICAgaWYgQGZvcndhcmRSaW5nKG1vdGlvbilcbiAgICAgIEBkaW5nKClcbiAgICBlbHNlIGlmIEBiYWNrd2FyZHNSaW5nKG1vdGlvbilcbiAgICAgIEBkb25nKClcblxuICAgIEB1cGRhdGVQb3NpdGlvblZhbHVlcyhtb3Rpb24pXG5cbiAgZGluZzogLT5cbiAgICBAaXNGb3J3YXJkUG9zaXRpb24gPSB0cnVlXG4gICAgQHNvdW5kLnBsYXkoKVxuICAgIEBlbWl0KCdkaW5nJylcblxuICBkb25nOiAtPlxuICAgIEBpc0JhY2tQb3NpdGlvbiA9IHRydWVcbiAgICBAc291bmQucGxheSgpXG4gICAgQGVtaXQoJ2RvbmcnKVxuXG4gIGZvcndhcmRSaW5nOiAobW90aW9uKSAtPlxuICAgIG1vdGlvbiA8IC1AdGhyZXNob2xkIGFuZCBub3QgQGlzRm9yd2FyZFBvc2l0aW9uXG5cbiAgYmFja3dhcmRzUmluZzogKG1vdGlvbikgLT5cbiAgICBtb3Rpb24gPiBAdGhyZXNob2xkICogMS43NSBhbmQgbm90IEBpc0JhY2tQb3NpdGlvblxuXG4gIHVwZGF0ZVBvc2l0aW9uVmFsdWVzOiAobW90aW9uKSAtPlxuICAgIEBpc0JhY2tQb3NpdGlvbiA9IGlmIEBiYWNrUG9zaXRpb24gdGhlbiBtb3Rpb24gPj0gQHRocmVzaG9sZCAqIDAuOVxuICAgIEBpc0ZvcndhcmRQb3NpdGlvbiA9IGlmIEBpc0ZvcndhcmRQb3NpdGlvbiB0aGVuIG1vdGlvbiA8PSAtQHRocmVzaG9sZCAqIDAuOVxuIiwiZXZlbnRzTW9kdWxlID0gcmVxdWlyZSgnc21va2VzaWduYWxzJylcbkF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dFxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFNvdW5kXG5cbiAgdm9sdW1lOiAxXG5cbiAgY29uc3RydWN0b3I6ICh1cmwpIC0+XG4gICAgZXZlbnRzTW9kdWxlLmNvbnZlcnQoQClcbiAgICBAY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKVxuICAgIEBsb2FkKHVybClcblxuICBwbGF5OiA9PlxuICAgIGlmIEBidWZmZXJcbiAgICAgIHNvdXJjZSA9IEBjb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG4gICAgICBnYWluTm9kZSA9IEBjb250ZXh0LmNyZWF0ZUdhaW4oKVxuICAgICAgc291cmNlLmJ1ZmZlciA9IEBidWZmZXJcbiAgICAgIGdhaW5Ob2RlLmdhaW4udmFsdWUgPSBAdm9sdW1lXG4gICAgICBzb3VyY2UuY29ubmVjdChnYWluTm9kZSlcbiAgICAgIGdhaW5Ob2RlLmNvbm5lY3QoQGNvbnRleHQuZGVzdGluYXRpb24pXG4gICAgICBzb3VyY2Uuc3RhcnQoMClcblxuICAgIGVsc2UgdW5sZXNzIEBxdWV1ZWRcbiAgICAgIEBxdWV1ZWQgPSB0cnVlXG4gICAgICBAb25jZSgncmVhZHknLCBAcGxheSlcblxuICBsb2FkOiAodXJsKSAtPlxuICAgIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgIHJlcXVlc3Qub3BlbignZ2V0JywgdXJsLCB0cnVlKVxuICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJ1xuICAgIHJlcXVlc3Qub25sb2FkID0gQGRlY29kZUF1ZGlvXG4gICAgcmVxdWVzdC5zZW5kKClcblxuICBkZWNvZGVBdWRpbzogKGUpID0+XG4gICAgQGNvbnRleHQuZGVjb2RlQXVkaW9EYXRhKGUuY3VycmVudFRhcmdldC5yZXNwb25zZSwgQHNhdmVCdWZmZXIpXG5cbiAgc2F2ZUJ1ZmZlcjogKGluY29taW5nQnVmZmVyKSA9PlxuICAgIEBidWZmZXIgPSBpbmNvbWluZ0J1ZmZlclxuICAgIEBlbWl0KCdyZWFkeScpXG4iXX0=
