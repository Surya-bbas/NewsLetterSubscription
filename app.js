const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('express');
const app = express();
const https= require('https');
const { url } = require('inspector');
const { post } = require('request');
const { request } = require('http');



app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(`public`))

app.get(`/`,(req,res) => {
    
    console.log('get completed');
    res.sendFile(`${__dirname}/index.html`);
    
})

app.post('/',(req,res) => {
    const fName=req.body.firstName
    const lName=req.body.lastName
    const mail=req.body.email
    console.log(fName);
    console.log(lName);
    console.log(mail);
    

    const data= {
        members:
        [
            {
                email_address:mail,
                status:'subscribed',
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }


            }
        ]
    }

    const jsonWeatherData=JSON.stringify(data)
    console.log(jsonWeatherData);

    const url= 'https://us17.api.mailchimp.com/3.0/lists/3188593a85'

    const options={
        method:'POST',
        auth:'Surya:05d92ca4a249fadbe6429c1b853c794f-us17'


    }

    const request1 = https.request(url,options,(response) => {

        console.log(response.statusCode);

        if (response.statusCode===200) {
            res.sendFile(`${__dirname}/sucess.html`)
        }
        else{
            res.sendFile(`${__dirname}/failure.html`)
        }

        response.on('data',(data) => {
            console.log(JSON.parse(data) );
        })
        response.on('error',(e) => console.log(e))
    })

    request1.write(jsonWeatherData)
    request1.end();

})

app.post('/failure',(req,res) => {
    res.redirect('/')
})



app.listen( process.env.PORT || 3000,() => console.log(`the server is running in port 3000`))

// api key 05d92ca4a249fadbe6429c1b853c794f-us17

// unique audince id  3188593a85



 