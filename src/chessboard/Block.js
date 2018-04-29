import React, { Component } from 'react'

import Queen from './Queen'
import View from './View'

const getClassNameBlock = (isBlack) => {
  const _isBlack = isBlack ? 'black' : ''
  return ['block', _isBlack].join(' ')
}

class Block extends Component {
  
  onClick () {
    this.props.trySwitchQueen(this.props.position)
  }

  getInnerNode () {
    if (this.props.hasQueen) {
      return (<Queen/>)
    }

    if (this.props.hasViewOfQueen) {
      return (<View/>)
    }
  }

  render() {
    return (
      <div
        className={getClassNameBlock(this.props.isBlack)}
        onClick={() => this.onClick()}
      >
        {this.getInnerNode()}
      </div>)
  }
}

export default Block
