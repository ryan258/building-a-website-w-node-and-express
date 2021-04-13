const express = require('express')
const path = require('path')

const app = express()

const port = 3000

// use some middleware to serve static assets
app.use(express.static(path.join(__dirname, './static')))

app.get('/', (req, res) => {
  // respond to a root req w/ the home page html
  res.sendFile(path.join(__dirname, './static/index.html'))
})

app.get('/speakers', (req, res) => {
  // respond to a root req w/ the home page html
  res.sendFile(path.join(__dirname, './static/speakers.html'))
})

app.get('/feedback', (req, res) => {
  // respond to a root req w/ the home page html
  res.sendFile(path.join(__dirname, './static/feedback.html'))
})

app.listen(port, () => {
  console.log(`Express server is listening on ${port}!`)
})
