import axios from 'axios'
const url = 'http://localhost:3001/persons'

const addPerson = newPerson => {
    return (
        axios
            .post(url, newPerson)
            .then(response => response.data)
    )
}

const deletePerson = person => {
    console.log('deleting person')
    return (
        axios
            .delete(`${url}/${person.id}`)
    )
}

const loadPersons = () => {
    return (
        axios
            .get(url)
    )
}

const updateNumber = (person, id) => {
    console.log('updating number')
    return (
        axios
            .put(`${url}/${id}`, person)
            .then(response => response.data)
    )
}

export default {addPerson, deletePerson, loadPersons, updateNumber}