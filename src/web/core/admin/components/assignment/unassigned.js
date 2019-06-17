import { Format, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Unassigned extends React.Component {

  static propTypes = {
    format: PropTypes.any,
    text: PropTypes.string,
    unassigned: PropTypes.object,
    value: PropTypes.string,
    onChoose: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { text, format, unassigned } = this.props
    return (
      <div className="maha-assignment-list">
        { unassigned.status === 'success' && unassigned.records.length === 0 &&
          <Message { ...this._getNotFound() } />
        }
        { unassigned.status === 'success' && unassigned.records.length > 0 &&
          <div className="maha-assignment-unassigned-items">
            { unassigned.records.length > 0 && unassigned.records.map((assignee, index) => (
              <div className="maha-assignment-unassigned-item" key={ `unassigned_${assignee.id}` } onClick={ this._handleChoose.bind(this, assignee) }>
                <Format { ...assignee } format={ format } text={ text } value={ assignee } />
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
    this.props.onChoose(assignee)
  }

}

export default Unassigned
