import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Content from './content'
import React from 'react'

class Sidebar extends React.PureComponent {

  static propTypes = {
    blocks: PropTypes.array
  }

  state = {
    cards: []
  }

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Content, this._getContent())
  }

  _getContent() {
    const { blocks } = this.props
    return {
      blocks
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

}

export default Sidebar
