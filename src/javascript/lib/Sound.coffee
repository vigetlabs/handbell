eventsModule = require('smokesignals')
AudioContext = window.AudioContext || window.webkitAudioContext
testAudio    = document.createElement('audio')
mp3support   = !!(testAudio.canPlayType && testAudio.canPlayType('audio/mpeg;').replace(/no/, ''))

module.exports = class Sound

  volume: 1

  constructor: (url) ->
    eventsModule.convert(@)
    @context = new AudioContext()
    @load(url + @extension())

  extension: =>
    if mp3support then '.mp3' else '.ogg'

  play: =>
    if @buffer
      source = @context.createBufferSource()
      gainNode = @context.createGain()
      source.buffer = @buffer
      gainNode.gain.value = @volume
      source.connect(gainNode)
      gainNode.connect(@context.destination)
      source.start(0)

    else unless @queued
      @queued = true
      @once('ready', @play)

  load: (url) ->
    request = new XMLHttpRequest()
    request.open('get', url, true)
    request.responseType = 'arraybuffer'
    request.onload = @decodeAudio
    request.send()

  decodeAudio: (e) =>
    @context.decodeAudioData(e.currentTarget.response, @saveBuffer)

  saveBuffer: (incomingBuffer) =>
    @buffer = incomingBuffer
    @emit('ready')
