import { Container, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Lists extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    lists: PropTypes.array,
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
      title: 'Update Lists',
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
            { name: 'action', type: 'radiogroup', options: [{ value: 'add', text: 'Add to list' },{ value: 'remove', text: 'Remove from list'}], defaultValue: config.action },
            { label: 'List', name: 'list_id', type: 'lookup', prompt: 'Choose a list', endpoint: `/api/admin/crm/programs/${workflow.program.id}/lists`, value: 'id', text: 'title', form: this._getListForm() }
          ]
        }
      ]
    }
  }

  _getListForm() {
    const { workflow } = this.props
    return {
      title: 'New List',
      method: 'post',
      action: `/api/admin/crm/programs/${workflow.program.id}/lists`,
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
    const { lists } = this.props
    const list = _.find(lists, { id: config.list_id })
    this.props.onDone({
      ...config,
      list: list ? {
        id: list.id,
        title: list.title
      } : null
    })
  }

  _handleSubmit() {
    this.form.submit()
  }

}
const mapResources = (props, context) => ({
  lists: `/api/admin/crm/programs/${props.workflow.program.id}/lists`
})

export default Container(mapResources)(Lists)
