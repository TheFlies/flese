const express = require('express')

const server = express()

const resize = require('./resize')

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
  resize('006.jpg', format, top, left, width, height).pipe(res)
})

server.listen(4080, () => {
  console.log('Server started!')
})