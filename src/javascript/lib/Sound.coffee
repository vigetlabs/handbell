window.AudioContext = window.AudioContext || window.webkitAudioContext

module.exports = class Sound
  constructor: (url) ->
    @context = new AudioContext()
    @load(url)

  play: =>
    if @buffer
      source = @context.createBufferSource()
      source.buffer = @buffer
      source.connect(@context.destination)
      source.start(0) # Play sound immediately
    else
      console.log 'buffering...'

  load: (url) ->
    request = new XMLHttpRequest()
    request.open('get', url, true)
    request.responseType = 'arraybuffer'
    request.onload = () =>
      @context.decodeAudioData(request.response, @saveBuffer)
    request.send()

  saveBuffer: (incomingBuffer) => 
    @buffer = incomingBuffer
