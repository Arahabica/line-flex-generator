const functions = require('firebase-functions')
const { scrapeOPSite, scrapeRestaurant } = require('./scraping')
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
    nuxt.ready().then(() => {
      nuxt.render(req, res, promise => {
        promise.then(resolve).catch(reject)
      })
    })
  })
}

app.use(handleRequest)

const api = express()
api.get('/api/scrape', (req, res) => {
  const url = req.query.url
  let response
  if (!url) {
    const message = 'parameter url is not found.'
    res.status(400).send(JSON.stringify({ message }))
  }
  scrapeOPSite(url).then(data => {
    res.send(JSON.stringify({ data }))
  }).catch(err => {
    res.status(400).send(JSON.stringify({ message: err }))
  })
})

api.get('/api/scrape/restaurant', (req, res) => {
  const url = req.query.url
  let response
  if (!url) {
    const message = 'parameter url is not found.'
    res.status(400).send(JSON.stringify({ message }))
  }
  scrapeRestaurant(url).then(data => {
    res.send(JSON.stringify({ data }))
  }).catch(err => {
    res.status(400).send(JSON.stringify({ message: err }))
  })
})

exports.app = functions.https.onRequest(app)
exports.api = functions.https.onRequest(api)
