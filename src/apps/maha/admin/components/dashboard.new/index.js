import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Panel from './panel'
import React from 'react'

class Dashboard extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {}

  state = {
    active: null,
    expanded: null,
    panels: null,
    sidebar: false,
    stacked: false
  }

  _handleExpand = this._handleExpand.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleSelect = this._handleSelect.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { sidebar, panels, stacked } = this.state
    if(!panels) return null
    return (
      <ModalPanel { ...this._getModalPanel() }>
        <div className="maha-dashboard">
          { !stacked && sidebar &&
            <div className="maha-dashboard-sidebar">
              <Sidebar { ...this._getSidebar() } />
            </div>
          }
          <div className={ this._getBodyClass() }>
            { stacked && panels.map((panel, index) => (
              <Panel { ...this._getPanel(panel, index) } key={`panel_${panel.id}`} />
            )) }
            { !stacked &&
              <Panel { ...this._getActive() } />
            }
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

  _getModalPanel() {
    return {
      className: 'maha-dashboard-container',
      title: 'Dashboard'
    }
  }

  _getActive() {
    const { panels, active } = this.state
    const index =  panels.findIndex(panel => {
      return panel.id === active
    })
    return this._getPanel(panels[index], index)
  }

  _getBodyClass(panel, index) {
    const { expanded, stacked } = this.state
    const classes = ['maha-dashboard-body']
    if(!expanded && stacked) classes.push('stacked')
    if(expanded) classes.push('expanded')
    return classes.join(' ')
  }

  _getPanel(panel, index) {
    const { expanded, stacked } = this.state
    return {
      expanded,
      panel,
      stacked,
      onExpand: this._handleExpand,
      onMove: this._handleMove.bind(this, index),
      onToggle: this._handleToggle
    }
  }

  _getSidebar() {
    const { panels, active } = this.state
    return {
      panels,
      active,
      onSelect: this._handleSelect
    }
  }

  _handleExpand(card) {
    const expanded = this.state.expanded == null ? card : null
    this.setState({ expanded })
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
          active: first ? first.id : null
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

  _handleMove(panel_index, from, to) {
    const { panels } = this.state
    this.setState({
      panels: panels.map((panel, index) => {
        if(index !== panel_index) return panel
        return {
          ...panel,
          cards: (
            (from < to) ? [
              ...panel.cards.slice(0, from),
              ...panel.cards.slice(from + 1, to + 1),
              panel.cards[from],
              ...panel.cards.slice(to + 1)
            ] : [
              ...panel.cards.slice(0, to),
              panel.cards[from],
              ...panel.cards.slice(to, from),
              ...panel.cards.slice(from + 1)
            ]
          ).map((card, index) => ({
            ...card,
            delta: index
          }))
        }
      })
    })
  }

  _handleSelect(active) {
    this.setState({ active })
  }

  _handleToggle() {
    const { sidebar } = this.state
    this.setState({
      sidebar: !sidebar
    })
  }

}

export default Dashboard
