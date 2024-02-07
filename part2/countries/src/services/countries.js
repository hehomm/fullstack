import axios from 'axios'
const baseurl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherbase = 'https://api.openweathermap.org/data/2.5/weather?'

const loadAll = () => {
    return (
        axios
            .get(`${baseurl}/all`)
            .then(response => response.data)
    )
}

const loadWeather = (lat, lon) => {
    const apiKey = import.meta.env.VITE_SOME_KEY
    const weatherurl = `${weatherbase}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    console.log('api key', apiKey);
    console.log(weatherurl);
    return (
        axios
            .get(weatherurl)
            .then(response => {
                console.log(response)
                return response.data
            })
    )
}

export default {loadAll, loadWeather}