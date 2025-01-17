//Dependency to fetch data
const fetch = require("node-fetch");
//Configure dotenv to be able to use environment variables found in the .env file at the root folder
const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
var APIResponse = require('./API.js')
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})



app.post('/makeSummary', async(req, res)=>{
	var urlLink = req.body.urlLink;
	var summarySize = req.body.summarySize;
	const mySummary = await fetch('https://api.meaningcloud.com/summarization-1.0?key='+process.env.license_key+'&url='+urlLink+'&sentences='+summarySize, {
		method: "POST"
	});
	
	try {
		const summary = await mySummary.json();
		//res.json(summary)
		res.send(summary)
	} catch (error){
		console.log("error", error)
	}
    
})

app.post('/sentiment', async(req, res)=>{
	var urlLink = req.body.urlLink;
	const mySentiment = await fetch ('https://api.meaningcloud.com/sentiment-2.1?key='+process.env.license_key+'&lang=en&url='+urlLink+'&model=general', {
		method: "POST"
	});
	
	try {
		const sentiment = await mySentiment.json();
		//res.json(summary)
		console.log(sentiment)
		res.send(sentiment)
	} catch (error){
		console.log("error", error)
	}
    
})


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
    console.log('Your License key is '+process.env.license_key);
})
