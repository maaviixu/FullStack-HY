import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/FilterForm'
import filterPersons from './components/Filter'
import personService from './services/persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Uusi nimi...')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])
  //console.log('render', persons.length, 'persons')

  const addPerson = event => {
    event.preventDefault()
    const nameObject = {
      name: newName, 
      number: newNumber
    }
    
    let nimi = persons.find(person => person.name === newName)


    if (persons.includes(nimi)) {
      const result = window.confirm(
        `${newName} is already added to phonebook, 
        replace the old number with a new one`)
      if (result) {
        let id = nimi.id
        console.log('ukon id: ', id)
        console.log('uusi num: ', newNumber)
        const changedNum = {...nimi, number: newNumber}
        console.log('uusi olio :', changedNum)
        
        personService
          .update(id, changedNum)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response))
            setNewName('')
            setNewNumber('')
          })
          
      }
    } else {
      personService
        .create(nameObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log('filtteri: ', event.target.value)
    //console.log('filtterifunktio: ', filterPersons(persons, newFilter))
    setNewFilter(event.target.value)
  }


  const toggleDeleteOf = (id) => {
    console.log(`${id} poistetaan`)
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(n => n.id === id)
    console.log(person.name)
    const result = window.confirm(`poistetaanko ${person.name}`)
    if (result) {
      personService
      .poisto(id)
      .then(
      setPersons(persons.filter(n => n.id !== id)))
    }  
  }

  /*
  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
  })
  */

  const personsToShow = filterPersons(persons, newFilter)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={newFilter} action={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange} 
          />
        </div>
        <div>
          number:
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person 
        key={person.id} 
        person={person} 
        toggleDelete={() => toggleDeleteOf(person.id)}/>
        )}
    </div>
  )

}

export default App
