import { font_size, letter_spacing, line_heights, fonts } from '../variables'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

const block_types = [
  { text: 'Heading 1', value: 'h1' },
  { text: 'Heading 2', value: 'h2' },
  { text: 'Heading 3', value: 'h3' },
  { text: 'Heading 4', value: 'h4' },
  { text: 'Paragraph', value: 'p' }
]

class Page extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      title: 'Page',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      cancelText: <i className="fa fa-chevron-left" />,
      saveText: null,
      sections: [
        {
          fields: [
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color }
          ]
        },
        ...block_types.map(({ value, text }) => ({
          label: text,
          fields: [
            { label: 'Font Family', name: `${value}_font_family`, type: 'lookup', options: fonts, defaultValue: config[`${value}_font_family`] },
            { label: 'Font Size', name: `${value}_font_size`, type: 'lookup', options: font_size, defaultValue: config[`${value}_font_size`] },
            { label: 'Color', name: `${value}_color`, type: 'colorfield', defaultValue: config[`${value}_color`] },
            { label: 'Line Height', name: `${value}_line_height`, type: 'lookup', options: line_heights, defaultValue: config[`${value}_line_height`] },
            { label: 'Letter Spacing', name: `${value}_letter_spacing`, type: 'lookup', options: letter_spacing, defaultValue: config[`${value}_letter_spacing`] }
          ]
        }))
      ]
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleChange(data) {
    this.props.onUpdate('page.config', data)
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer.config.page.config
})

export default connect(mapStateToProps)(Page)
