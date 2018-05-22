const express = require('express')

const server = express()

const Tesseract = require('tesseract.js')

const resize = require('./resize')

const path = require('path')

// routing
server.get('/', (req, res) => {
  const widthStr = req.query.w
  const heightStr = req.query.h
  const topStr = req.query.t
  const leftStr = req.query.l
  const format = req.query.f

  let width, height, top, left
  if (widthStr) {
    width = parseInt(widthStr)
  }

  if (heightStr) {
    height = parseInt(heightStr)
  }

  if (topStr) {
    top = parseInt(topStr)
  }

  if (leftStr) {
    left = parseInt(leftStr)
  }

  res.type(`image/${format || 'png'}`)
  res.setHeader('Content-Type', 'application/json')

  let lp = path.resolve(__dirname, '..', 'trained_data', 'extracted')
  console.log(lp)
  
  //
  resize('006.jpg', format, top, left, width, height)
    .then((ibuff) => {
      Tesseract.recognize(ibuff, { lang: path.resolve(lp, 'jpn')})
        .then((result) => {
          console.log(result.text)
          res.send(JSON.stringify({ text: result.text }, null, 3))
        })
        .catch((error) => {
          console.error(error)
          res.error(error)
        })
        .finally(() => {
          console.log('Done!')
          res.flushHeaders()
        })
    }).catch((err) => {
      console.error(err)
      res.error(err)
      res.flushHeaders()
    })
  
  // resize('006.jpg', format, top, left, width, height).pipe(res)
})

server.listen(4080, () => {
  console.log('Server started!')
})