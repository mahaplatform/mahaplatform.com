import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Lists extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    program: PropTypes.object,
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
    const { program } = this.props
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
            { label: 'List', name: 'list_id', type: 'lookup', required: true, prompt: 'Choose a list', endpoint: `/api/admin/crm/programs/${program.id}/lists`, value: 'id', text: 'title', form: this._getListForm(), defaultValue: config.list_id }
          ]
        }
      ]
    }
  }

  _getListForm() {
    const { program } = this.props
    return {
      title: 'New List',
      method: 'post',
      action: `/api/admin/crm/programs/${program.id}/lists`,
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
    this.props.onDone(config)
  }

  _handleSubmit() {
    this.form.submit()
  }

}

export default Lists
