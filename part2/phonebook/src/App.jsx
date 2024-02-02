import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const RenderOne = ({person, handleDelete}) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={() => handleDelete(person)}>delete</button>
    </div>
  )
}

const RenderNames = ({persons, handleDelete}) => {
  return (
    <div>
      {persons.map(person => <RenderOne person={person} handleDelete={handleDelete} key={person.name}/>)}
    </div>
    )
}

const Display = ({ persons, search, handleDelete }) => {
  // display all names if search bar is empty
  // otherwise display search results
  if (search==='') return <><RenderNames persons={persons} handleDelete={handleDelete}/></>
  const re = new RegExp(`${search}`, 'i')
  console.log('re', re);
  const found = persons.filter(person => re.test(person.name))
  console.log(found);
  return <><RenderNames persons={found} handleDelete={handleDelete}/></>
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

  const reload = () => {
    console.log('reloading data')
    personService
      .loadPersons()
      .then(response => {
        console.log('setting state')
        setPersons(response.data)
      })
  }

  useEffect(reload, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newName);
    // check if name is already in persons
    const exists = persons.reduce((prev, current) => prev ? true : current.name===newName, false)
    console.log(exists)
    const newPerson = {name: newName, number: newNumber}

    if (exists) {
      if (window.confirm(`${newName} is alredy in phonebook. Update number?`)) {
        const oldPerson = persons.find(p => p.name === newName)
        personService
          .updateNumber(newPerson, oldPerson.id)
          .then(response => setPersons(persons.map(p => p.name !== newName ? p : response)))
        setNewName('')
        setNewNumber('')
        return
      } else {
        return
      }
    }
    // don't allow empty name submissions
    if (newName==='') {
      alert('Enter a name')
      return
    }
    
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

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log(person.id);
      personService
        .deletePerson(person)
        .then(response => console.log(response))
      const newPersons = persons.filter(p => p.id!=person.id)
      console.log('setting state');
      setPersons(newPersons)
    }
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
      <Display persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )
}

export default App