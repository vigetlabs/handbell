Sound = require('./Sound')

module.exports = class Handbell
  
  threshold: 150 # event.rotationRate.alpha threshold

  constructor: (audioUrl) ->
    @sound = new Sound(audioUrl)
    @listenForInput()

  listenForInput: ->
    # Init sound with touch
    document.body.addEventListener 'touchstart', @sound.play, false
    document.body.addEventListener 'mousedown', @sound.play, false
    # window.addEventListener "deviceorientation", @ring, false
    window.addEventListener "devicemotion", @ring, false

  ding: ->
    @sound.play()
    @flipped = true

  dong: ->
    @sound.play()
    @flipped = false

  dinged: (rotationRate) ->
    rotationRate > @threshold and not @flipped

  donged: (rotationRate) ->
    rotationRate < -@threshold and @flipped

  ring: =>
    rotationRateZ = event.rotationRate.alpha
    @ding() if @dinged(rotationRateZ)
    @dong() if @donged(rotationRateZ)
      
    @debug
      state: "#{if @flipped then 'ding' else 'dong'}"
      rotationZ: rotationRateZ

  debug: (properties) ->
    text =
      for key of properties
        "#{key}: #{properties[key]}"

    document.body.innerText = text.join('\n')
