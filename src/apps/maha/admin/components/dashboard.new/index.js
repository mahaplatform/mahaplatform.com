import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import React from 'react'
import Card from './card'

class Dashboard extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {}

  state = {
    expanded: false,
    panels: null,
    reordering: false,
    selected: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleReorder = this._handleReorder.bind(this)
  _handleSelect = this._handleSelect.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { expanded, panels } = this.state
    if(!panels) return null
    const { user } = this.context.admin
    const panel = this._getSelected()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-dashboard">
          { expanded &&
            <Sidebar { ...this._getSidebar() } />
          }
          <div className="maha-dashboard-body">
            <div className="maha-dashboard-header">
              <div className="maha-dashboard-header-toggle" onClick={ this._handleToggle }>
                <i className="fa fa-bars" />
              </div>
              <div className="maha-dashboard-header-body">
                { panel.title }
              </div>
              { user.id === panel.owner.id &&
                <div className="maha-dashboard-header-action" onClick={ this._handleReorder }>
                  <i className="fa fa-arrows" />
                </div>
              }
              { user.id === panel.owner.id &&
                <div className="maha-dashboard-header-action" onClick={ this._handleToggle }>
                  <i className="fa fa-plus" />
                </div>
              }
            </div>
            <div className="maha-dashboard-panel">
              { panel.cards.map((card, cindex) => (
                <div className="maha-dashboard-panel-item" key={`tab_${card.id}`}>
                  <Card { ...this._getCard(panel, card) } />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleFetch()
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getCard(panel, card) {
    const { reordering } = this.state
    return {
      card,
      panel,
      reordering
    }
  }

  _getPanel() {
    return {
      className: 'maha-dashboard-container',
      title: 'Dashboard'
    }
  }

  _getSelected() {
    const { panels, selected } = this.state
    return panels.find(panel => {
      return panel.id === selected
    })
  }

  _getSidebar() {
    const { panels, selected } = this.state
    return {
      panels,
      selected,
      onSelect: this._handleSelect
    }
  }

  _handleFetch() {
    const { admin } = this.context
    this.context.network.request({
      endpoint: '/api/admin/dashboard/panels',
      method: 'GET',
      onSuccess: ({ data }) => {
        const panels = data
        const first = panels.find(panel => {
          return panel.owner.id === admin.user.id
        })
        this.setState({
          panels: data,
          selected: first ? first.id : null
        })
      }
    })
  }

  _handleJoin() {
    const { network } = this.context
    const target = '/admin/dashboard'
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/dashboard'
    network.leave(target)
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleReorder() {
    const { reordering } = this.state
    this.setState({
      reordering: !reordering
    })
  }

  _handleSelect(selected) {
    this.setState({ selected })
  }

  _handleToggle() {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded
    })
  }

}

export default Dashboard
