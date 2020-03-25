import { Avatar, Logo } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

class Results extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    group_id: PropTypes.number,
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { admin } = this.context
    const { records } = this.props
    return (
      <div className="news-feed-groups-results">
        <div className={ this._getClass(null) } onClick={ this._handleGroup.bind(this, null) }>
          <div className="news-feed-group-icon">
            <i className="fa fa-fw fa-globe" />
          </div>
          <div className="news-feed-group-label">
            News Feed
          </div>
        </div>
        <div className={ this._getClass(null) } onClick={ this._handleUser.bind(this, admin.user.id) }>
          <div className="news-feed-group-icon">
            <Avatar user={ admin.user } presence={ false } />
          </div>
          <div className="news-feed-group-label">
            Your Timeline
          </div>
        </div>
        { records.map((group, index) => (
          <div className={ this._getClass(group.id) } key={`group_${index}`} onClick={ this._handleGroup.bind(this, group.id) }>
            <div className="news-feed-group-icon">
              <Logo team={ group } width="28" />
            </div>
            <div className="news-feed-group-label">
              { group.title }
            </div>
            <div className="news-feed-group-action" onClick={ this._handleEdit.bind(this, group.id) }>
              <i className="fa fa-pencil" />
            </div>
            <div className="news-feed-group-action" onClick={ this._handleDelete.bind(this, group.id) }>
              <i className="fa fa-times" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(group_id) {
    const classes = ['news-feed-group']
    if(group_id === this.props.group_id) classes.push('selected')
    return classes.join(' ')
  }

  _handleGroup(group_id) {
    this.props.onChoose({ group_id })
  }

  _handleDelete(group_id, e) {
    e.stopPropagation()
    this.props.onChoose({})
  }

  _handleEdit(group_id, e) {
    e.stopPropagation()
    this.context.modal.open(<Edit group_id={ group_id } />)
  }

  _handleUser(user_id) {
    this.props.onChoose({ user_id })
  }

}

export default Results
