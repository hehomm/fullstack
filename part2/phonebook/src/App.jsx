import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const RenderNames = ({persons}) => {
  return (
    <div>
      {persons.map(person => <div key={person.name} >{person.name} {person.number}</div>)}
    </div>
    )
}

const Display = ({ persons, search }) => {
  // display all names if search bar is empty
  // otherwise display search results
  if (search==='') return <><RenderNames persons={persons}/></>
  const re = new RegExp(`${search}`, 'i')
  console.log('re', re);
  const found = persons.filter(person => re.test(person.name))
  console.log(found);
  return <><RenderNames persons={found}/></>
}

const SearchForm = ({ search, handleSearch }) => {
  return (
    <form>
      <div>
        search: <input value={search} onChange={handleSearch}/>
       </div>
    </form>
  )
}

const AddingForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newName);
    // check if name is already in persons
    const exists = persons.reduce((prev, current) => prev ? true : current.name===newName, false)
    console.log(exists)
    if (exists) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    // don't allow empty name submissions
    if (newName==='') {
      alert('Enter a name')
      return
    }
    const newPerson = {name: newName, number: newNumber}
  
    console.log(newPerson)
    personService
      .addPerson(newPerson)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response))
      })
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    const name = event.target.value
    console.log(name)
    setNewName(name)
  }

  const handleNumberChange = (event) => {
    const num = event.target.value
    console.log(num)
    setNewNumber(num)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchForm search={search} handleSearch={handleSearch}/>

      <h2>Add new name</h2>
      <AddingForm newName={newName} newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}
                  handleSubmit={handleSubmit}/>
      
      <h2>Numbers</h2>
      <Display persons={persons} search={search}/>
    </div>
  )
}

export default App