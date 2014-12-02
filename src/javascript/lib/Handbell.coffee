Sound = require('./Sound')

module.exports = class Handbell

  threshold: 400 # event.rotationRate.alpha threshold

  constructor: (audioUrl) ->
    @sounds =
      ding: new Sound('bell-F4.wav')
      dong: new Sound('bell-C4.wav')

    @container = document.body
    @text = document.getElementById('text')
    @listenForInput()

  listenForInput: ->
    document.body.addEventListener 'touchstart', @activate, false
    document.body.addEventListener 'mousedown', @activate, false

  activate: =>
    @ding()
    @dong()
    @notForward = true
    @notBackward = true
    @maxAcceleration = 0
    document.body.removeEventListener 'touchstart', @activate, false
    window.addEventListener "devicemotion", @ring, false

  ring: =>
    zRotationRate = event.rotationRate.alpha
    zAcceleration = event.acceleration.z
    motionValue = zRotationRate + zAcceleration * 40

    if @forwardRing(motionValue)
      @ding()
    else if @backwardsRing(motionValue)
      @dong()

    @notBackward ||= motionValue <= @threshold * .9
    @notForward ||= motionValue >= -@threshold * .9

  ding: ->
    @sounds.ding.play()
    @container.setAttribute('class', 'ding')
    @text.innerText = "ding!"
    @notForward = false

  dong: ->
    @sounds.dong.play()
    @container.setAttribute('class', 'dong')
    @text.innerText = "dong!"
    @notBackward = false

  forwardRing: (rotationRate) ->
    rotationRate < -@threshold and @notForward

  backwardsRing: (rotationRate) ->
    rotationRate > @threshold and @notBackward
