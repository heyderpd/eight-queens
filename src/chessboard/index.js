import React, { Component } from 'react'

import './ChessBoard.css'

import xrange from '../utils/xrange'
import toArray from '../utils/to-array'
import removeValuesOf from '../utils/remove-values-of-array'
import removeRepeatsOf from '../utils/remove-repeats-of-array'
import getViewOfQueen from '../utils/get-view-of-queen'

import Block from './Block'

class ChessBoard extends Component {

  constructor (props) {
    super(props)

    this.state = {
      queens: [],
      allViews: [],
      board: this.createBoard()
    }
  }

  createBoard () {
    const boardLimit = 8 *8
    let color = false
    let count = 0
    return xrange(boardLimit)
      .reduce((acc, _, key) => {
        acc[key] = (
          <Block
            key={count}
            position={count}
            trySwitchQueen={this.trySwitchQueen.bind(this)}
            hasQueen={false}
            hasViewOfQueen={false}
            isBlack={(color = (count++ %8 === 0) ? color : !color)}
          />)
        return acc
      }, {})
  }

  moutBoardWith () {
    return toArray(this.state.board)
      .map(item => item)
  }
  
  trySwitchQueen (position) {
    let { queens, allViews, board } = this.state
    const { props: { hasQueen, hasViewOfQueen } } = board[position]
    const views = getViewOfQueen(position)

    let hasQueenNewValue
    if (hasQueen) {
      hasQueenNewValue = false
      queens = removeValuesOf(queens, position)
      allViews = removeValuesOf(allViews, views)

    } else if (!hasViewOfQueen) {
      hasQueenNewValue = true
      queens = [...queens, position]
      allViews = removeRepeatsOf([...allViews, ...views])

    } else {
      return null
    }

    const newBoardValues = views
      .reduce(
        (acc, pos) => {
          const { props } = board[pos]
          const newProps = {}
          position === pos
            ? newProps.hasQueen = hasQueenNewValue
            : newProps.hasViewOfQueen = true

          acc[pos] = (
            <Block
              {...props}
              {...newProps}
              key={pos}
            />)

          return acc
        }, {})
console.log({newBoardValues})
    this.setState({
      queens,
      allViews,
      board: {
        ...board,
        ...newBoardValues
      }
    })
  }
  
  render() {
    console.log(this.state)
    return (
      <div className="ChessBoard">
        {this.moutBoardWith(this.state.board)}
      </div>
    )
  }
}

export default ChessBoard
