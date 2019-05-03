import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Roles extends React.Component {

  static propTypes = {
    assigned: PropTypes.array,
    defaultValue: PropTypes.array,
    roles: PropTypes.array,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onLoad: PropTypes.func,
    onReady: PropTypes.func,
    onSetAssigned: PropTypes.func,
    onToggle: PropTypes.func
  }

  render() {
    const { assigned, roles } = this.props
    return (
      <div className="roles">
        { roles.length > 0 && roles.map((role, index) => (
          <div key={`role_${index}`} className="role">
            <div className="role-label">
              <strong>{ role.title }</strong><br />
              { role.description }
            </div>
            <div className="role-input">
              <i className={`fa fa-fw fa-toggle-${_.includes(assigned, role.id) ? 'on' : 'off'}`} onClick={ this._handleToggleRole.bind(this, index) } />
            </div>
          </div>
        ))}
        { roles.length === 0 &&
          <div className="role">
            <div className="role-label">
              You have not yet created any roles
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSetAssigned, onLoad } = this.props
    if(defaultValue) {
      onSetAssigned(defaultValue)
    }
    onLoad()
  }

  componentDidUpdate(prevProps) {
    const { assigned, roles, onChange, onReady } = this.props
    if(roles !== prevProps.roles) {
      onReady()
    }
    if(assigned !== prevProps.assigned) {
      onChange(assigned)
    }
  }

  _handleToggleRole(index) {
    this.props.onToggle(index)

  }

}

export default Roles
