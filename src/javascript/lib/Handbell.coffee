Sound = require('./Sound')

module.exports = class Handbell
  
  threshold: 150 # event.rotationRate.alpha threshold

  constructor: (audioUrl) ->
    @sound = new Sound(audioUrl)
    @container = document.body
    @text = document.getElementById('text')
    @listenForInput()

  listenForInput: ->
    document.body.addEventListener 'touchstart', @activate, false
    document.body.addEventListener 'mousedown', @activate, false

  activate: =>
    @ding()
    document.body.removeEventListener 'touchstart', @activate, false
    window.addEventListener "devicemotion", @ring, false

  ring: =>
    rotationRateZ = event.rotationRate.alpha
    
    if @dinged(rotationRateZ)
      @ding()
    else if @donged(rotationRateZ)
      @dong()

  ding: ->
    @sound.play()
    @container.setAttribute('class', 'ding')
    @text.innerText = "ding!"
    @flipped = true

  dong: ->
    @sound.play()
    @container.setAttribute('class', 'dong')
    @text.innerText = "dong!"
    @flipped = false

  dinged: (rotationRate) ->
    rotationRate > @threshold and not @flipped

  donged: (rotationRate) ->
    rotationRate < -@threshold and @flipped
