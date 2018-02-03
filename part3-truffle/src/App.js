import React, { Component } from 'react'
import SimpleContract from '../build/contracts/SimpleContract.json'
import getWeb3 from './utils/getWeb3'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataValue: 0,
      web3: null,
      valueFromChain: 0
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      //this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract(inputValue) {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleContract = contract(SimpleContract)
    simpleContract.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on simpleContract.
    var simpleContractInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleContract.deployed().then((instance) => {
        simpleContractInstance = instance

        // Stores a given value, 5 by default.
        return simpleContractInstance.setData(inputValue, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleContractInstance.getData.call({from: accounts[0]})
      }).then((result) => {
        // Update state with the result.
        return this.setState({ valueFromChain: result.c[0] })
        }).catch((error) => {
          console.error(error);
      })
    })
  }

  handleChange(e) {
    e.preventDefault()

    this.setState({dataValue: e.target.value})
  }

  handleClick(e) {
    e.preventDefault()

    this.instantiateContract(this.state.dataValue)
  }

  render() {
    return (
      <div className="App">
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Smart Contract Example Is Working!</h2>
              <input type="number" onChange={this.handleChange.bind(this)} />
              <button type="submit" onClick={this.handleClick.bind(this)}>Update value</button>
              <p>The value is: {this.state.valueFromChain}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App