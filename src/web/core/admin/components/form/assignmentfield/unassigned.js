import AssigneeToken from '../../../tokens/assignee'
import Virtualized from '../../virtualized'
import Searchbox from '../../searchbox'
import PropTypes from 'prop-types'
import React from 'react'

class Unassigned extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    unassigned: PropTypes.array,
    onQuery: PropTypes.func,
    onAdd: PropTypes.func
  }

  static defaultProps = {
  }

  render() {
    return (
      <div className="maha-assignment-unassigned">
        <div className="maha-assignment-unassigned-header">
          <Searchbox { ...this._getSearchbox() } />
        </div>
        <div className="maha-assignment-unassigned-body">
          <Virtualized { ...this._getVirtualized() } />
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
      is_everyone: assignee.is_everyone,
      group_id: assignee.group ? assignee.group.id : null,
      user_id: assignee.user ? assignee.user.id : null
    })
  }

}

export default Unassigned
