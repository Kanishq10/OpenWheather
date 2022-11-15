const express=require('express')
const https=require('https')    //native, no need to install
const app=express()
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post('/',(req,res)=>{
    const cityname=req.body.city
    const key='da8e0117d8f3a24a07984c7051f3a6b0'
    let url='https://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid='+key+'&units=metric'
    https.get(url,function(response){  //simple https request
    console.log(response.statusCode);
    response.on("data",function(data){
        let weatherdata=JSON.parse(data);
        console.log("Temperature: ",weatherdata.main.temp);
        console.log("Wheather: ",weatherdata.weather[0].description);
        let icon=weatherdata.weather[0].icon;
        const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>Temprature in "+weatherdata.name +" is "+ weatherdata.main.temp+ " Degree Celsius</h1>");
        res.write("<h2>Current wheather is: "+weatherdata.weather[0].description+"</h2>");
        res.write("<img src="+imgurl+">")
        res.send()
    })
})
})

app.listen(2000,function(){
    console.log("Started");
})