import { Infinite, Message, Feed } from '@admin'
import PropTypes from 'prop-types'
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
    return <Infinite { ...this._getInfinite() } />
  }

  componentDidMount() {
    this._handleJoin()
    this._handleSeen()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getInfinite() {
    const { cacheKey } = this.state
    const empty = {
      icon: 'bell',
      empty: 'You have not yet received any notifications'
    }
    return {
      cacheKey,
      endpoint: '/api/admin/notifications',
      sort: { key: 'created_at', order: 'desc' },
      layout: Feed,
      props: {
        onClick: this._handleClick
      },
      empty: <Message { ...empty } />
    }
  }

  _handleClick(notification) {
    const { notifications, router } = this.context
    if(!notification.is_visited) notifications.markVisited(notification.id)
    router.history.push(notification.url)
  }

  _handleJoin() {
    this.context.network.subscribe([
      { target: '/admin/notifications', action: 'refresh', handler: this._handleRefresh }
    ])
  }

  _handleLeave() {
    this.context.network.unsubscribe([
      { target: '/admin/notifications', action: 'refresh', handler: this._handleRefresh }
    ])
  }

  _handleRefresh() {
    this.setState({
      cacheKey: _.random(100000, 999999).toString(36)
    })
  }

  _handleSeen() {
    this.context.network.request({
      endpoint: '/api/admin/notifications/seen',
      method: 'patch',
      onSuccess: () => {},
      onFailure: () => {}
    })
  }

}

export default Notifications
