import { AssigneeToken, Loader, Message, Searchbox, Virtualized } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Unassigned extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    unassigned: PropTypes.object,
    onChoose: PropTypes.func,
    onQuery: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { unassigned } = this.props
    return (
      <div className="maha-assignment-unassigned">
        <div className="maha-assignment-unassigned-header">
          <Searchbox { ...this._getSearchbox() } />
        </div>
        <div className="maha-assignment-unassigned-body">
          { unassigned.status === 'loading' && <Loader /> }
          { unassigned.status === 'success' && unassigned.records.length === 0 &&
            <Message { ...this._getNotFound() } />
          }
          { unassigned.status === 'success' && unassigned.records.length > 0 &&
            <Virtualized { ...this._getVirtualized() } />
          }
        </div>
      </div>
    )
  }

  rowRender(index) {
    const { unassigned } = this.props
    return (
      <div className="maha-assignment-unassigned-item" onClick={ this._handleChoose.bind(this, unassigned.records[index]) }>
        <AssigneeToken { ...unassigned.records[index] } />
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

  _getSearchbox() {
    return {
      prompt: 'Find a user or group',
      onChange: this.props.onQuery
    }
  }

  _getVirtualized() {
    const { unassigned } = this.props
    return {
      rowCount: unassigned.records.length,
      rowHeight: 50,
      rowRender: this.rowRender.bind(this)
    }
  }

  _handleChoose(assignee) {
    this.props.onChoose({
      grouping_id: assignee.grouping_id,
      user_id: assignee.user_id,
      group_id: assignee.group_id
    })
  }

}

export default Unassigned
