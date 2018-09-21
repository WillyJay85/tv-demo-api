const express = require('express')
const app = express()
const port = 3000

app.get('/tv-demo', (req, res) => res.send('Enjoy your show!'))

app.post(`/tv-demo`, (req, res) => res.send(`You have selected your show`))

app.put('/tv-demo', (req, res) => res.send('You have changed your selection'))

app.delete('/tv-demo', (req, res) => res.send('Your show was cancelled'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))