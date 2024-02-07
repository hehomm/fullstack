import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Display = ({countries, search, onClick, weather, setCountry}) => {
  const names = countries.map(country => country.name.common)
  const re = new RegExp(`${search}`, 'i')
  const found = names.filter(name => re.test(name))
  console.log(found);
  if (found.length===1) {
    return <GetInfo countries={countries} name={found[0]} weather={weather} setCountry={setCountry}/>
  } else if (found.length<11) {
    console.log('1<n<11');
    return <GetNames found={found} onClick={onClick}/>
  } else if (search!=='') {
    return <p>Too many results, try a more narrow search</p>
  }
}

const GetInfo = ({countries, name, weather, setCountry}) => {
  console.log(name)
  const info = countries.filter(country => country.name.common===name)[0]
  console.log(info)
  setCountry(info)
  return (
    <div>
      <h2>{name}</h2>
      <BasicInfo info={info}/>
      <Languages info={info}/>
      <Flag info={info}/>
      <Weather info={info} weather={weather} setCountry={setCountry}/>
    </div>
  )
}

const Weather = ({info, weather}) => {
  if (info.capital) {
    console.log('weather', weather);
    console.log('icon', weather.weather[0].icon)
    return (
      <div>
        <br/>
        <div><b>Weather in {info.capital[0]}:</b></div>
        <div>Temperature: {weather.main.temp} °C</div>
        <div>Wind: {weather.wind.speed} m/s</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
      </div>
    )
  } else {return null}
  
}

const BasicInfo = ({info}) => {
  if (info.capital) {
    return (
      <>
        <div>Capital: {info.capital[0]}</div>
        <div>Area: {info.area} km2</div>
      </>
    )
  } else {
    return <div>Area: {info.area} km2</div>
  }

}

const Languages = ({info}) => {
  if (info.languages) {
    const langs = Object.values(info.languages)
    console.log(langs);
    return (
      <>
        <br/>
        <b>Languages:</b>
        {langs.map(l => <li key={l}>{l}</li>)}
      </>
    )
  } else {return null}

}

const Flag = ({info}) => {
  const url = info.flags.svg
  const styleinfo = {height: 150}
  return(
    <>
      <br/>
      <img src={url} style={styleinfo}></img>
    </>
  )
}

const GetOne = ({name, onClick}) => {
  console.log('getOne', name);
  return (
    <div>
      {name} 
      {' '}<button onClick={() => onClick(name)}>show</button>
    </div>
  )
}

const GetNames = ({found, onClick}) => {
  console.log(found);
  return (
    <div>
      <h3>Results:</h3>
      {found.map(name => <GetOne name={name} onClick={onClick} key={name}/>)}
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)
  const [country, setCountry] = useState(null)

  const reload = () => {
    console.log('reloading data')
    countryService
      .loadAll()
      .then(response => {
        //console.log(response)
        setCountries(response)
      })
    }

  useEffect(reload, [])
  

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value)
  } 

  const onClick = (name) => {
    console.log('onclick', name);
    setSearch(name)
  }

  const getWeather = (info) => {
    console.log('getting weather data')
    if (info) {
      countryService
      .loadWeather(info.capitalInfo.latlng[0], info.capitalInfo.latlng[1])
      .then(response => setWeather(response))
    }
  }

  useEffect(() => getWeather(country), [country])

  return (
    <div>
      <h1>Countries</h1>
      Search: <input value={search} onChange={handleSearch}></input>
      <Display countries={countries} search={search}
          onClick={onClick} weather={weather} setCountry={setCountry}/>
    </div>
  )
}

export default App
