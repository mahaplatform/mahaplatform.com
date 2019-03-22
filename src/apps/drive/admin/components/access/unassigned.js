import { AssigneeToken, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Unassigned extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    unassigned: PropTypes.object,
    onChoose: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { unassigned } = this.props
    return (
      <div className="maha-assignment-list">
        { unassigned.status === 'success' && unassigned.records.length === 0 &&
          <Message { ...this._getNotFound() } />
        }
        { unassigned.status === 'success' && unassigned.records.length > 0 &&
          <div className="maha-assignment-unassigned-items">
            { unassigned.records.length > 0 && unassigned.records.map((assignee, index) => (
              <div className="maha-assignment-unassigned-item" key={ `unassigned_${assignee.id}` } onClick={ this._handleChoose.bind(this, assignee) }>
                <AssigneeToken { ...assignee } />
              </div>
            )) }
          </div>
        }
      </div>
    )
  }

  _getNotFound() {
    return {
      icon: 'times',
      title: 'No Results Found',
      text: 'No records matched your query'
    }
  }


  _handleChoose(assignee) {
    this.props.onChoose({
      is_everyone: assignee.is_everyone,
      user: assignee.user,
      group: assignee.group
    })
  }

}

export default Unassigned
