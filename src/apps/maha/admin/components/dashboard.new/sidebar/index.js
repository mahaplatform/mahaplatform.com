import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from '../edit'
import New from '../new'

class Sidebar extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    panels: PropTypes.array,
    onSelect: PropTypes.func
  }

  render() {
    const shared = this._getShared()
    const owned = this._getOwned()
    return (
      <div className="maha-dashboard-panels">
        { shared.length > 0 &&
          <div className="maha-dashboard-panels-section">
            <div className="maha-dashboard-panels-title">
              Shared With You
            </div>
            { shared.map((panel, index) => (
              <div className={ this._getClass(panel) } key={`panel_${index}`} onClick={ this._handleSelect.bind(this, panel) }>
                <div className="maha-dashboard-panels-item-label">
                  { panel.title }
                </div>
              </div>
            ))}
          </div>
        }
        <div className="maha-dashboard-panels-section">
          <div className="maha-dashboard-panels-title">
            Your Panels
          </div>
          { owned.map((panel, index) => (
            <div className={ this._getClass(panel) } key={`panel_${index}`} onClick={ this._handleSelect.bind(this, panel) }>
              <div className="maha-dashboard-panels-item-label">
                { panel.title }
              </div>
              <Button { ...this._getEdit(panel) } />
              <Button { ...this._getDelete(panel) } />
            </div>
          ))}
          <div className="maha-dashboard-panels-item">
            <Button { ...this._getAdd() } />
          </div>
        </div>
      </div>
    )
  }

  _getAdd() {
    return {
      label: '+ New Panel',
      className: 'maha-dashboard-panels-add',
      modal: New
    }
  }

  _getClass(panel) {
    const { active } = this.props
    const classes = ['maha-dashboard-panels-item']
    if(panel.id === active) classes.push('selected')
    return classes.join(' ')
  }

  _getDelete(panel) {
    return {
      label: <i className="fa fa-trash-o" />,
      className: 'maha-dashboard-panels-item-action',
      confirm: 'Are you sure you want to delete this panel?',
      request: {
        method: 'DELETE',
        endpoint: `/api/admin/dashboard/panels/${panel.id}`,
        onSuccess: this._handleDelete
      }
    }
  }

  _getEdit(panel) {
    return {
      label: <i className="fa fa-pencil" />,
      className: 'maha-dashboard-panels-item-action',
      modal: <Edit panel={ panel } />
    }
  }

  _getOwned() {
    const { admin } = this.context
    const { panels } = this.props
    return panels.filter(panel => {
      return panel.owner.id === admin.user.id
    })
  }

  _getPanel() {
    return {
      title: 'Panels',
      color: 'grey'
    }
  }

  _getShared() {
    const { admin } = this.context
    const { panels } = this.props
    return panels.filter(panel => {
      return panel.owner.id !== admin.user.id
    })
  }

  _handleSelect(panel) {
    this.props.onSelect(panel.id)
  }

}

export default Sidebar
