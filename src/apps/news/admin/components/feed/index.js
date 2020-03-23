import { Button, Infinite } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Trigger from './trigger'
import Groups from './groups'
import Posts from './posts'
import React from 'react'
import _ from 'lodash'

class Feed extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    group_id: PropTypes.number,
    pathname: PropTypes.string,
    onChoose: PropTypes.func
  }

  state = {
    cacheKey: '',
    group_id: null,
    open: false
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleReload = this._handleReload.bind(this)
  _handleToggleGroups = this._handleToggleGroups.bind(this)

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
          <Groups { ...this._getGroups() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { group_id } = this.props
    if(group_id) this.setState({ group_id })
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props
    if(pathname !== prevProps.pathname) {
      this._handleChangeUrl()
    }
  }

  _getButton() {
    return {
      label: 'change group',
      className: 'link',
      handler: this._handleToggleGroups
    }
  }

  _getClass() {
    const { open } = this.state
    const classes = ['news-feed']
    if(open) classes.push('open')
    return classes.join(' ')
  }

  _getGroups() {
    const { group_id } = this.state
    return {
      group_id,
      onChoose: this._handleChoose
    }
  }

  _getInfinte() {
    const { cacheKey, group_id } = this.state
    const empty = (
      <div className="news-posts">
        <Trigger group_id={ group_id } />
      </div>
    )
    return {
      cacheKey,
      empty,
      notFound: empty,
      endpoint: '/api/admin/news/posts',
      ...group_id ? {
        filter: {
          group_id: {
            $eq: group_id
          }
        }
      } : {},
      layout: Posts,
      refresh: '/admin/news/posts',
      props: {
        group_id
      }
    }
  }

  _handleChangeUrl() {
    const { pathname } = this.props
    const matches = pathname.match(/groups\/(.*)/)
    this.setState({
      group_id: matches ? parseInt(matches[1]) : null,
      cacheKey: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    })
  }

  _handleChoose(group_id) {
    const pathname = group_id ? `/admin/news/groups/${group_id}` : '/admin/news'
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

  _handleToggleGroups() {
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
