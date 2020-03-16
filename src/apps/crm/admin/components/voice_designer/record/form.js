import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Record extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
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

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Record',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
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

  _handleDone() {
    const { config } = this.state
    this.props.onDone(config)
  }

  _handleSubmit() {
    this.form.submit()
  }

}

export default Record
