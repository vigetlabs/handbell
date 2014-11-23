(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/javascript/app.coffee":[function(require,module,exports){
var Handbell, handbell;

Handbell = require('./lib/Handbell');

handbell = new Handbell('bell-C4.wav');

console.log(handbell);



},{"./lib/Handbell":"/Users/greypants/Sites/handbell/src/javascript/lib/Handbell.coffee"}],"/Users/greypants/Sites/handbell/src/javascript/lib/Handbell.coffee":[function(require,module,exports){
var Handbell, Sound,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Sound = require('./Sound');

module.exports = Handbell = (function() {
  Handbell.prototype.thresholdY = 25;

  Handbell.prototype.lastX = 0;

  Handbell.prototype.lastY = 0;

  function Handbell(audioUrl) {
    this.ring = __bind(this.ring, this);
    this.sound = new Sound(audioUrl);
    this.listenForInput();
  }

  Handbell.prototype.listenForInput = function() {
    document.body.addEventListener('touchstart', this.sound.play, false);
    document.body.addEventListener('mousedown', this.sound.play, false);
    return window.addEventListener("deviceorientation", this.ring, false);
  };

  Handbell.prototype.ring = function() {
    var deltaY, x, y;
    x = event.beta + 0.5 | 0;
    y = event.gamma + 0.5 | 0;
    deltaY = Math.abs(y - this.lastY);
    this.debug(x, y, deltaY);
    if (deltaY > this.thresholdY) {
      this.lastX = x;
      this.lastY = y;
      return this.sound.play();
    }
  };

  Handbell.prototype.debug = function(x, y, deltaY) {
    return document.body.innerText = "deviceorientation: " + x + ", " + y + " \n deltaY = " + deltaY + " \n lastX = " + this.lastX + " \n lastY = " + this.lastY;
  };

  return Handbell;

})();



},{"./Sound":"/Users/greypants/Sites/handbell/src/javascript/lib/Sound.coffee"}],"/Users/greypants/Sites/handbell/src/javascript/lib/Sound.coffee":[function(require,module,exports){
var Sound,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

window.AudioContext = window.AudioContext || window.webkitAudioContext;

module.exports = Sound = (function() {
  function Sound(url) {
    this.saveBuffer = __bind(this.saveBuffer, this);
    this.play = __bind(this.play, this);
    this.context = new AudioContext();
    this.load(url);
  }

  Sound.prototype.play = function() {
    var source;
    if (this.buffer) {
      source = this.context.createBufferSource();
      source.buffer = this.buffer;
      source.connect(this.context.destination);
      return source.start(0);
    } else {
      return console.log('buffering...');
    }
  };

  Sound.prototype.load = function(url) {
    var request;
    request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    request.onload = (function(_this) {
      return function() {
        return _this.context.decodeAudioData(request.response, _this.saveBuffer);
      };
    })(this);
    return request.send();
  };

  Sound.prototype.saveBuffer = function(incomingBuffer) {
    return this.buffer = incomingBuffer;
  };

  return Sound;

})();



},{}]},{},["./src/javascript/app.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL3NyYy9qYXZhc2NyaXB0L2FwcC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL3NyYy9qYXZhc2NyaXB0L2xpYi9IYW5kYmVsbC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL3NyYy9qYXZhc2NyaXB0L2xpYi9Tb3VuZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLGtCQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsZ0JBQVIsQ0FBWCxDQUFBOztBQUFBLFFBRUEsR0FBZSxJQUFBLFFBQUEsQ0FBUyxhQUFULENBRmYsQ0FBQTs7QUFBQSxPQUdPLENBQUMsR0FBUixDQUFZLFFBQVosQ0FIQSxDQUFBOzs7OztBQ0FBLElBQUEsZUFBQTtFQUFBLGtGQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUixDQUFSLENBQUE7O0FBQUEsTUFFTSxDQUFDLE9BQVAsR0FBdUI7QUFDckIscUJBQUEsVUFBQSxHQUFZLEVBQVosQ0FBQTs7QUFBQSxxQkFDQSxLQUFBLEdBQU8sQ0FEUCxDQUFBOztBQUFBLHFCQUVBLEtBQUEsR0FBTyxDQUZQLENBQUE7O0FBSWEsRUFBQSxrQkFBQyxRQUFELEdBQUE7QUFDWCx1Q0FBQSxDQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsS0FBQSxDQUFNLFFBQU4sQ0FBYixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsY0FBRCxDQUFBLENBREEsQ0FEVztFQUFBLENBSmI7O0FBQUEscUJBUUEsY0FBQSxHQUFnQixTQUFBLEdBQUE7QUFFZCxJQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWQsQ0FBK0IsWUFBL0IsRUFBNkMsSUFBQyxDQUFB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QSxPQUFPLENBQUMsWUFBUixHQUF1QixhQUZ2QixDQUFBO0FBQUEsSUFHQSxPQUFPLENBQUMsTUFBUixHQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQSxHQUFBO2VBQ2YsS0FBQyxDQUFBLE9BQU8sQ0FBQyxlQUFULENBQXlCLE9BQU8sQ0FBQyxRQUFqQyxFQUEyQyxLQUFDLENBQUEsVUFBNUMsRUFEZTtNQUFBLEVBQUE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBSGpCLENBQUE7V0FLQSxPQUFPLENBQUMsSUFBUixDQUFBLEVBTkk7RUFBQSxDQWJOLENBQUE7O0FBQUEsa0JBcUJBLFVBQUEsR0FBWSxTQUFDLGNBQUQsR0FBQTtXQUNWLElBQUMsQ0FBQSxNQUFELEdBQVUsZUFEQTtFQUFBLENBckJaLENBQUE7O2VBQUE7O0lBSEYsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJIYW5kYmVsbCA9IHJlcXVpcmUoJy4vbGliL0hhbmRiZWxsJylcblxuaGFuZGJlbGwgPSBuZXcgSGFuZGJlbGwoJ2JlbGwtQzQud2F2JylcbmNvbnNvbGUubG9nIGhhbmRiZWxsIiwiU291bmQgPSByZXF1aXJlKCcuL1NvdW5kJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBIYW5kYmVsbFxuICB0aHJlc2hvbGRZOiAyNSAjZGVnXG4gIGxhc3RYOiAwXG4gIGxhc3RZOiAwXG5cbiAgY29uc3RydWN0b3I6IChhdWRpb1VybCkgLT5cbiAgICBAc291bmQgPSBuZXcgU291bmQoYXVkaW9VcmwpXG4gICAgQGxpc3RlbkZvcklucHV0KClcblxuICBsaXN0ZW5Gb3JJbnB1dDogLT5cbiAgICAjIEluaXQgc291bmQgd2l0aCB0b3VjaFxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAndG91Y2hzdGFydCcsIEBzb3VuZC5wbGF5LCBmYWxzZVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAnbW91c2Vkb3duJywgQHNvdW5kLnBsYXksIGZhbHNlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJkZXZpY2VvcmllbnRhdGlvblwiLCBAcmluZywgZmFsc2VcblxuICByaW5nOiA9PlxuICAgIHggPSBldmVudC5iZXRhICsgMC41IHwgMFxuICAgIHkgPSBldmVudC5nYW1tYSArIDAuNSB8IDBcbiAgICBkZWx0YVkgPSBNYXRoLmFicyh5IC0gQGxhc3RZKVxuICAgIEBkZWJ1Zyh4LCB5LCBkZWx0YVkpXG5cbiAgICBpZiBkZWx0YVkgPiBAdGhyZXNob2xkWVxuICAgICAgQGxhc3RYID0geFxuICAgICAgQGxhc3RZID0geVxuICAgICAgQHNvdW5kLnBsYXkoKVxuXG4gIGRlYnVnOiAoeCwgeSwgZGVsdGFZKS0+XG4gICAgZG9jdW1lbnQuYm9keS5pbm5lclRleHQgPSBcIlxuICAgICAgZGV2aWNlb3JpZW50YXRpb246ICN7eH0sICN7eX0gXFxuXG4gICAgICBkZWx0YVkgPSAje2RlbHRhWX0gXFxuXG4gICAgICBsYXN0WCA9ICN7QGxhc3RYfSBcXG5cbiAgICAgIGxhc3RZID0gI3tAbGFzdFl9XG4gICAgXCIiLCJ3aW5kb3cuQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU291bmRcbiAgY29uc3RydWN0b3I6ICh1cmwpIC0+XG4gICAgQGNvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KClcbiAgICBAbG9hZCh1cmwpXG5cbiAgcGxheTogPT5cbiAgICBpZiBAYnVmZmVyXG4gICAgICBzb3VyY2UgPSBAY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKVxuICAgICAgc291cmNlLmJ1ZmZlciA9IEBidWZmZXJcbiAgICAgIHNvdXJjZS5jb25uZWN0KEBjb250ZXh0LmRlc3RpbmF0aW9uKVxuICAgICAgc291cmNlLnN0YXJ0KDApICMgUGxheSBzb3VuZCBpbW1lZGlhdGVseVxuICAgIGVsc2VcbiAgICAgIGNvbnNvbGUubG9nICdidWZmZXJpbmcuLi4nXG5cbiAgbG9hZDogKHVybCkgLT5cbiAgICByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICByZXF1ZXN0Lm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSlcbiAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcidcbiAgICByZXF1ZXN0Lm9ubG9hZCA9ICgpID0+XG4gICAgICBAY29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSwgQHNhdmVCdWZmZXIpXG4gICAgcmVxdWVzdC5zZW5kKClcblxuICBzYXZlQnVmZmVyOiAoaW5jb21pbmdCdWZmZXIpID0+IFxuICAgIEBidWZmZXIgPSBpbmNvbWluZ0J1ZmZlclxuIl19
