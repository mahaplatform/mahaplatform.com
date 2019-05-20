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
    channels: PropTypes.array,
    q: PropTypes.string,
    selected: PropTypes.number,
    showNew: PropTypes.bool,
    status: PropTypes.string,
    onNew: PropTypes.func,
    onChangeType: PropTypes.func,
    onChoose: PropTypes.func,
    onRefresh: PropTypes.func,
    onSetQuery: PropTypes.func
  }

  _handleNew = this._handleNew.bind(this)
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
      onDone: null,
      onEdit: null,
      onSetMode: null,
      onSubscriptions: null
    }
  }

  _getEmpty() {
    return {
      channel_type: 'active',
      onNew: this._handleNew
    }
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
