import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Topics from './topics'
import Lists from './lists'
import React from 'react'

class Organize extends React.PureComponent {

  static propTypes = {
    _import: PropTypes.object,
    onDone: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleDone = this._handleDone.bind(this)
  _handleLists = this._handleLists.bind(this)
  _handleTopics = this._handleTopics.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handleLists()
  }

  _getLists() {
    const { _import } = this.props
    return {
      _import,
      onBack: () => {},
      onDone: this._handleTopics
    }
  }

  _getTopics() {
    const { _import } = this.props
    return {
      _import,
      onBack: this._handlePop,
      onDone: this._handleDone
    }
  }

  _getPanel() {
    return {
      title: 'Organize'
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleDone() {
    const { _import } = this.props
    this.props.onDone(_import)
  }

  _handleLists() {
    this._handlePush(Lists, this._getLists())
  }

  _handlePop(index = -1) {
    this.setState({
      cards: this.state.cards.slice(0, index)
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

  _handleTopics() {
    this._handlePush(Topics, this._getTopics())
  }

}

export default Organize
