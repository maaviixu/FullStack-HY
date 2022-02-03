import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/FilterForm'
import filterPersons from './components/Filter'
import personService from './services/persons'
import Effect from './components/EffectNotification'
import ErrorNotification from './components/ErrorNotification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [effectMessage, setEffectMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
        //console.log('ukon id: ', id)
        //console.log('uusi num: ', newNumber)
        const changedNum = { ...nimi, number: newNumber }
        //console.log('uusi olio :', changedNum)

        personService
          .update(id, changedNum)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response))
            setNewName('')
            setNewNumber('')
            setEffectMessage(
              `${changedNum.name}'s number has been changed succesfully`
            )
            setTimeout(() => {
              setEffectMessage(null)
            }, 3000)
          })

          .catch(error => {
            setErrorMessage(
              `${changedNum.name} was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setPersons(persons.filter(n => n.id !== id))
          })



      }
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setEffectMessage(
            `${returnedPerson.name} added succesfully`
          )
          setTimeout(() => {
            setEffectMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error.toString())
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
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
    const person = persons.find(n => n.id === id)
    console.log(person.name)
    const result = window.confirm(`poistetaanko ${person.name}`)
    if (result) {
      personService
        .poisto(id)
        .then(
          setPersons(persons.filter(n => n.id !== id)))
      setEffectMessage(
        `${person.name} was deleted succesfully`
      )
      setTimeout(() => {
        setEffectMessage(null)
      }, 3000)
    }
  }

  /*

  onnistuneista operaatioista 
  (henkilön lisäys ja poisto sekä numeron muutos

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
      <Effect message={effectMessage} />
      <ErrorNotification message={errorMessage} />
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
          toggleDelete={() => toggleDeleteOf(person.id)} />
      )}
    </div>
  )

}

export default App
