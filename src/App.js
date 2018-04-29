import React, { Component } from 'react'

import './App.css'

import ChessBoard from './chessboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <title>
          eight queens puzzle
        </title>
        <span>
          The eight queens puzzle is the problem of placing eight chess queens on an 8×8 chessboard so that no two queens threaten each other. Thus, a solution requires that no two queens share the same row, column, or diagonal.
        </span>
        <ChessBoard/>
      </div>)
  }
}

export default App
