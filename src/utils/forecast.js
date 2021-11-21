const request = require('request')

const forecast = ({latitude, longitude}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4201bce00a74b569e99f2d5415b6fc49&query='+latitude+','+longitude+'&units=f'
    request( {url, json: true}, (error, {body}) => {
        //const data = JSON.parse(response.body)
        //console.log(response.body.current.temperature)
        if(error){
            callback('Unable to connect to the forcast services!', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is curently ' + body.current.temperature +'degrees out. There is a '+ body.current.precip +'% chancs of rain')
        }
        //console.log(response.body.current.weather_descriptions[0] + '. It is curently ' + response.body.current.temperature +'degrees out. There is a '+ response.body.current.precip +'% chancs of rain')
    })
}

module.exports = forecast