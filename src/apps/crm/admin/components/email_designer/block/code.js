import { columns, font_size, letter_spacing, line_heights, fonts } from '../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Code extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      title: 'Code Block',
      onCancel: this._handleDone,
      onChange: this._handleChange,
      cancelText: <i className="fa fa-chevron-left" />,
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { name: 'content', type: 'textarea', rows: 10, defaultValue: config.content}
          ]
        }
      ]
    }
  }

  _handleChange(data) {
    this.props.onUpdate(data)
  }

  _handleDone() {
    this.props.onDone()
  }


}

export default Code
