import { Collection } from 'reframe'
import PropTypes from 'prop-types'
import Feed from '../feed'
import React from 'react'
import _ from 'lodash'

class Notifications extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object,
    notifications: PropTypes.object,
    router: PropTypes.object
  }

  state = {
    cacheKey: null
  }

  _handleRefresh = this._handleRefresh.bind(this)
  _handleClick = this._handleClick.bind(this)

  render() {
    return <Collection { ...this._getCollection() } />
  }

  componentDidMount() {
    const { network } = this.context
    network.subscribe([
      { target: '/admin/notifications', action: 'add', handler: this._handleRefresh }
    ])
  }

  componentWillUnmount() {
    const { network } = this.context
    network.unsubscribe([
      { target: '/admin/notifications', action: 'add', handler: this._handleRefresh }
    ])
  }

  _getCollection() {
    const { cacheKey } = this.state
    return {
      cacheKey,
      endpoint: '/api/admin/notifications',
      defaultSort: { key: 'created_at', order: 'desc' },
      layout: (props) => <Feed { ...props } onClick={ this._handleClick } />,
      icon: 'bell',
      empty: 'You have not yet received any notifications',
      entity: 'notification',
      search: false
    }
  }

  _handleClick(notification) {
    const { notifications, router } = this.context
    if(!notification.is_visited) notifications.markVisited(notification.id)
    router.push(notification.url)
  }

  _handleRefresh() {
    this.setState({ cacheKey: _.random(100000, 999999).toString(36) })
  }

}

export default Notifications
