import OptionToken from '../../tokens/option'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Options extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    assignment: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { assignment } = this.props
    return {
      title: 'Choose Option',
      method: 'patch',
      endpoint: `/api/admin/training/assignments/${assignment.id}/edit`,
      action: `/api/admin/training/assignments/${assignment.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          instructions: 'Please choose the option that best fits your availability and/or preferences',
          fields: [
            { name: 'option_id', type: 'radiogroup', prompt: 'Choose an Option', endpoint: `/api/admin/training/assignments/${assignment.id}/options`, value: 'id', text: 'id', format: OptionToken }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Options
