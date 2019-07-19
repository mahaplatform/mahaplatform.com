import AssigneeToken from '../../../tokens/assignee'
import Virtualized from '../../virtualized'
import Searchbox from '../../searchbox'
import Message from '../../message'
import PropTypes from 'prop-types'
import React from 'react'

class Unassigned extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    unassigned: PropTypes.array,
    onAdd: PropTypes.func,
    onQuery: PropTypes.func
  }

  static defaultProps = {
  }

  render() {
    const { unassigned } = this.props
    return (
      <div className="maha-assignment-unassigned">
        <div className="maha-assignment-unassigned-header">
          <Searchbox { ...this._getSearchbox() } />
        </div>
        <div className="maha-assignment-unassigned-body">
          { unassigned.length === 0 &&
            <Message { ...this._getNotFound() } />
          }
          { unassigned.length > 0 &&
            <Virtualized { ...this._getVirtualized() } />
          }
        </div>
      </div>
    )
  }

  rowRender(index) {
    const { unassigned } = this.props
    return (
      <div className="maha-assignment-unassigned-item" onClick={ this._handleAdd.bind(this, unassigned[index])}>
        <AssigneeToken { ...unassigned[index] } />
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
      prompt: 'Find a user',
      onChange: this.props.onQuery
    }
  }

  _getVirtualized() {
    const { unassigned } = this.props
    return {
      rowCount: unassigned.length,
      rowHeight: 50,
      rowRender: this.rowRender.bind(this)
    }
  }

  _handleAdd(assignee) {
    this.props.onAdd({
      grouping: assignee.grouping,
      group_id: assignee.group_id ,
      user_id: assignee.user_id
    })
  }

}

export default Unassigned
