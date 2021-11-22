const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}));

app.post("/" , function(req, res) {
    //res.send("Thank you for sending response.")

    const query = req.body.city;
    const key = "not mentioned because unique for each user";
    const unit = "metric";
    //console.log(req.body.city)
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response.statusCode)

        response.on("data", function(data) {
            console.log(data)
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            console.log(temp)
            const desp = weatherData.weather[0].description
            console.log(desp)

            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            // const icon = weatherData.weather[0].icon
            // res.write(icon)
            res.write("<h1>" + "Temprature in " + query + " is " + temp + " degree celsius." + "</h1>")
            res.write("<h3>Weather description is " + desp + "</h3>")  
            res.write("<img src = " + imgURL + ">")

            res.send()
        })
    })
})    

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
    
})

app.listen(3000, function() {
    console.log("Server listening at port 3000.")
})
