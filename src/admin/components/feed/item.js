import PropTypes from 'prop-types'
import Avatar from '../avatar'
import Logo from '../logo'
import moment from 'moment'
import React from 'react'

class Item extends React.Component {

  static propTypes = {
    context: PropTypes.string,
    item: PropTypes.object,
    user: PropTypes.object,
    onClick: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { item, context } = this.props
    const { description, object, subject_text, object_text } = item
    let __html = description
    __html = __html.replace(object_text, `<span class="maha-feed-item-object">${object_text}</span>`)
    if(object) __html = __html.replace(`${object.owner_full_name}'s`, `<span class="maha-feed-item-object">${object.owner_full_name}'s</span>`)
    __html = __html.replace(subject_text, `<span class="maha-feed-item-subject">${subject_text}</span>`)
    let classes = ['maha-feed-item', item.app.color]
    if(context === 'feed' && item.is_visited === false) {
      classes.push('unread')
    }
    const color = item.app.color || 'blue'
    const icon = item.app.icon || 'user'
    return (
      <a className={classes.join(' ')} onClick={ this._handleClick }>
        <div className="maha-feed-item-avatar">
          <Avatar user={ item.subject } width="40" presence={ false } />
        </div>
        <div className="maha-feed-item-details">
          <div className="maha-feed-item-story">
            <span dangerouslySetInnerHTML={{ __html }} />
            { item.team &&
              <div className="maha-feed-item-team">
                <Logo team={ item.team } />
                { item.team.title }
              </div>
            }
          </div>
          <div className="maha-feed-item-timestamp">
            <div className={`maha-feed-item-app-icon ${color}`}>
              <i className={`fa fa-fw fa-${icon}`} />
            </div>
            { this._formatRelativeTime(item.created_at) }
          </div>
        </div>
        <div className="maha-feed-item-icon">
          <i className="chevron right icon" />
        </div>
      </a>
    )
  }

  _formatRelativeTime(datetime) {
    const now  = moment()
    const timestamp = moment(datetime)
    const minutes_ago = now.diff(timestamp, 'minutes')
    if(minutes_ago === 0) return 'a few seconds ago'
    if(minutes_ago === 1) return '1 minute ago'
    if(minutes_ago < 60) return `${minutes_ago} minutes ago`
    return timestamp.format('hh:mm A')
  }

  _handleClick() {
    this.props.onClick()
  }

}

export default Item
