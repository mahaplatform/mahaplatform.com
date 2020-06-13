import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Card from './card'

class Dashboard extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  state = {
    expanded: false,
    selected: 0
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const panels = [
      { id: 1, title: 'Active Events', cards: [
        { id: 1, title: 'Horticuture Plant Sale', type: { code: 'events:ticket_type_totals', title: 'Ticket Type Totals' } },
        { id: 2, title: 'Two', stat: 10.00, type: { code: 'events:ticket_type_totals', title: 'Ticket Type Totals' } },
        { id: 3, title: 'Three', stat: 10.00, type: { code: 'events:ticket_type_totals', title: 'Ticket Type Totals' } },
        { id: 4, title: 'Four', stat: 10.00, type: { code: 'events:ticket_type_totals', title: 'Ticket Type Totals' } },
        { id: 5, title: 'Five', stat: 10.00, type: { code: 'events:ticket_type_totals', title: 'Ticket Type Totals' } },
        { id: 6, title: 'Six', stat: 10.00, type: { code: 'events:ticket_type_totals', title: 'Ticket Type Totals' } },
        { id: 7, title: 'Seven', stat: 10.00, type: { code: 'events:ticket_type_totals', title: 'Ticket Type Totals' } },
        { id: 8, title: 'Eight', stat: 10.00, type: { code: 'events:ticket_type_totals', title: 'Ticket Type Totals' } }
      ] },
      { id: 2, title: 'Primitive Pursuits', cards: [] },
      { id: 3, title: 'My Finance', cards: [] }
    ]
    const { expanded, selected } = this.state
    const panel = panels[selected]
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-dashboard">
          { expanded &&
            <div className="maha-dashboard-sidebar">
              { panels.map((panel, pindex) => (
                <div className={ this._getClass(pindex) } key={`panel_${pindex}`} onClick={ this._handleSelect.bind(this, pindex) }>
                  { panel.title }
                </div>
              ))}
            </div>
          }
          <div className="maha-dashboard-body">
            <div className="maha-dashboard-filters">
              <div className="maha-dashboard-filters-toggle" onClick={ this._handleToggle }>
                <i className="fa fa-bars" />
              </div>
              <div className="maha-dashboard-filters-body">
                Filters
              </div>
              <div className="maha-dashboard-filters-add" onClick={ this._handleToggle }>
                <i className="fa fa-plus" />
              </div>
            </div>
            <div className="maha-dashboard-panel">
              { panel.cards.map((card, cindex) => (
                <div className="maha-dashboard-panel-item" key={`tab_${cindex}`}>
                  <Card card={ card } />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getClass(index) {
    const { selected } = this.state
    const classes = ['maha-dashboard-sidebar-item']
    if(index === selected) classes.push('selected')
    return classes.join(' ')
  }

  _getPanel() {
    return {
      className: 'maha-dashboard-container',
      title: 'Dashboard'
    }
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
