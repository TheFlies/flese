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

  let lp = path.resolve(__dirname, '..', 'trained_data', 'extracted')
  console.log(lp)
  
  Tesseract.create({
    langPath: lp
  }).recognize(resize('006.jpg', format, top, left, width, height), { lang: 'jpn'})
    .then((result) => {
      console.log(result.text)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      console.log('Done!')
    })
  // resize('006.jpg', format, top, left, width, height).pipe(res)
})

server.listen(4080, () => {
  console.log('Server started!')
})