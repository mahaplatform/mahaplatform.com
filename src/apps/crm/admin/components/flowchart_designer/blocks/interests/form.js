import { Container, ModalPanel, RadioGroup, Search } from 'maha-admin'
import { actions } from './variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Interests extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    topics: PropTypes.array,
    workflow: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleAction = this._handleAction.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="flowchart-designer-form">
          <div className="flowchart-designer-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="flowchart-designer-form-body">
            <Search { ...this._getSearch() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  constructor(props) {
    super(props)
    const { config } = props
    this.state = {
      action: config ? config.action : null,
      topic: config ? config.topic : null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { action, topic } = this.state
    if(action !== prevState.action) {
      this._handleChange()
    }
    if(!_.isEqual(topic, prevState.topic)) {
      this._handleChange()
    }
  }

  _getPanel() {
    return {
      title: 'Update Interests',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleDone }
      ],
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ]
    }
  }

  _getRadioGroup() {
    const { action } = this.state
    return {
      defaultValue: action || actions[0].value,
      options: actions,
      onChange: this._handleAction
    }
  }

  _getSearch() {
    const { topics } = this.props
    const { topic } = this.state
    return {
      options: topics,
      multiple: false,
      text: 'title',
      search: false,
      value: 'id',
      defaultValue: topic ? topic.id : null,
      onChange: this._handleUpdate
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
    const { action, topic } = this.state
    const value = topic ? { action, topic } : {}
    this.props.onChange(value)
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleAction(action) {
    this.setState({ action })
  }

  _handleUpdate(id) {
    const { topics } = this.props
    if(!id) return this.setState({ topic: null })
    const topic = _.find(topics, { id })
    this.setState({
      topic: {
        id: topic.id,
        title: topic.title
      }
    })
  }

}

const mapResources = (props, context) => ({
  topics: `/api/admin/crm/programs/${props.workflow.program.id}/topics`
})

export default Container(mapResources)(Interests)
