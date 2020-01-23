import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

const paddings = [
  { value: 0, text: 'None' },
  ...Array(20).fill(0).map((i,j) => ({
    value: j + 1,
    text: `${j + 1}px`
  }))
]

class Design extends React.Component {

  static contextTypes = {}

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleDone = this._handleDone.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      showHeader: false,
      onChange: this._handleChange,
      sections: [
        {
          fields: [
            { label: 'Page Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
            { label: 'Form Background Color', name: 'form_background_color', type: 'colorfield', defaultValue: config.form_background_color }
          ]
        },
        {
          label: 'Header',
          fields: [
            { label: 'Background Color', name: 'header_background_color', type: 'colorfield', defaultValue: config.header_background_color },
            { label: 'Image', name: 'header_image', type: 'filefield', defaultValue: config.header_image },
            { label: 'Text', name: 'header_text', type: 'htmlfield', defaultValue: config.header_text }
          ]
        },
        {
          label: 'Body',
          fields: [
            { label: 'Background Color', name: 'body_background_color', type: 'colorfield', defaultValue: config.body_background_color },
            { label: 'Padding', name: 'body_padding', type: 'lookup', options: paddings, defaultValue: config.body_padding }
          ]
        },
        {
          label: 'Footer',
          fields: [
            { label: 'Background Color', name: 'footer_background_color', type: 'colorfield', defaultValue: config.footer_background_color },
            { label: 'Padding', name: 'footer_body_padding', type: 'lookup', options: paddings, defaultValue: config.footer_body_padding },
            { label: 'Text', name: 'footer_text', type: 'htmlfield', defaultValue: config.footer_text }
          ]
        }
      ]
    }
  }

  _handleDone() {
    this.props.onPop()
  }

  _handleChange(data) {
    this.props.onUpdate('page', data)
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.form_designer[props.cid].config
})

export default connect(mapStateToProps)(Design)
