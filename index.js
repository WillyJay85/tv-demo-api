const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


      const tvShows = []
        
 

app.get('/tv-demo', (req, res) => {
    res.send(tvShows)
})

app.post('/tv-demo', (req, res) =>  {
    tvShows.push(req.body)
    res.send(tvShows)
})

app.put('/tv-demo', (req, res) => res.send('You have changed your selection'))

app.delete('/tv-demo', (req, res) => res.send('Your show was cancelled'))

app.listen(port, () => console.log(` app listening on port ${port}!`))