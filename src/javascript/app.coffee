Handbell = require('./lib/Handbell')

container = document.body
text = document.getElementById('text')
handbell = new Handbell('bell-F4.wav')

onDing = ->
  container.setAttribute('class', 'ding')
  text.innerText = "ding!"

onDong = ->
  container.setAttribute('class', 'dong')
  text.innerText = "dong!"

onReady = ->
  text.innerText = "ready!"
  container.removeEventListener 'touchstart', handbell.initialize, false
  handbell.sound.play()

handbell
  .on 'ding', onDing
  .on 'dong', onDong
  .on 'ready', onReady

container.addEventListener 'touchstart', handbell.initialize, false
container.addEventListener 'mousedown', handbell.initialize, false
