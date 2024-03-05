import express from 'express'
const app = express()
app.use(express.static('public'))
app.get('/message', (req, res) => {
  res.send('This is the information from the node server')
})

app.post('/message', (req, res) => {
  if (req) {
    res.send(req + '--from node')
  }
})

export default app
