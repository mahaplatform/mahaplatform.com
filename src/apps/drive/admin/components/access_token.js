import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class AccessToken extends React.Component {

  static propTypes = {
    access_type: PropTypes.string,
    grouping: PropTypes.object,
    group: PropTypes.object,
    user: PropTypes.object
  }

  render() {
    const { grouping, group, user } = this.props
    return (
      <div className="access-token" title={ this._getTitle() }>
        { grouping &&
         <div className="assignee-token-icon">
           <Avatar icon='bolt' user={ this._getGrouping() } width="50" title={ false } presence={ false } />
         </div>
        }
        { group &&
         <div className="assignee-token-icon">
           <Avatar user={ this._getGroup() } width="50" title={ false } presence={ false } />
         </div>
        }
        { user &&
         <div className="assignee-token-avatar">
           <Avatar user={ user } width="50" title={ false } presence={ false } />
         </div>
        }
      </div>
    )
  }

  _getGroup() {
    const { group } = this.props
    return {
      initials: group.title.split(' ').map(word => word[0]).join('')
    }
  }

  _getGrouping() {
    const { grouping } = this.props
    return {
      initials: grouping.title.split(' ').map(word => word[0]).join('')
    }
  }

  _getTitle() {
    return `${this._getSubject()} ${this._getPredicate()}`
  }

  _getSubject() {
    const { grouping, group, user } = this.props
    if(grouping) return grouping.title
    if(group) return group.title
    if(user) return user.full_name
  }

  _getPredicate() {
    const { access_type } = this.props
    if(access_type === 'owner') return 'is the owner'
    if(access_type === 'edit') return 'can edit'
    if(access_type === 'view') return 'can view'
  }

}

export default AccessToken
