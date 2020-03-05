import { Container, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Topics extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    topics: PropTypes.array,
    workflow: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  form = null

  state = {
    config: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config || {}
      }
    })
  }

  _getDefault() {
    return {
      action: 'add'
    }
  }

  _getForm() {
    const { workflow } = this.props
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Update Interests',
      onChange: this._handleChange,
      onCancel: this._handleCancel,
      onSubmit: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { name: 'action', type: 'radiogroup', options: [{ value: 'add', text: 'Add to topic' },{ value: 'remove', text: 'Remove from topic'}], defaultValue: config.action },
            { label: 'Topic', name: 'topic_id', type: 'lookup', prompt: 'Choose a topic', endpoint: `/api/admin/crm/programs/${workflow.program.id}/topics`, value: 'id', text: 'title', form: this._getTopicForm() }
          ]
        }
      ]
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
            { label: 'Title', name: 'title', type: 'textfield' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone(config) {
    const { topics } = this.props
    const topic = _.find(topics, { id: config.topic_id })
    this.props.onDone({
      ...config,
      topic: topic ? {
        id: topic.id,
        title: topic.title
      } : null
    })
  }

  _handleSubmit() {
    this.form.submit()
  }

}
const mapResources = (props, context) => ({
  topics: `/api/admin/crm/programs/${props.workflow.program.id}/topics`
})

export default Container(mapResources)(Topics)
