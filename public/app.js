(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/javascript/app.coffee":[function(require,module,exports){
var Handbell, handbell;

Handbell = require('./lib/Handbell');

handbell = new Handbell('bell-C4.wav');



},{"./lib/Handbell":"/Users/greypants/Sites/handbell/src/javascript/lib/Handbell.coffee"}],"/Users/greypants/Sites/handbell/src/javascript/lib/Handbell.coffee":[function(require,module,exports){
var Handbell, Sound,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Sound = require('./Sound');

module.exports = Handbell = (function() {
  Handbell.prototype.threshold = 150;

  function Handbell(audioUrl) {
    this.ring = __bind(this.ring, this);
    this.activate = __bind(this.activate, this);
    this.sound = new Sound(audioUrl);
    this.container = document.body;
    this.text = document.getElementById('text');
    this.listenForInput();
  }

  Handbell.prototype.listenForInput = function() {
    document.body.addEventListener('touchstart', this.activate, false);
    return document.body.addEventListener('mousedown', this.activate, false);
  };

  Handbell.prototype.activate = function() {
    this.ding();
    document.body.removeEventListener('touchstart', this.activate, false);
    return window.addEventListener("devicemotion", this.ring, false);
  };

  Handbell.prototype.ring = function() {
    var rotationRateZ;
    rotationRateZ = event.rotationRate.alpha;
    if (this.dinged(rotationRateZ)) {
      return this.ding();
    } else if (this.donged(rotationRateZ)) {
      return this.dong();
    }
  };

  Handbell.prototype.ding = function() {
    this.sound.play();
    this.container.setAttribute('class', 'ding');
    this.text.innerText = "ding!";
    return this.flipped = true;
  };

  Handbell.prototype.dong = function() {
    this.sound.play();
    this.container.setAttribute('class', 'dong');
    this.text.innerText = "dong!";
    return this.flipped = false;
  };

  Handbell.prototype.dinged = function(rotationRate) {
    return rotationRate > this.threshold && !this.flipped;
  };

  Handbell.prototype.donged = function(rotationRate) {
    return rotationRate < -this.threshold && this.flipped;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL3NyYy9qYXZhc2NyaXB0L2FwcC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL3NyYy9qYXZhc2NyaXB0L2xpYi9IYW5kYmVsbC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL3NyYy9qYXZhc2NyaXB0L2xpYi9Tb3VuZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLGtCQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsZ0JBQVIsQ0FBWCxDQUFBOztBQUFBLFFBRUEsR0FBZSxJQUFBLFFBQUEsQ0FBUyxhQUFULENBRmYsQ0FBQTs7Ozs7QUNBQSxJQUFBLGVBQUE7RUFBQSxrRkFBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLFNBQVIsQ0FBUixDQUFBOztBQUFBLE1BRU0sQ0FBQyxPQUFQLEdBQXVCO0FBRXJCLHFCQUFBLFNBQUEsR0FBVyxHQUFYLENBQUE7O0FBRWEsRUFBQSxrQkFBQyxRQUFELEdBQUE7QUFDWCx1Q0FBQSxDQUFBO0FBQUEsK0NBQUEsQ0FBQTtBQUFBLElBQUEsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLEtBQUEsQ0FBTSxRQUFOLENBQWIsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLFNBQUQsR0FBYSxRQUFRLENBQUMsSUFEdEIsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLElBQUQsR0FBUSxRQUFRLENBQUMsY0FBVCxDQUF3QixNQUF4QixDQUZSLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxjQUFELENBQUEsQ0FIQSxDQURXO0VBQUEsQ0FGYjs7QUFBQSxxQkFRQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTtBQUNkLElBQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFB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LE1BQUEsR0FBUyxJQUFDLENBQUEsT0FBTyxDQUFDLGtCQUFULENBQUEsQ0FBVCxDQUFBO0FBQUEsTUFDQSxNQUFNLENBQUMsTUFBUCxHQUFnQixJQUFDLENBQUEsTUFEakIsQ0FBQTtBQUFBLE1BRUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFDLENBQUEsT0FBTyxDQUFDLFdBQXhCLENBRkEsQ0FBQTthQUdBLE1BQU0sQ0FBQyxLQUFQLENBQWEsQ0FBYixFQUpGO0tBQUEsTUFBQTthQU1FLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWixFQU5GO0tBREk7RUFBQSxDQUpOLENBQUE7O0FBQUEsa0JBYUEsSUFBQSxHQUFNLFNBQUMsR0FBRCxHQUFBO0FBQ0osUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQWMsSUFBQSxjQUFBLENBQUEsQ0FBZCxDQUFBO0FBQUEsSUFDQSxPQUFPLENBQUMsSUFBUixDQUFhLEtBQWIsRUFBb0IsR0FBcEIsRUFBeUIsSUFBekIsQ0FEQSxDQUFBO0FBQUEsSUFFQSxPQUFPLENBQUMsWUFBUixHQUF1QixhQUZ2QixDQUFBO0FBQUEsSUFHQSxPQUFPLENBQUMsTUFBUixHQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQSxHQUFBO2VBQ2YsS0FBQyxDQUFBLE9BQU8sQ0FBQyxlQUFULENBQXlCLE9BQU8sQ0FBQyxRQUFqQyxFQUEyQyxLQUFDLENBQUEsVUFBNUMsRUFEZTtNQUFBLEVBQUE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBSGpCLENBQUE7V0FLQSxPQUFPLENBQUMsSUFBUixDQUFBLEVBTkk7RUFBQSxDQWJOLENBQUE7O0FBQUEsa0JBcUJBLFVBQUEsR0FBWSxTQUFDLGNBQUQsR0FBQTtXQUNWLElBQUMsQ0FBQSxNQUFELEdBQVUsZUFEQTtFQUFBLENBckJaLENBQUE7O2VBQUE7O0lBSEYsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJIYW5kYmVsbCA9IHJlcXVpcmUoJy4vbGliL0hhbmRiZWxsJylcblxuaGFuZGJlbGwgPSBuZXcgSGFuZGJlbGwoJ2JlbGwtQzQud2F2JylcbiIsIlNvdW5kID0gcmVxdWlyZSgnLi9Tb3VuZCcpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgSGFuZGJlbGxcbiAgXG4gIHRocmVzaG9sZDogMTUwICMgZXZlbnQucm90YXRpb25SYXRlLmFscGhhIHRocmVzaG9sZFxuXG4gIGNvbnN0cnVjdG9yOiAoYXVkaW9VcmwpIC0+XG4gICAgQHNvdW5kID0gbmV3IFNvdW5kKGF1ZGlvVXJsKVxuICAgIEBjb250YWluZXIgPSBkb2N1bWVudC5ib2R5XG4gICAgQHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dCcpXG4gICAgQGxpc3RlbkZvcklucHV0KClcblxuICBsaXN0ZW5Gb3JJbnB1dDogLT5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIgJ3RvdWNoc3RhcnQnLCBAYWN0aXZhdGUsIGZhbHNlXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyICdtb3VzZWRvd24nLCBAYWN0aXZhdGUsIGZhbHNlXG5cbiAgYWN0aXZhdGU6ID0+XG4gICAgQGRpbmcoKVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lciAndG91Y2hzdGFydCcsIEBhY3RpdmF0ZSwgZmFsc2VcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcImRldmljZW1vdGlvblwiLCBAcmluZywgZmFsc2VcblxuICByaW5nOiA9PlxuICAgIHJvdGF0aW9uUmF0ZVogPSBldmVudC5yb3RhdGlvblJhdGUuYWxwaGFcbiAgICBcbiAgICBpZiBAZGluZ2VkKHJvdGF0aW9uUmF0ZVopXG4gICAgICBAZGluZygpXG4gICAgZWxzZSBpZiBAZG9uZ2VkKHJvdGF0aW9uUmF0ZVopXG4gICAgICBAZG9uZygpXG5cbiAgZGluZzogLT5cbiAgICBAc291bmQucGxheSgpXG4gICAgQGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2RpbmcnKVxuICAgIEB0ZXh0LmlubmVyVGV4dCA9IFwiZGluZyFcIlxuICAgIEBmbGlwcGVkID0gdHJ1ZVxuXG4gIGRvbmc6IC0+XG4gICAgQHNvdW5kLnBsYXkoKVxuICAgIEBjb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkb25nJylcbiAgICBAdGV4dC5pbm5lclRleHQgPSBcImRvbmchXCJcbiAgICBAZmxpcHBlZCA9IGZhbHNlXG5cbiAgZGluZ2VkOiAocm90YXRpb25SYXRlKSAtPlxuICAgIHJvdGF0aW9uUmF0ZSA+IEB0aHJlc2hvbGQgYW5kIG5vdCBAZmxpcHBlZFxuXG4gIGRvbmdlZDogKHJvdGF0aW9uUmF0ZSkgLT5cbiAgICByb3RhdGlvblJhdGUgPCAtQHRocmVzaG9sZCBhbmQgQGZsaXBwZWRcbiIsIndpbmRvdy5BdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHRcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTb3VuZFxuICBjb25zdHJ1Y3RvcjogKHVybCkgLT5cbiAgICBAY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKVxuICAgIEBsb2FkKHVybClcblxuICBwbGF5OiA9PlxuICAgIGlmIEBidWZmZXJcbiAgICAgIHNvdXJjZSA9IEBjb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG4gICAgICBzb3VyY2UuYnVmZmVyID0gQGJ1ZmZlclxuICAgICAgc291cmNlLmNvbm5lY3QoQGNvbnRleHQuZGVzdGluYXRpb24pXG4gICAgICBzb3VyY2Uuc3RhcnQoMCkgIyBQbGF5IHNvdW5kIGltbWVkaWF0ZWx5XG4gICAgZWxzZVxuICAgICAgY29uc29sZS5sb2cgJ2J1ZmZlcmluZy4uLidcblxuICBsb2FkOiAodXJsKSAtPlxuICAgIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgIHJlcXVlc3Qub3BlbignZ2V0JywgdXJsLCB0cnVlKVxuICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJ1xuICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT5cbiAgICAgIEBjb250ZXh0LmRlY29kZUF1ZGlvRGF0YShyZXF1ZXN0LnJlc3BvbnNlLCBAc2F2ZUJ1ZmZlcilcbiAgICByZXF1ZXN0LnNlbmQoKVxuXG4gIHNhdmVCdWZmZXI6IChpbmNvbWluZ0J1ZmZlcikgPT4gXG4gICAgQGJ1ZmZlciA9IGluY29taW5nQnVmZmVyXG4iXX0=
