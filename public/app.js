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
  Handbell.prototype.threshold = 150;

  function Handbell(audioUrl) {
    this.ring = __bind(this.ring, this);
    this.sound = new Sound(audioUrl);
    this.listenForInput();
  }

  Handbell.prototype.listenForInput = function() {
    document.body.addEventListener('touchstart', this.sound.play, false);
    document.body.addEventListener('mousedown', this.sound.play, false);
    return window.addEventListener("devicemotion", this.ring, false);
  };

  Handbell.prototype.ding = function() {
    this.sound.play();
    return this.flipped = true;
  };

  Handbell.prototype.dong = function() {
    this.sound.play();
    return this.flipped = false;
  };

  Handbell.prototype.dinged = function(rotationRate) {
    return rotationRate > this.threshold && !this.flipped;
  };

  Handbell.prototype.donged = function(rotationRate) {
    return rotationRate < -this.threshold && this.flipped;
  };

  Handbell.prototype.ring = function() {
    var rotationRateZ;
    rotationRateZ = event.rotationRate.alpha;
    if (this.dinged(rotationRateZ)) {
      this.ding();
    }
    if (this.donged(rotationRateZ)) {
      this.dong();
    }
    return this.debug({
      state: "" + (this.flipped ? 'ding' : 'dong'),
      rotationZ: rotationRateZ
    });
  };

  Handbell.prototype.debug = function(properties) {
    var key, text;
    text = (function() {
      var _results;
      _results = [];
      for (key in properties) {
        _results.push("" + key + ": " + properties[key]);
      }
      return _results;
    })();
    return document.body.innerText = text.join('\n');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL3NyYy9qYXZhc2NyaXB0L2FwcC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL3NyYy9qYXZhc2NyaXB0L2xpYi9IYW5kYmVsbC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL1NpdGVzL2hhbmRiZWxsL3NyYy9qYXZhc2NyaXB0L2xpYi9Tb3VuZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLGtCQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsZ0JBQVIsQ0FBWCxDQUFBOztBQUFBLFFBRUEsR0FBZSxJQUFBLFFBQUEsQ0FBUyxhQUFULENBRmYsQ0FBQTs7QUFBQSxPQUdPLENBQUMsR0FBUixDQUFZLFFBQVosQ0FIQSxDQUFBOzs7OztBQ0FBLElBQUEsZUFBQTtFQUFBLGtGQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUixDQUFSLENBQUE7O0FBQUEsTUFFTSxDQUFDLE9BQVAsR0FBdUI7QUFFckIscUJBQUEsU0FBQSxHQUFXLEdBQVgsQ0FBQTs7QUFFYSxFQUFBLGtCQUFDLFFBQUQsR0FBQTtBQUNYLHVDQUFBLENBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxLQUFBLENBQU0sUUFBTixDQUFiLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxjQUFELENBQUEsQ0FEQSxDQURXO0VBQUEsQ0FGYjs7QUFBQSxxQkFNQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTtBQUVkLElBQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZCxDQUErQixZQUEvQixFQUE2QyxJQUFDLENBQUEsS0FBSyxDQUFDLElBQXBELEVBQTBELEtBQTFELENBQUEsQ0FBQTtBQUFBLElBQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZCxDQUErQixXQUEvQixFQUE0QyxJQUFDLENBQUEsS0FBSyxDQUFDLElBQW5ELEVBQXlELEtBQXpELENBREEsQ0FBQTtXQUdBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixjQUF4QixFQUF3QyxJQUFDLENBQUEsSUFBekMsRUFBK0MsS0FBL0MsRUFMYztFQUFBLENBTmhCLENBQUE7O0FBQUEscUJBYUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNKLElBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQUEsQ0FBQSxDQUFBO1dBQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxLQUZQO0VBQUEsQ0FiTixDQUFBOztBQUFBLHFCQWlCQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0osSUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBQSxDQUFBLENBQUE7V0FDQSxJQUFDLENBQUEsT0FBRCxHQUFXLE1BRlA7RUFBQSxDQWpCTixDQUFBOztBQUFBLHFCQXFCQSxNQUFBLEdBQVEsU0FBQyxZQUFELEdBQUE7V0FDTixZQUFBLEdBQWUsSUFBQyxDQUFBLFNBQWhCLElBQThCLENBQUEsSUFBSyxDQUFBLFFBRDdCO0VBQUEsQ0FyQlIsQ0FBQTs7QUFBQSxxQkF3QkEsTUFBQSxHQUFRLFNBQUMsWUFBRCxHQUFBO1dBQ04sWUFBQSxHQUFlLENBQUEsSUFBRSxDQUFBLFNBQWpCLElBQStCLElBQUMsQ0FBQSxRQUQxQjtFQUFBLENBeEJSLENBQUE7O0FBQUEscUJBMkJBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDSixRQUFBLGFBQUE7QUFBQSxJQUFBLGFBQUEsR0FBZ0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFuQyxDQUFBO0FBQ0EsSUFBQSxJQUFXLElBQUMsQ0FBQSxNQUFELENBQVEsYUFBUixDQUFYO0FBQUEsTUFBQSxJQUFDLENBQUEsSUFBRCxDQUFBLENBQUEsQ0FBQTtLQURBO0FBRUEsSUFBQSxJQUFXLElBQUMsQ0FBQSxNQUFELENBQVEsYUFBUixDQUFYO0FBQUEsTUFBQSxJQUFDLENBQUEsSUFBRCxDQUFBLENBQUEsQ0FBQTtLQUZBO1dBSUEsSUFBQyxDQUFBLEtBQUQsQ0FDRTtBQUFBLE1BQUEsS0FBQSxFQUFPLEVBQUEsR0FBRSxDQUFJLElBQUMsQ0FBQSxPQUFKLEdBQWlCLE1BQWpCLEdBQTZCLE1BQTlCLENBQVQ7QUFBQSxNQUNBLFNBQUEsRUFBVyxhQURYO0tBREYsRUFMSTtFQUFBLENBM0JOLENBQUE7O0FBQUEscUJBb0NBLEtBQUEsR0FBTyxTQUFDLFVBQUQsR0FBQTtBQUNMLFFBQUEsU0FBQTtBQUFBLElBQUEsSUFBQTs7QUFDRTtXQUFBLGlCQUFBLEdBQUE7QUFDRSxzQkFBQSxFQUFBLEdBQUcsR0FBSCxHQUFPLElBQVAsR0FBVyxVQUFXLENBQUEsR0FBQSxFQUF0QixDQURGO0FBQUE7O1FBREYsQ0FBQTtXQUlBLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBZCxHQUEwQixJQUFJLENBQUMsSUFBTCxDQUFVLElBQVYsRUFMckI7RUFBQSxDQXBDUCxDQUFBOztrQkFBQTs7SUFKRixDQUFBOzs7OztBQ0FBLElBQUEsS0FBQTtFQUFBLGtGQUFBOztBQUFBLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLE1BQU0sQ0FBQyxZQUFQLElBQXVCLE1BQU0sQ0FBQyxrQkFBcEQsQ0FBQTs7QUFBQSxNQUVNLENBQUMsT0FBUCxHQUF1QjtBQUNSLEVBQUEsZUFBQyxHQUFELEdBQUE7QUFDWCxtREFBQSxDQUFBO0FBQUEsdUNBQUEsQ0FBQTtBQUFBLElBQUEsSUFBQyxDQUFBLE9BQUQsR0FBZSxJQUFBLFlBQUEsQ0FBQSxDQUFmLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sR0FBTixDQURBLENBRFc7RUFBQSxDQUFiOztBQUFBLGtCQUlBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDSixRQUFBLE1BQUE7QUFBQSxJQUFBLElBQUcsSUFBQyxDQUFBLE1BQUo7QUFDRSxNQUFBLE1BQUEsR0FBUyxJQUFDLENBQUEsT0FBTyxDQUFDLGtCQUFULENBQUEsQ0FBVCxDQUFBO0FBQUEsTUFDQSxNQUFNLENBQUMsTUFBUCxHQUFnQixJQUFDLENBQUEsTUFEakIsQ0FBQTtBQUFBLE1BRUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFDLENBQUEsT0FBTyxDQUFDLFdBQXhCLENBRkEsQ0FBQTthQUdBLE1BQU0sQ0FBQyxLQUFQLENBQWEsQ0FBYixFQUpGO0tBQUEsTUFBQTthQU1FLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWixFQU5GO0tBREk7RUFBQSxDQUpOLENBQUE7O0FBQUEsa0JBYUEsSUFBQSxHQUFNLFNBQUMsR0FBRCxHQUFBO0FBQ0osUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQWMsSUFBQSxjQUFBLENBQUEsQ0FBZCxDQUFBO0FBQUEsSUFDQSxPQUFPLENBQUMsSUFBUixDQUFhLEtBQWIsRUFBb0IsR0FBcEIsRUFBeUIsSUFBekIsQ0FEQSxDQUFBO0FBQUEsSUFFQSxPQUFPLENBQUMsWUFBUixHQUF1QixhQUZ2QixDQUFBO0FBQUEsSUFHQSxPQUFPLENBQUMsTUFBUixHQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQSxHQUFBO2VBQ2YsS0FBQyxDQUFBLE9BQU8sQ0FBQyxlQUFULENBQXlCLE9BQU8sQ0FBQyxRQUFqQyxFQUEyQyxLQUFDLENBQUEsVUFBNUMsRUFEZTtNQUFBLEVBQUE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBSGpCLENBQUE7V0FLQSxPQUFPLENBQUMsSUFBUixDQUFBLEVBTkk7RUFBQSxDQWJOLENBQUE7O0FBQUEsa0JBcUJBLFVBQUEsR0FBWSxTQUFDLGNBQUQsR0FBQTtXQUNWLElBQUMsQ0FBQSxNQUFELEdBQVUsZUFEQTtFQUFBLENBckJaLENBQUE7O2VBQUE7O0lBSEYsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJIYW5kYmVsbCA9IHJlcXVpcmUoJy4vbGliL0hhbmRiZWxsJylcblxuaGFuZGJlbGwgPSBuZXcgSGFuZGJlbGwoJ2JlbGwtQzQud2F2JylcbmNvbnNvbGUubG9nIGhhbmRiZWxsIiwiU291bmQgPSByZXF1aXJlKCcuL1NvdW5kJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBIYW5kYmVsbFxuICBcbiAgdGhyZXNob2xkOiAxNTAgIyBldmVudC5yb3RhdGlvblJhdGUuYWxwaGEgdGhyZXNob2xkXG5cbiAgY29uc3RydWN0b3I6IChhdWRpb1VybCkgLT5cbiAgICBAc291bmQgPSBuZXcgU291bmQoYXVkaW9VcmwpXG4gICAgQGxpc3RlbkZvcklucHV0KClcblxuICBsaXN0ZW5Gb3JJbnB1dDogLT5cbiAgICAjIEluaXQgc291bmQgd2l0aCB0b3VjaFxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAndG91Y2hzdGFydCcsIEBzb3VuZC5wbGF5LCBmYWxzZVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAnbW91c2Vkb3duJywgQHNvdW5kLnBsYXksIGZhbHNlXG4gICAgIyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcImRldmljZW9yaWVudGF0aW9uXCIsIEByaW5nLCBmYWxzZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwiZGV2aWNlbW90aW9uXCIsIEByaW5nLCBmYWxzZVxuXG4gIGRpbmc6IC0+XG4gICAgQHNvdW5kLnBsYXkoKVxuICAgIEBmbGlwcGVkID0gdHJ1ZVxuXG4gIGRvbmc6IC0+XG4gICAgQHNvdW5kLnBsYXkoKVxuICAgIEBmbGlwcGVkID0gZmFsc2VcblxuICBkaW5nZWQ6IChyb3RhdGlvblJhdGUpIC0+XG4gICAgcm90YXRpb25SYXRlID4gQHRocmVzaG9sZCBhbmQgbm90IEBmbGlwcGVkXG5cbiAgZG9uZ2VkOiAocm90YXRpb25SYXRlKSAtPlxuICAgIHJvdGF0aW9uUmF0ZSA8IC1AdGhyZXNob2xkIGFuZCBAZmxpcHBlZFxuXG4gIHJpbmc6ID0+XG4gICAgcm90YXRpb25SYXRlWiA9IGV2ZW50LnJvdGF0aW9uUmF0ZS5hbHBoYVxuICAgIEBkaW5nKCkgaWYgQGRpbmdlZChyb3RhdGlvblJhdGVaKVxuICAgIEBkb25nKCkgaWYgQGRvbmdlZChyb3RhdGlvblJhdGVaKVxuICAgICAgXG4gICAgQGRlYnVnXG4gICAgICBzdGF0ZTogXCIje2lmIEBmbGlwcGVkIHRoZW4gJ2RpbmcnIGVsc2UgJ2RvbmcnfVwiXG4gICAgICByb3RhdGlvblo6IHJvdGF0aW9uUmF0ZVpcblxuICBkZWJ1ZzogKHByb3BlcnRpZXMpIC0+XG4gICAgdGV4dCA9XG4gICAgICBmb3Iga2V5IG9mIHByb3BlcnRpZXNcbiAgICAgICAgXCIje2tleX06ICN7cHJvcGVydGllc1trZXldfVwiXG5cbiAgICBkb2N1bWVudC5ib2R5LmlubmVyVGV4dCA9IHRleHQuam9pbignXFxuJylcbiIsIndpbmRvdy5BdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHRcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTb3VuZFxuICBjb25zdHJ1Y3RvcjogKHVybCkgLT5cbiAgICBAY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKVxuICAgIEBsb2FkKHVybClcblxuICBwbGF5OiA9PlxuICAgIGlmIEBidWZmZXJcbiAgICAgIHNvdXJjZSA9IEBjb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG4gICAgICBzb3VyY2UuYnVmZmVyID0gQGJ1ZmZlclxuICAgICAgc291cmNlLmNvbm5lY3QoQGNvbnRleHQuZGVzdGluYXRpb24pXG4gICAgICBzb3VyY2Uuc3RhcnQoMCkgIyBQbGF5IHNvdW5kIGltbWVkaWF0ZWx5XG4gICAgZWxzZVxuICAgICAgY29uc29sZS5sb2cgJ2J1ZmZlcmluZy4uLidcblxuICBsb2FkOiAodXJsKSAtPlxuICAgIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgIHJlcXVlc3Qub3BlbignZ2V0JywgdXJsLCB0cnVlKVxuICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJ1xuICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT5cbiAgICAgIEBjb250ZXh0LmRlY29kZUF1ZGlvRGF0YShyZXF1ZXN0LnJlc3BvbnNlLCBAc2F2ZUJ1ZmZlcilcbiAgICByZXF1ZXN0LnNlbmQoKVxuXG4gIHNhdmVCdWZmZXI6IChpbmNvbWluZ0J1ZmZlcikgPT4gXG4gICAgQGJ1ZmZlciA9IGluY29taW5nQnVmZmVyXG4iXX0=
