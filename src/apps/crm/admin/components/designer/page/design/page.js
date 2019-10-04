import { block_types, font_size, letter_spacing, line_heights, fonts } from '../../variables'
import AlignmentField from '../../../alignmentfield'
import FormatField from '../../../formatfield'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Page extends React.Component {

  static contextTypes = {}

  static propTypes = {
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
      title: 'Page',
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
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
            { label: 'Top Border', name: 'border_top', type: 'textfield', defaultValue: config.border_top },
            { label: 'Padding', name: 'padding', type: 'textfield', defaultValue: config.padding },
            { label: 'Email Background Color', name: 'email_background_color', type: 'colorfield', defaultValue: config.email_background_color },
            { label: 'Email Border', name: 'email_border', type: 'textfield', defaultValue: config.email_border }
          ]
        },
        ...block_types.map(({ value, text }) => ({
          label: text,
          fields: [
            { label: 'Font Family', name: 'font_family', type: 'fontfamilyfield', defaultValue: config[`${value}_font_family`] },
            { type: 'fields', fields: [
              { label: 'Font Size', name: `${value}_font_size`, type: 'lookup', options: font_size, defaultValue: config[`${value}_font_size`] },
              { label: 'Color', name: `${value}_color`, type: 'colorfield', defaultValue: config[`${value}_color`] }
            ] },
            { type: 'fields', fields: [
              { label: 'Format', name: `${value}_format`, type: FormatField, defaultValue: config[`${value}_format`] },
              { label: 'Alignment', name: `${value}_text_align`, type: AlignmentField, defaultValue: config[`${value}_text_align`] }
            ] },
            { type: 'fields', fields: [
              { label: 'Line Height', name: `${value}_line_height`, type: 'lookup', options: line_heights, defaultValue: config[`${value}_line_height`] },
              { label: 'Letter Spacing', name: `${value}_letter_spacing`, type: 'lookup', options: letter_spacing, defaultValue: config[`${value}_letter_spacing`] }
            ] }
          ]
        }))
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
  config: state.crm.designer.config.page
})

export default connect(mapStateToProps)(Page)
