import { Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import Posts from './posts'
import React from 'react'
import _ from 'lodash'

class Feed extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  state = {
    cacheKey: ''
  }

  _handleReload = this._handleReload.bind(this)

  render() {
    return (
      <div className="news-feed">
        <Infinite { ...this._getInfinte() } />
      </div>
    )
  }

  componentDidMount() {
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getInfinte() {
    const { cacheKey } = this.state
    return {
      cacheKey,
      endpoint: '/api/admin/news/posts',
      layout: Posts,
      props: {}
    }
  }

  _handleJoin() {
    const { network } = this.context
    const target = '/admin/news/posts'
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleReload }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/news/posts'
    network.leave(target)
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleReload }
    ])
  }

  _handleReload() {
    this.setState({
      cacheKey: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    })
  }

}

export default Feed
