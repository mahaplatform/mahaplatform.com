import { Container, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class RemoveInterest extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    topics: PropTypes.array,
    program: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, topics } = this.props
    return {
      title: 'Remove Interest',
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Topic', name: 'topic_id', type: 'lookup', options: topics, value: 'id', text: 'title', required: true, defaultValue: _.get(config, 'topic.id') }
          ]
        }
      ]
    }
  }

  _handleChange(config) {
    const { topics } = this.props
    const topic = _.find(topics, { id: config.topic_id })
    this.props.onChange({
      topic: topic ? {
        id: topic.id,
        title: topic.title
      } : null
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

const mapResources = (props, context) => ({
  topics: `/api/admin/crm/programs/${props.workflow.program.id}/topics`
})

export default Container(mapResources)(RemoveInterest)
