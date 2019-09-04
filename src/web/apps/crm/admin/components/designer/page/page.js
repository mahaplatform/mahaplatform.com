import { font_size, letter_spacing, line_heights, fonts } from '../variables'
import { unflatten } from 'flat'
import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
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

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  _getForm() {
    return {
      title: 'Page',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      cancelText: <i className="fa fa-chevron-left" />,
      saveText: null,
      sections: [
        {
          fields: [
            { label: 'Background Color', name: 'background_color', type: 'colorfield' }
          ]
        },
        ...[1,2,3,4].map(number => ({
          label: `Heading ${number}`,
          fields: [
            { label: 'Font Family', name: `h${number}.font_family`, type: 'lookup', options: fonts },
            { label: 'Font Size', name: `h${number}.font_size`, type: 'lookup', options: font_size },
            { label: 'Color', name: `h${number}.color`, type: 'colorfield' },
            { label: 'Line Height', name: `h${number}.line_height`, type: 'lookup', options: line_heights },
            { label: 'Letter Spacing', name: `h${number}.letter_spacing`, type: 'lookup', options: letter_spacing }
          ]
        }))
      ]
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleChange(data) {
    this.props.onUpdate('design.page', unflatten(data))
  }

}

export default Page
