const fs = require('fs')
const sharp = require('sharp')

module.exports = function resize(url, format, top, left, width, height) {
  const readStream =  fs.createReadStream(url)  
  let transform = sharp()
  if (top || left) {
    transform = transform.extract({top, left, width, height})
  }
  if (format) {
    transform = transform.toFormat(format)
  }

  return readStream.pipe(transform)
}