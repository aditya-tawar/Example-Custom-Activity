'use strict'
// Module Dependencies
// -------------------
var express = require('express')
var bodyParser = require('body-parser')
var errorhandler = require('errorhandler')
var http = require('http')
var https = require('https')
var path = require('path')
var request = require('request')
var routes = require('./routes')
var activity = require('./routes/activity')
const configJSON = require('./public/configJSON')
var app = express()

// Configure Express
app.set('port', process.env.PORT || 3000)
//app.use(bodyParser.raw({ type: 'application/jwt' }))
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')))

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler())
}

app.get('/config.json', function (req, res) {
  // Journey Builder looks for config.json when the canvas loads.
  // We'll dynamically generate the config object with a function
  return res.status(200).json(configJSON(req))
})

// HubExchange Routes
app.get('/', routes.index)
app.post('/login', routes.login)
app.post('/logout', routes.logout)

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save)
app.post('/journeybuilder/validate/', activity.validate)
app.post('/journeybuilder/publish/', activity.publish)
app.post('/journeybuilder/execute/', activity.execute)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
