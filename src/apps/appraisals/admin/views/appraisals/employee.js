import { employee } from './fields'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    appraisal: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  state = {}

  render() {
    return <Form { ...this._getForm() } />
  }

  _getPositionDescription() {
    const question = _.find(employee, { name: 'employee_position_description' })
    const items = [
      {
        label: question.label,
        instructions: question.instructions,
        name: `${question.name}_updated`,
        type: 'radiogroup',
        options: [
          { value: true, text: 'Yes' },
          { value: false, text: 'No' }
        ]
      }
    ]
    if(this.state[`${question.name}_updated`] === false) {
      items.push({
        name: `${question.name}_comments`,
        required: true,
        type: 'textarea',
        placeholder: 'Enter a comment'
      })
    }
    return items
  }

  _getQuestion(name) {
    const question = _.find(employee, { name })
    return [
      {
        label: question.label,
        instructions: question.instructions,
        name: question.name,
        type: 'textarea',
        placeholder: 'Enter your answer'
      }
    ]
  }

  _getForm() {
    const { appraisal } = this.props
    return {
      title: 'Employee Appraisal',
      method: 'patch',
      endpoint: `/api/admin/appraisals/appraisals/${appraisal.id}/edit`,
      action: `/api/admin/appraisals/appraisals/${appraisal.id}`,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            ...this._getPositionDescription()
          ]
        }, {
          label: 'Self Review',
          fields: [
            ...this._getQuestion('accomplishments'),
            ...this._getQuestion('challenges'),
            ...this._getQuestion('job_goals'),
            ...this._getQuestion('development_goals'),
            ...this._getQuestion('additional_comments')
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(current) {
    this.setState(current)
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default New
