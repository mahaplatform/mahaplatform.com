import { Avatar, Comments } from 'maha-admin'
import PropTypes from 'prop-types'
import Likes from './likes'
import moment from 'moment'
import React from 'react'

class Post extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    comments: PropTypes.array,
    created_at: PropTypes.string,
    group: PropTypes.object,
    id: PropTypes.number,
    liker_ids: PropTypes.array,
    text: PropTypes.string,
    user: PropTypes.object
  }

  _handleGroup = this._handleGroup.bind(this)
  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { comments, created_at, group, id, text, user } = this.props
    const { admin } = this.context
    return (
      <div className="news-post">
        <div className="news-post-header">
          <div className="news-post-header-avatar">
            <Avatar user={ user } width="75" />
          </div>
          <div className="news-post-header-details">
            <div className="news-post-header-name">
              { user.full_name }
              { group &&
                <span>
                  <i className="fa fa-caret-right" />
                  <span className="news-post-header-group" onClick={ this._handleGroup }>
                    { group.title }
                  </span>
                </span>
              }
            </div>
            <div className="news-post-header-timestamp" onClick={ this._handleClick.bind(this, id) }>
              { moment(created_at).format('MMM DD, YYYY @ h:mm A') }
            </div>
          </div>
          { user.id === admin.user.id &&
            <div className="news-post-header-tasks" onClick={ this._handleTasks }>
              <i className="fa fa-fw fa-ellipsis-h" />
            </div>
          }
        </div>
        <div className="news-post-body" dangerouslySetInnerHTML={{ __html: text }} />
        <div className="news-post-footer">
          <Likes { ...this._getLikes() } />
          <Comments entity={ `news_posts/${id}` } defaultValue={ comments }  />
        </div>
      </div>
    )
  }

  _getLikes() {
    const { liker_ids, id } = this.props
    return {
      post_id: id,
      liker_ids
    }
  }

  _handleClick(id) {
    this.context.router.history.push(`/admin/news/posts/${id}`)
  }

  _handleGroup() {
    const { group } = this.props
    this.context.router.history.push(`/admin/news/groups/${group.id}`)
  }

  _handleTasks() {
    const { id } = this.props
    this.context.tasks.open({
      items: [
        {
          label: 'Edit Post',
          handler: () => {}
        },
        {
          label: 'Delete Post',
          confirm: 'Are you sure you want to delete this post?',
          request: {
            method: 'DELETE',
            endpoint: `/api/admin/news/posts/${id}`,
            onFailure: (result) => context.flash.set('error', 'Unable to delete this post'),
            onSuccess: (result) => {}
          }
        }
      ]
    })
  }

}

export default Post
