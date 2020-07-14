const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/fc2c3eb2d4eac475ff0a1dc66f9a6f89/'+latitude+','+longitude
    request({ url,json:true},(error,{body})=>{
        if (error){
            callback('unable to connect to weather service',undefined)
        }else if(body.error){
            callback('unable to find location!',undefined)
        }else{
        callback(undefined,body.daily.data[0].summary+" Currently the temperature is "+ body.currently.temperature+" and there is a "+ (body.currently.precipProbability)+ " % probabiltiy of rain")
        }
        
    })
}

module.exports=forecast