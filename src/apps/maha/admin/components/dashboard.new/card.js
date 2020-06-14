import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.Component {

  static childContextTypes = {
    card: PropTypes.object
  }

  static contextTypes = {
    configuration: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    card: PropTypes.object
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { card } = this.props
    return (
      <div className="maha-dashboard-card-container">
        <div className="maha-dashboard-card">
          <div className="maha-dashboard-card-header">
            <div className="maha-dashboard-card-header-app">
              { card.type.app ?
                <div className={ `maha-dashboard-card-appicon ${card.type.app.color}` }>
                  <i className={ `fa fa-${card.type.app.icon}` } />
                </div> :
                <div className="maha-dashboard-card-appicon blue">
                  <i className="fa fa-bars" />
                </div>
              }
            </div>
            <div className="maha-dashboard-card-header-details">
              <div className="maha-dashboard-card-header-details-title">
                { card.title }
              </div>
              <div className="maha-dashboard-card-header-details-cardtitle">
                { card.type.title }
              </div>
            </div>
            <div className="maha-dashboard-card-header-icon" onClick={ this._handleTasks }>
              <i className="fa fa-ellipsis-v" />
            </div>
          </div>
          <div className="maha-dashboard-card-body">
            <Stack { ...this._getStack() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { card } = this.props
    const { dashboardCards } = this.context.configuration
    const type = dashboardCards.find(dashboardCard => {
      return dashboardCard.code === card.type.code
    })
    this._handlePush(type.component, this._getComponent())
  }

  getChildContext() {
    return {
      card: {
        pop: this._handlePop,
        push: this._handlePush
      }
    }
  }

  _getComponent() {
    const { card } = this.props
    return {
      config: card.config
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

  _handleTasks() {
    this.context.tasks.open({
      items: [
        { label: 'Edit Card' },
        { label: 'Remove Card' }
      ]
    })
  }

}

export default Card
