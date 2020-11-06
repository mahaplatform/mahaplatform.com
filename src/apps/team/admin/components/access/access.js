import { CSSTransition } from 'react-transition-group'
import { AppToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Access extends React.Component {

  static propTypes = {
    access: PropTypes.array,
    app_ids: PropTypes.array,
    defaultValue: PropTypes.object,
    right_ids: PropTypes.array,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onLoad: PropTypes.func,
    onReady: PropTypes.func,
    onSetAssigned: PropTypes.func,
    onToggleApp: PropTypes.func,
    onToggleRight: PropTypes.func
  }

  render() {
    const { access } = this.props
    return (
      <div className="access">
        { access.map((app, appindex) => (
          <div key={`app_${appindex}`} className="access-app">
            <div className="access-app-title" onClick={ this._handleToggleApp.bind(this, app.id) }>
              <div className="access-app-label">
                <AppToken { ...app } />
              </div>
              <div className="access-app-input">
                <i className={`fa fa-fw fa-${ this._getAppIcon(app.id) }`} />
              </div>
            </div>
            <CSSTransition in={ this._getAppAssigned(app.id) } classNames="expanded" component="div" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
              <div className="access-rights">
                { app.rights.length > 0 && app.rights.map((right, rightindex) => (
                  <div key={`app_right_${rightindex}`} className="access-right" onClick={ this._handleToggleRight.bind(this, right.id) }>
                    <div className="access-right-input">
                      <i className={`fa fa-fw fa-${ this._getRightIcon(right.id) }`} />
                    </div>
                    <div className="access-right-label">
                      <strong>{ right.title }</strong><br />
                      { right.description }
                    </div>
                  </div>
                ))}
                { app.rights.length === 0 &&
                  <div className="access-right-empty">
                    This app has no rights
                  </div>
                }
              </div>
            </CSSTransition>
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSetAssigned, onLoad } = this.props
    if(defaultValue) onSetAssigned(defaultValue)
    onLoad()
  }

  componentDidUpdate(prevProps) {
    const { access, app_ids, right_ids, onChange, onReady } = this.props
    if(access !== prevProps.access) {
      onReady()
    }
    if(prevProps.app_ids.length !== app_ids.length) {
      onChange({ app_ids, right_ids })
    }
    if(prevProps.right_ids.length !== right_ids.length) {
      onChange({ app_ids, right_ids })
    }
  }

  _getAppAssigned(app_id) {
    const { app_ids } = this.props
    return _.includes(app_ids, app_id)
  }

  _getAppIcon(app_id) {
    const { app_ids } = this.props
    const assigned = _.includes(app_ids, app_id)
    return assigned ? 'toggle-on' : 'toggle-off'
  }

  _getRightIcon(right_id) {
    const { right_ids } = this.props
    const assigned = _.includes(right_ids, right_id)
    return assigned ? 'check-circle' : 'circle-o'
  }

  _handleToggleApp(app_id) {
    this.props.onToggleApp(app_id)
  }

  _handleToggleRight(right_id) {
    this.props.onToggleRight(right_id)
  }

}

export default Access
