import { Button, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Say extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
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
        ...this._getDefaults(),
        ...this.props.config || {}
      }
    })
  }

  _getDefaults() {
    return {
      voice: 'woman'
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Speak Text',
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
            { label: 'Message', type: 'segment', required: true, fields: [
              { name: 'voice', type: 'dropdown', options: [{ value: 'woman', text: 'Female Voice' },{ value: 'man', text: 'Male Voice' }], defaultValue: config.voice },
              { name: 'message', type: 'textarea', placeholder: 'Enter a message', required: true, defaultValue: config.message }
            ], after: <Button { ...this._getTokens() } /> }
          ]
        }
      ]
    }
  }

  _getTokens() {
    const { onTokens } = this.props
    return {
      label: 'You can use the these tokens',
      className: 'link',
      handler: onTokens
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

export default Say
