import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Cards from './cards'
import React from 'react'
import App from './app'

class NewCard extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    configuration: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    panel: PropTypes.object
  }

  state = {
    cards: []
  }

  _handleApp = this._handleApp.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleCards = this._handleCards.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(App, this._getApp())
  }

  _getApp() {
    const { admin } = this.context
    return {
      apps: [
        { id: null, code: 'maha', label: 'Maha', color: 'blue', icon: 'bars' },
        ...admin.apps
      ],
      onCancel: this._handleCancel,
      onChoose: this._handleApp
    }
  }

  _getCard(card) {
    const { panel } = this.props
    return {
      panel,
      onBack: this._handlePop,
      onDone: this._handleDone
    }
  }

  _getCards(app) {
    const { dashboardCards } = this.context.configuration
    return {
      cards: dashboardCards.filter(dashboardCard => {
        return dashboardCard.app === app.code
      }),
      onBack: this._handlePop,
      onChoose: this._handleCards
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleApp(app) {
    this._handlePush(Cards, this._getCards(app))
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleCards(card) {
    this._handlePush(card.new, this._getCard(card))
  }

  _handleDone() {
    this.context.modal.close()
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

export default NewCard
