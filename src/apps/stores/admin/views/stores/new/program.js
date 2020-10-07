import ProgramChooser from '../../../../../crm/admin/components/program_chooser'
import PropTypes from 'prop-types'
import React from 'react'

class Program extends React.Component {

  static propTypes = {
    formdata: PropTypes.object,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onNext: PropTypes.func,
    onSave: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    return <ProgramChooser { ...this._getProgramChooser() } />
  }

  _getProgramChooser() {
    return {
      requires: ['bank'],
      onChoose: this._handleChoose
    }
  }

  _handleChoose(program) {
    this.props.onNext({ program })
  }

}

export default Program
