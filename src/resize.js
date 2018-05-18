const fs = require('fs')
const sharp = require('sharp')

/**
 * Sample resize:
 * http://localhost:4080/?l=55&t=260&w=125&h=135
 */
module.exports = function resize(url, format, top, left, width, height) {
  // const readStream =  fs.createReadStream(url)  
  let transform = sharp(url)
  if (top || left && width || height) {
    transform = transform.extract({top, left, width, height})
  }
  if (format) {
    transform = transform.toFormat(format)
  }

  return transform.toBuffer()
}