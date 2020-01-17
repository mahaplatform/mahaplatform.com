import { Container, Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Channels from './channels'
import Topics from './topics'
import Lists from './lists'
import React from 'react'

class Organize extends React.PureComponent {

  static propTypes = {
    _import: PropTypes.object,
    lists: PropTypes.array,
    programs: PropTypes.array,
    topics: PropTypes.array,
    onDone: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleChannels = this._handleChannels.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleLists = this._handleLists.bind(this)
  _handleTopics = this._handleTopics.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handleLists()
  }

  _getChannels() {
    const { _import, programs } = this.props
    return {
      _import,
      programs,
      doneText: 'Next',
      onBack: this._handlePop,
      onDone: this._handleDone
    }
  }

  _getLists() {
    const { _import, lists } = this.props
    return {
      _import,
      lists,
      doneText: 'Next',
      onBack: () => {},
      onDone: this._handleTopics
    }
  }

  _getTopics() {
    const { _import, topics } = this.props
    return {
      _import,
      topics,
      doneText: 'Next',
      onBack: this._handlePop,
      onDone: this._handleChannels
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

  _handleChannels() {
    this._handlePush(Channels, this._getChannels())
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

const mapResources = (props, context) => ({
  lists: '/api/admin/crm/lists',
  programs: '/api/admin/crm/programs',
  topics: '/api/admin/crm/topics'
})

export default Container(mapResources)(Organize)
