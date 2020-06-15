import { List, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Cards extends React.Component {

  static propTypes = {
    cards: PropTypes.array,
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <List { ...this._getList() } />
      </ModalPanel>
    )
  }

  _getList() {
    const { cards } = this.props
    return {
      items: cards.map(card => ({
        component: (
          <div className="token">
            <strong>{ card.title }</strong><br />
            { card.description }
          </div>
        ),
        handler: this._handleChoose.bind(this, card)
      }))
    }
  }

  _getApp(app) {
    return {
      color: app.color,
      icon: app.icon,
      title: app.label
    }
  }

  _getPanel() {
    return {
      title: 'Choose Card',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(card) {
    this.props.onChoose(card)
  }

}

export default Cards
