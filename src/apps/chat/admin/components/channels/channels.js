import { Infinite, Loader, Searchbox } from 'maha-admin'
import { Empty, NotFound } from '../search/empty'
import ChannelToken from '../channel_token'
import { Results } from '../search'
import PropTypes from 'prop-types'
import Tasks from '../tasks'
import React from 'react'
import _ from 'lodash'

class Channels extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    channel_type: PropTypes.string,
    channels: PropTypes.array,
    q: PropTypes.string,
    selected: PropTypes.number,
    showNew: PropTypes.bool,
    status: PropTypes.string,
    onNew: PropTypes.func,
    onChangeType: PropTypes.func,
    onChoose: PropTypes.func,
    onRefresh: PropTypes.func,
    onSetQuery: PropTypes.func,
    onStarred: PropTypes.func
  }

  _handleNew = this._handleNew.bind(this)
  _handleStarred = this._handleStarred.bind(this)
  _handleTasks = this._handleTasks.bind(this)
  _handleType = _.debounce(this._handleType.bind(this), 250, { trailing: true })

  render() {
    const { channels, q, showNew, status } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="chat-channels-header">
          <div className="chat-channels-header-top">
            <div className="chat-channels-header-search">
              <Searchbox { ...this._getSearchbox() } />
            </div>
            { showNew &&
              <div className="chat-channels-header-add" onClick={ this._handleNew }>
                <i className="fa fa-fw fa-plus" />
              </div>
            }
          </div>
          { q.length === 0 &&
            <div className="chat-channels-header-tabs">
              <div className="reframe-tabs">
                <div className="reframe-tabs-items">
                  <div { ...this._getTab('active') }>
                    Active
                  </div>
                  <div { ...this._getTab('archived') }>
                    Archived
                  </div>
                  <div { ...this._getTab('starred') }>
                    Starred
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        { q.length === 0 && status === 'loading' && <Loader /> }
        { q.length === 0 && status !== 'loading' && channels.length > 0 &&
          <div className="chat-channels-body">
            { channels.map((channel, index) => (
              <ChannelToken {...this._getChannel(channel) } key={ `channel_${channel.id}` } />
            ))}
          </div>
        }
        { q.length === 0 && status !== 'loading' && channels.length === 0 &&
          <Empty { ...this._getEmpty() } />
        }
        { q.length > 0 &&
          <Infinite { ...this._getInfinite() } />
        }
        <div className="chat-channels-footer">
          <span className="chat-channels-type" onClick={ this._handleStarred }>
            Starred Messages
          </span>
        </div>
      </div>
    )
  }

  _getClass() {
    const { showNew } = this.props
    const classes = ['chat-channels']
    if(showNew) classes.push('new')
    return classes.join(' ')
  }

  _getSearchbox() {
    return {
      prompt: 'Search...',
      onChange: this._handleType
    }
  }

  _getTab(type) {
    const { channel_type } = this.props
    const classes = ['reframe-tabs-item']
    if(type === channel_type) classes.push('active')
    return {
      className: classes.join(' '),
      onClick: this._handleChangeType.bind(this, type)
    }
  }

  _getInfinite() {
    const { q } = this.props
    return {
      empty: () => <Empty { ...this._getEmpty() } />,
      endpoint: '/api/admin/chat/search',
      filter: { q },
      layout: (props) => <Results {...props} onChoose={ this._handleChoose.bind(this) } />,
      notFound: NotFound
    }
  }

  _getChannel(channel) {
    const { selected } = this.props
    return {
      ...channel,
      active: channel.id === selected,
      onClick: this._handleChoose.bind(this, channel.id),
      onContextMenu: this._handleTasks
    }
  }

  _getTasks(channel) {
    return {
      id: channel.id,
      channel,
      title: true,
      onArchive: null,
      onDelete: null,
      onDone: null,
      onEdit: null,
      onLeave: null,
      onSetMode: null,
      onSubscriptions: null
    }
  }

  _handleChangeType(type) {
    this.props.onChangeType(type)
  }

  _getEmpty() {
    return {
      channel_type: this.props.channel_type,
      onNew: this._handleNew
    }
  }

  _handleStarred() {
    this.props.onStarred()
  }

  _handleNew() {
    this.props.onNew()
  }

  _handleChoose(id) {
    this.props.onChoose(id)
  }

  _handleTasks(channel, e) {
    e.stopPropagation()
    e.preventDefault()
    this.context.tasks.open([
      { component: <Tasks { ...this._getTasks(channel) } /> }
    ])
    return false
  }

  _handleType(q) {
    this.props.onSetQuery(q)
  }

}

export default Channels
