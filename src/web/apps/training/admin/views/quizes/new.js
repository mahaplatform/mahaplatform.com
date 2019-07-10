import Questions from '../../components/questions'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    quizable_type: PropTypes.string,
    quizable_id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { quizable_type, quizable_id } = this.props
    return {
      title: 'New Quiz',
      method: 'post',
      action: `/api/admin/training/${quizable_type}/${quizable_id}/quizes`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Questions', name: 'questions', type: Questions, required: true },
            { label: 'Passing Score', name: 'passing_score', type: 'numberfield', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.push(`/admin/training/quizes/${result.id}`)
    this.context.modal.close()
  }

}

export default New
