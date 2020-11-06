import ProgramChooser from '@apps/crm/admin/components/program_chooser'
import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Programs extends React.PureComponent {

  static propTypes = {
    onCancel: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <ProgramChooser { ...this._getProgramChooser() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose a Progam',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _getProgramChooser() {
    return {
      requires: ['bank'],
      onChoose: this._handleChoose
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChoose(program) {
    this.props.onChoose(program)
  }

}

export default Programs
