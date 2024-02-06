import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Display = ({countries, search}) => {
  const names = countries.map(country => country.name.common)
  const re = new RegExp(`${search}`, 'i')
  const found = names.filter(name => re.test(name))
  console.log(found);
  if (found.length===1) {
    return <GetInfo countries={countries} name={found[0]}/>
  } else if (found.length<11) {
    return <GetNames found={found}/>
  } else if (search!=='') {
    return <p>Too many results, try a more narrow search</p>
  }
}

const GetInfo = ({countries, name}) => {
  console.log(name)
  const info = countries.filter(country => country.name.common===name)[0]
  console.log(info)
  return (
    <div>
      <h2>{name}</h2>
      <BasicInfo info={info}/>
      <Languages info={info}/>
      <Flag info={info}/>
    </div>
  )
}

const BasicInfo = ({info}) => {
  return (
    <>
      <div>Capital: {info.capital[0]}</div>
      <div>Area: {info.area} km2</div>
    </>
  )
}

const Languages = ({info}) => {
  const langs = Object.values(info.languages)
  console.log(langs);
  return (
    <>
      <br/>
      <b>Languages:</b>
      {langs.map(l => <li key={l}>{l}</li>)}
    </>
  )
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

const GetNames = ({found}) => {
  return (
    <>
      <h3>Results:</h3>
      {found.map(name => <li key={name}>{name}</li>)}
    </>
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

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

  return (
    <div>
      <h1>Countries</h1>
      Search: <input value={search} onChange={handleSearch}></input>
      <Display countries={countries} search={search}/>
    </div>
  )
}

export default App
