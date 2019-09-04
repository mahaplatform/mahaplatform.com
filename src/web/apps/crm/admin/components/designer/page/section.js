import { font_size, letter_spacing, line_heights, fonts } from '../variables'
import { unflatten } from 'flat'
import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Preheader extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.string,
    label: PropTypes.string,
    section: PropTypes.object,
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

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  _getForm() {
    const { label } = this.props
    return {
      title: label,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      cancelText: <i className="fa fa-chevron-left" />,
      saveText: null,
      sections: [
        {
          fields: [
            { label: 'Background Color', name: 'background_color', type: 'colorfield' },
            { label: 'Padding Top', name: 'padding_top', type: 'textfield' },
            { label: 'Padding Bottom', name: 'padding_bottom', type: 'textfield' }
          ]
        },{
          label: 'Text',
          fields: [
            { label: 'Font Family', name: 'font_family', type: 'lookup', options: fonts },
            { label: 'Font Size', name: 'font_size', type: 'lookup', options: font_size },
            { label: 'Color', name: 'color', type: 'colorfield' },
            { label: 'Line Height', name: 'line_height', type: 'lookup', options: line_heights },
            { label: 'Letter Spacing', name: 'letter_spacing', type: 'lookup', options: letter_spacing }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleChange(data) {
    const { section } = this.props
    this.props.onUpdate(`design.${section}`, unflatten(data))
  }

}

export default Preheader
