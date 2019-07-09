import AssigneeToken from '../../../tokens/assignee'
import Virtualized from '../../virtualized'
import PropTypes from 'prop-types'
import React from 'react'

class Unassigned extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    unassigned: PropTypes.array
  }

  static defaultProps = {
  }

  state = {
    ready: false
  }
  render() {
    return (
      <div className="maha-assignment-unassigned">
        <Virtualized { ...this._getVirtualized() } />
      </div>
    )
  }

  rowRender(index) {
    const { unassigned } = this.props
    return (
      <AssigneeToken { ...unassigned[index] } />
    )
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ready: true
      })
    }, 350)
  }

  _getPanel() {
    return {
      title: 'Assign Users',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel.bind(this) }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleDone.bind(this) }
      ]
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

  _handleCancel() {
    this.context.form.pop()
  }

  _handleDone() {
    this.context.form.pop()
  }

}

export default Unassigned
