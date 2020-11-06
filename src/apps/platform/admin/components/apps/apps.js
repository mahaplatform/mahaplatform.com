import { AppToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Apps extends React.Component {

  static propTypes = {
    apps: PropTypes.array,
    app_ids: PropTypes.array,
    defaultValue: PropTypes.array,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onSetAssigned: PropTypes.func,
    onToggleApp: PropTypes.func
  }

  render() {
    const { apps, app_ids } = this.props
    return (
      <div className="access">
        { apps.map((app, index) => {
          const appAssigned = _.includes(app_ids, app.id)
          return (
            <div key={`app_${app.id}`} className="access-app">
              <div className="access-app-title">
                <div className="access-app-label">
                  <AppToken { ...app } />
                </div>
                <div className="access-app-input">
                  <i className={`fa fa-fw fa-toggle-${appAssigned ? 'on' : 'off'}`} onClick={ this._handleToggleApp.bind(this, app.id) } />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSetAssigned, onFetch } = this.props
    if(defaultValue) onSetAssigned(defaultValue)
    onFetch()
  }

  componentDidUpdate(prevProps) {
    const { apps, app_ids, onChange, onReady } = this.props
    if(apps !== prevProps.apps) {
      onReady()
    }
    if(prevProps.app_ids.length !== app_ids.length) {
      onChange(app_ids)
    }
  }

  _handleToggleApp(app_id) {
    this.props.onToggleApp(app_id)
  }

}

export default Apps
