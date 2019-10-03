import Options from '../../components/options'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    assigning: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { assigning } = this.props
    return {
      title: 'Edit an Assigning',
      method: 'patch',
      endpoint: `/api/admin/training/assignings/${assigning.id}/edit`,
      action: `/api/admin/training/assignings/${assigning.id}`,
      saveText: 'Assign',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Give this assignment a title', required: true },
            { label: 'Training Options', name: 'options', type: Options, required: true },
            { label: 'Must Be Completed By', name: 'completed_by', type: 'datefield' }
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

export default Edit
