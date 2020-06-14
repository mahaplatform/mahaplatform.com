import { Container, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Card from './card'

class Dashboard extends React.Component {

  static propTypes = {
    panels: PropTypes.array
  }

  state = {
    expanded: false,
    selected: 0
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { expanded, selected } = this.state
    const { panels } = this.props
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

const mapResources = (props, context) => ({
  panels: '/api/admin/dashboard/panels'
})

export default Container(mapResources)(Dashboard)
