const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')
const app = express()

const config = {
  dev: false,
  buildDir: '.nuxt'
}
const nuxt = new Nuxt(config)

function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, promise => {
      promise.then(resolve).catch(reject)
    })
  })
}

app.use(handleRequest)
exports.app= functions.https.onRequest(app)
