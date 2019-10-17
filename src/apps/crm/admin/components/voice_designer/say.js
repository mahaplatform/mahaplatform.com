import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Say extends React.PureComponent {

  static propTypes = {
    config: PropTypes.array,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this.getForm() } />
  }

  getForm() {
    return {
      title: 'Speak Text',
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
            { label: 'Voice', name: 'voice', type: 'lookup', options: [{ value: 'woman', text: 'Woman' },{ value: 'man', text: 'Man' }], defaultValue: 'woman' },
            { label: 'Message', name: 'message', type: 'textarea' }
          ]
        }
      ]
    }
  }

  _handleChange(config) {
    this.props.onChange(config)
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Say
