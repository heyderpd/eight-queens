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
    const { props } = board[position]
    const { hasQueen, hasViewOfQueen } = props

    if (hasViewOfQueen && !hasQueen) {
      return null
    }

    if (hasQueen) {
      queens = removeValuesOf(queens, position)

    } else {
      queens = removeRepeatsOf([...queens, position])
    }

    allViews = removeRepeatsOf(queens
      .reduce(
        (acc, pos) => {
          const views = getViewOfQueen(pos)
          return [...acc, ...views]
        }, []))

    let newBoardValues = toArray(board)
      .reduce(
        (acc, item, pos) => {
          const { props } = item
          acc[pos] = (
            <Block
              {...props}
              hasQueen={queens.indexOf(pos) >= 0}
              hasViewOfQueen={allViews.indexOf(pos) >= 0}
              key={pos}
            />)
          return acc
        },
        {})

    this.updateQueenViews(queens, allViews)
  }

  updateQueenViews (queens, allViews) {
    const { board } = this.state

    let newBoardValues = toArray(board)
      .reduce(
        (acc, item, pos) => {
          const { props } = item
          acc[pos] = (
            <Block
              {...props}
              hasQueen={queens.indexOf(pos) >= 0}
              hasViewOfQueen={allViews.indexOf(pos) >= 0}
              key={pos}
            />)
          return acc
        },
        {})

    this.setState({
      queens,
      allViews,
      board: newBoardValues
    })
  }

  clearQueens () {
    this.updateQueenViews([], [])
  }

  render() {
    return ([
      <div className="count">
        Queens: {this.state.queens.length}
      </div>,
      <button onClick={this.clearQueens.bind(this)}>
        clear queens
      </button>,
      <div className="ChessBoard">
        {this.moutBoardWith(this.state.board)}
      </div>
    ])
  }
}

export default ChessBoard
