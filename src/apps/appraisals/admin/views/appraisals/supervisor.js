import Responsibilities from '../../components/responsibilities'
import { supervisor } from './fields'
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

  _getQuestion(name) {
    const question = _.find(supervisor, { name })
    return {
      label: question.label,
      instructions: question.instructions,
      name: question.name,
      type: 'textarea',
      placeholder: 'Enter your answer'
    }
  }

  _getPositionDescription() {
    const question = _.find(supervisor, { name: 'supervisor_position_description' })
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

  _getRating(name) {
    const rating = _.find(supervisor, { name })
    return [
      {
        label: rating.label,
        instructions: rating.instructions,
        name: `${rating.name}_rating`,
        type: 'radiogroup',
        options: [
          ...!rating.required ? [{ value: 0, text: 'Not Applicable' }] : [],
          { value: 1, text: 'Exceeds Expectations' },
          { value: 2, text: 'Meets Expectations' },
          { value: 3, text: 'Does Not Meet Expectations' }
        ]
      },{
        name: `${rating.name}_comments`,
        required: this.state[`${rating.name}_rating`] && this.state[`${rating.name}_rating`] === 3,
        type: 'textarea',
        placeholder: 'Enter any comments for development'
      }
    ]
  }

  _getForm() {
    const { appraisal } = this.props
    return {
      title: 'Supervisor Appraisal',
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
          label: 'Job Responsibilities',
          fields: [
            { name: 'responsibilities', type: Responsibilities }
          ]
        }, {
          label: 'General Expectations',
          fields: [
            ...this._getRating('documentation'),
            ...this._getRating('attendance')
          ]
        }, {
          label: 'Skills for Success',
          fields: [
            ...this._getRating('health_safety'),
            ...this._getRating('inclusiveness'),
            ...this._getRating('adaptability'),
            ...this._getRating('self_development'),
            ...this._getRating('communication'),
            ...this._getRating('teamwork'),
            ...this._getRating('service_minded'),
            ...this._getRating('stewardship'),
            ...this._getRating('motivation')
          ]
        }, {
          label: 'Supervisory Skills',
          fields: [
            ...this._getRating('employee_communication'),
            ...this._getRating('delegation'),
            ...this._getRating('recruitment_retention')
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
