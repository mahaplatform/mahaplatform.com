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
    expanded: false,
    panels: null,
    selected: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSelect = this._handleSelect.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { expanded, panels } = this.state
    if(!panels) return null
    return (
      <ModalPanel { ...this._getModalPanel() }>
        <div className="maha-dashboard">
          { expanded &&
            <Sidebar { ...this._getSidebar() } />
          }
          <Panel { ...this._getPanel() } />
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

  _getPanel() {
    const { panels, selected } = this.state
    const index =  panels.findIndex(panel => {
      return panel.id === selected
    })
    return {
      panel: panels[index],
      onMove: this._handleMove.bind(this, index),
      onToggle: this._handleToggle
    }
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
