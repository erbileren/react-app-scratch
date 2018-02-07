import React, {Component} from 'react'

import instantiateContract from './utils/instantiateContract'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataValue: 0,
      valueFromChain: 0
    }

  }

  componentWillMount() {
    instantiateContract.setWeb3()
  }

  handleChange(e) {
    e.preventDefault()

    this.setState({dataValue: e.target.value})
  }

  handleClick(e) {
    e.preventDefault()

    instantiateContract.setValue(this.state.dataValue)
  }

  handleSecondClick(e) {
    e.preventDefault()

    instantiateContract.getValue().then((result) => {
      this.setState({
        valueFromChain: result
      })
    })
  }

  render() {
    return (
      <div className="App">
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Smart Contract Example Is Working!</h2>
              <input
                type="number"
                onChange={this
                .handleChange
                .bind(this)}/>
              <button
                type="submit"
                onClick={this
                .handleClick
                .bind(this)}>Update value</button>
              <button
                type="submit"
                onClick={this
                .handleSecondClick
                .bind(this)}>Get value</button>
              <p>The value is: {this.state.valueFromChain}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App