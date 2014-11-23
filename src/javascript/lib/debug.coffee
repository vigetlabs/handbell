module.exports = (properties) ->
  text =
    for key of properties
      "#{key}: #{properties[key]}"

  document.body.innerText = text.join('\n')