import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './styles/normalize.css'
import './styles/style.scss'

Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)]
}

Number.prototype.roundToHalf = function() {
  return Math.round(this * 2) / 2
}

ReactDOM.render(<App />, document.getElementById('root'))

