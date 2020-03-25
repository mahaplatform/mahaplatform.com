import { Button, Infinite } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Trigger from './trigger'
import Feeds from './feeds'
import Posts from './posts'
import React from 'react'
import _ from 'lodash'

class Feed extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    group_id: PropTypes.number,
    user_id: PropTypes.number,
    pathname: PropTypes.string,
    onChoose: PropTypes.func
  }

  state = {
    cacheKey: '',
    group_id: null,
    open: false,
    user_id: null
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleReload = this._handleReload.bind(this)
  _handleToggleFeeds = this._handleToggleFeeds.bind(this)

  render() {
    return (
      <div className={ this._getClass() }>
        <div className="news-feed-main">
          <div className="news-feed-main-header">
            <Button { ...this._getButton() } />
          </div>
          <div className="news-feed-main-body">
            <Infinite { ...this._getInfinte() } />
          </div>
        </div>
        <div className="news-feed-sidebar">
          <Feeds { ...this._getFeeds() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { group_id, user_id } = this.props
    this.setState({ group_id, user_id })
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props
    if(pathname !== prevProps.pathname) {
      this._handleChangeUrl()
    }
  }

  _getButton() {
    return {
      label: 'change feed',
      className: 'link',
      handler: this._handleToggleFeeds
    }
  }

  _getClass() {
    const { open } = this.state
    const classes = ['news-feed']
    if(open) classes.push('open')
    return classes.join(' ')
  }

  _getEndpoint() {
    const { group_id, user_id } = this.state
    if(user_id) return `/api/admin/news/posts/users/${user_id}`
    if(group_id) return `/api/admin/news/posts/groups/${group_id}`
    return '/api/admin/news/posts'
  }

  _getFeeds() {
    const { group_id, user_id } = this.state
    return {
      group_id,
      user_id,
      onChoose: this._handleChoose
    }
  }

  _getInfinte() {
    const { cacheKey, group_id, user_id } = this.state
    const empty = (
      <div className="news-posts">
        <Trigger group_id={ group_id } user_id={ user_id } />
      </div>
    )
    return {
      cacheKey,
      empty,
      notFound: empty,
      endpoint: this._getEndpoint(),
      layout: Posts,
      refresh: '/admin/news/posts',
      props: {
        user_id,
        group_id
      }
    }
  }

  _getPathname(group_id, user_id) {
    if(group_id) return `/admin/news/groups/${group_id}`
    if(user_id) return `/admin/news/users/${user_id}`
    return '/admin/news'
  }

  _handleChangeUrl() {
    const { pathname } = this.props
    const matches = pathname.match(/(groups|users)\/(.*)/)
    this.setState({
      group_id: matches && matches[1] === 'groups' ? parseInt(matches[2]) : null,
      user_id: matches && matches[1] === 'users' ? parseInt(matches[2]) : null,
      cacheKey: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    })
  }

  _handleChoose({ group_id, user_id }) {
    const pathname = this._getPathname(group_id, user_id)
    this.context.router.history.replace(pathname)
    this.setState({
      open: false
    })
  }

  _handleReload() {
    this.setState({
      cacheKey: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    })
  }

  _handleToggleFeeds() {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

}

const mapStateToProps = (state, props) => ({
  pathname: state.maha.router.history.slice(-1)[0].pathname
})

export default connect(mapStateToProps)(Feed)
