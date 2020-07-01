require('dotenv').config()

const quote = require('inspirational-quotes')
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

//Setting view engine as hbs
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/views')) //for html file
app.set('views', path.join(__dirname, 'views'))

const port = process.env.PORT || 3000

const server = app.listen(port,() =>{
    console.log('Server is up on ' + port + '  in %s mode', app.settings.env)
})

app.get('/', (req, res) =>{
    res.render('index')
})

app.post('/submit',(req, res) =>{
    res.render('user', {
        user: req.body.username
    })
})

app.post('/quotes', (req, res) =>{
    res.redirect('quote')
})

app.get('/quote', (req, res) =>{
    res.render('quote', {
        title: quote.getQuote().text,
        author:  quote.getQuote().author
    })
})
