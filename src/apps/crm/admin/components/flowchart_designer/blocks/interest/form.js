import { Button, ModalPanel, RadioGroup } from 'maha-admin'
import CheckboxesField from '../../../checkboxesfield'
import { actions } from './variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class AddInterest extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    topics: PropTypes.array,
    workflow: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    operator: null,
    value: null,
    data: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleOperator = this._handleOperator.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="flowchart-designer-form">
          <div className="flowchart-designer-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="flowchart-designer-form-body">
            <CheckboxesField { ...this._getCheckboxesField() } />
          </div>
          <div className="flowchart-designer-form-footer">
            <Button { ...this._getButton() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getButton() {
    return {
      label: 'New Topic',
      color: 'red'
    }
  }

  _getCheckboxesField() {
    return {
      endpoint: '/api/admin/crm/topics',
      value: 'id',
      text: 'title',
      defaultValue: [],
      onChange: this._handleUpdate
    }
  }

  _getPanel() {
    return {
      title: 'Add Interest',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getRadioGroup() {
    const { operator } = this.state
    return {
      defaultValue: operator || actions[0].value,
      options: actions,
      onChange: this._handleOperator
    }
  }

  _getTopicForm() {
    const { workflow } = this.props
    return {
      title: 'New Topic',
      method: 'post',
      action: `/api/admin/crm/programs/${workflow.program.id}/topics`,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a name', required: true }
          ]
        }
      ]
    }
  }

  _handleChange(config) {
    const { topics } = this.props
    const topic = _.find(topics, { id: config.topic_id })
    this.props.onChange({
      action: config.action,
      topic: topic ? {
        id: topic.id,
        title: topic.title
      } : null
    })
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleOperator(operator) {
    this.setState({ operator })
  }

  _handleUpdate(topics) {
    console.log(topics)
  }

}

export default AddInterest
