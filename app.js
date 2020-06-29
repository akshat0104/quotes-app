const quote = require('inspirational-quotes')
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

// using Twilio SendGrid's v3 Node.js Library
require('dotenv').config()
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

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
    let mail = req.body.email

const msg = {
  to: mail,
  from: 'joshiabhishek673@gmail.com',
  subject: 'Welcome!',
  html: '<h2><strong>We are happy to see you here. Read some of the motivational quotes to keep yourself motivated</strong></h2>',
};
sgMail.send(msg);

    res.redirect('quote')
})

app.get('/quote', (req, res) =>{
    res.render('quote', {
        title: quote.getQuote().text,
        author:  quote.getQuote().author
    })
})
