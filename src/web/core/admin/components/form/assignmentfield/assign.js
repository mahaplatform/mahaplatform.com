import AssigneeToken from '../../../tokens/assignee'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

class Assign extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
  }

  static defaultProps = {
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        foo
      </ModalPanel>
    )
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

  _handleCancel() {
    this.context.form.pop()
  }

  _handleDone() {
    this.context.form.pop()
  }

}

export default Assign
