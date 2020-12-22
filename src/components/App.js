import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateType = (info) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type:info
      }
    })
  }

  fetchPets = () => {
    let endpoint = '/api/pets'

    if (this.state.filters.type !== 'all'){
      endpoint += `?type=${this.state.filters.type}`
    }

    fetch(endpoint)
    .then(r => r.json())
    .then(pets => this.setState({
      pets: pets
    }))
  }
  
  onAdoptPet = (petId) =>{
    let pets = [...this.state.pets]
    let petObj = pets.find(pet => pet.id === petId)
    petObj.isAdopted = true
    this.setState({
      pets:pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateType} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
