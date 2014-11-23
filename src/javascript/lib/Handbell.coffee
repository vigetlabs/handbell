Sound = require('./Sound')

module.exports = class Handbell
  thresholdY: 25 #deg
  lastX: 0
  lastY: 0

  constructor: (audioUrl) ->
    @sound = new Sound(audioUrl)
    @listenForInput()

  listenForInput: ->
    # Init sound with touch
    document.body.addEventListener 'touchstart', @sound.play, false
    document.body.addEventListener 'mousedown', @sound.play, false
    window.addEventListener "deviceorientation", @ring, false

  ring: =>
    x = event.beta + 0.5 | 0
    y = event.gamma + 0.5 | 0
    deltaY = Math.abs(y - @lastY)
    @debug(x, y, deltaY)

    if deltaY > @thresholdY
      @lastX = x
      @lastY = y
      @sound.play()

  debug: (x, y, deltaY)->
    document.body.innerText = "
      deviceorientation: #{x}, #{y} \n
      deltaY = #{deltaY} \n
      lastX = #{@lastX} \n
      lastY = #{@lastY}
    "