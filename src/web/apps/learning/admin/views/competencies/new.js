import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class CompetenciesNew extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Competency',
      method: 'post',
      action: '/api/admin/learning/competencies',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Description', name: 'description', type: 'textarea', required: true },
            { label: 'Category', name: 'category_id', type: 'lookup', required: true, endpoint: '/api/admin/learning/categories', value: 'id', text: 'title' },
            { label: 'Level', name: 'level', type: 'lookup', required: true, options: [{ value: 1, text: 'Level 1' }, { value: 2, text: 'Level 2' }, { value: 3, text: 'Level 3' }] }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.push(`/admin/learning/competencies/${result.id}`)
    this.context.modal.close()
  }

}

export default CompetenciesNew
