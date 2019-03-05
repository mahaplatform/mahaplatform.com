import React from 'react'
import PropTypes from 'prop-types'

class Badge extends React.Component {

  static contextTypes = {
    portal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    channel: PropTypes.string,
    count: PropTypes.number,
    icon: PropTypes.string,
    sound: PropTypes.string,
    onFetch: PropTypes.func
  }

  _handleFetch = this._handleFetch.bind(this)

  render() {
    const { count, icon } = this.props
    return (
      <div className="maha-badge">
        { count > 0 &&
          <div className="maha-badge-label" title={`${count} unread`}>{ count > 99 ? '99+' : count }</div>
        }
        { icon && <i className={ `fa fa-fw fa-${icon}` } /> }
      </div>
    )
  }

  componentDidMount() {
    const { channel } = this.props
    if(channel) this._handleJoin()
    if(channel) this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { count } = this.props
    if(count !== prevProps.count) {
      this.context.portal.updateUnseen(count - prevProps.count)
    }
  }

  componentWillUnmount() {
    if(this.props.channel) this._handleLeave()
  }

  _handleJoin() {
    const { network } = this.context
    const { channel } = this.props
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { channel } = this.props
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleFetch() {
    const { channel, onFetch } = this.props
    onFetch(`/api${channel}`)
  }

}

export default Badge
