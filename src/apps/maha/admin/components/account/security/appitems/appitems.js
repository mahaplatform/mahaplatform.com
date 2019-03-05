import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class AppItems extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    items: PropTypes.array,
    notifications: PropTypes.array,
    selected: PropTypes.array,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onLoad: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  render() {
    const { items, selected } = this.props
    return (
      <div className="maha-subscription">
        { items.map((app, index) => [
          <div className="maha-subscription-app" key={`app_${index}`}>
            <div className={`maha-subscription-app-icon ${app.color}`}>
              <i className={`fa fa-fw fa-${app.icon}`} />
            </div>
            { app.title }
          </div>,
          app.items.map((item, i) => (
            <div className="maha-subscription-notification" key={`notification_${i}`} onClick={ this._handleToggle.bind(this, item.id) }>
              <div className="maha-subscription-notification-icon">
                { !_.includes(selected, item.id) ? <i className="fa fa-fw fa-check-circle" /> : <i className="fa fa-fw fa-circle-o" />}
              </div>
              <div className="maha-subscription-notification-label">
                { item.description }
              </div>
            </div>
          ))
        ])}
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, endpoint, onSet, onLoad } = this.props
    if(defaultValue) onSet(defaultValue)
    onLoad(endpoint)
  }

  componentDidUpdate(prevProps) {
    const { selected, status, onChange, onReady } = this.props
    if(status !== prevProps.status && status === 'success') onReady()
    if(!_.isEqual(selected.sort(), prevProps.selected.sort())) onChange(selected)
  }

  _handleToggle(id) {
    this.props.onToggle(id)
  }

}

export default AppItems
