import Avatar from '../../components/avatar'
import PropTypes from 'prop-types'
import React from 'react'

const AssigneeToken = ({ is_everyone, full_name, initials, photo, group_id, user_id, is_active }) => (
  <div className="assignee-token">
    <div className="assignee-token-image">
      { is_everyone &&
        <div className="assignee-token-icon">
          <Avatar icon='globe' user={{ full_name }} />
        </div>
      }
      { group_id &&
        <div className="assignee-token-icon">
          <Avatar icon='users' user={{ full_name }} />
        </div>
      }
      { user_id &&
        <div className="assignee-token-avatar">
          <Avatar user={{ full_name, photo, initials }} presence={ false } />
        </div>
      }
    </div>
    <div className="assignee-token-name">
      <span>{ full_name }</span> 
      { is_active === false &&
        <span className="compact-user-token-activity">
          INACTIVE
        </span>
      }
    </div>
  </div>
)

AssigneeToken.propTypes = {
  initials: PropTypes.string,
  full_name: PropTypes.string,
  group_id: PropTypes.number,
  is_everyone: PropTypes.bool,
  is_active: PropTypes.bool,
  photo: PropTypes.string,
  user_id: PropTypes.number
}

export default AssigneeToken
