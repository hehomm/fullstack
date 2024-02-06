import axios from 'axios'
const baseurl = 'https://studies.cs.helsinki.fi/restcountries/api'

const loadOne = (name) => {
    return (
        axios
            .get(`${baseurl}/name/${name}`)
            .then(response => response.data)
    )
}

const loadAll = () => {
    return (
        axios
            .get(`${baseurl}/all`)
            .then(response => response.data)
    )
}

export default {loadOne, loadAll}