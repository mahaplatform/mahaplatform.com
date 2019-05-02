import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const AssigneeToken = ({ is_everyone, user, group, name, photo }) => (
  <div className="assignee-token">
    <div className="assignee-token-image">
      { is_everyone &&
        <div className="assignee-token-icon">
          <Avatar icon='globe' user={{ full_name: 'Everyone' }} />
        </div>
      }
      { group &&
        <div className="assignee-token-icon">
          <Avatar icon='users' user={ group } presence={ false } />
        </div>
      }
      { user &&
        <div className="assignee-token-avatar">
          <Avatar user={ user } presence={ false } />
        </div>
      }
    </div>
    <div className="assignee-token-name">
      { user && <span>{ user.full_name }</span> }
      { group && <span>{ group.title }</span> }
      { is_everyone && <span>Everyone</span> }
    </div>
  </div>
)

AssigneeToken.propTypes = {
  name: PropTypes.string,
  group: PropTypes.object,
  is_everyone: PropTypes.bool,
  photo: PropTypes.string,
  user: PropTypes.object
}

export default AssigneeToken
