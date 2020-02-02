import FontFamilyToken from '../../../../tokens/fontfamily'
import AlignmentField from '../../../alignmentfield'
import FormatField from '../../../formatfield'
import ImageField from '../../../imagefield'
import * as options from '../../variables'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Cover extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleReset = this._handleReset.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { config } = this.state
    if(!_.isEqual(config, prevState.config)) {
      this.props.onUpdate('cover', config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Cover',
      onCancel: this._handleDone,
      onChange: this._handleChange,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      tabs : [
        {
          label: 'Content',
          sections: [
            {
              fields: [
                { label: 'Image', name: 'image', type: ImageField, defaultValue: config.image },
                { label: 'Caption', name: 'caption', type: 'htmlfield', headers: false, defaultValue: config.caption }
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              label: 'Image Style',
              fields: [
                { label: 'Position', name: 'position', type: 'dropdown', options: options.cover_positions, defaultValue: config.position },
                { label: 'Justification', name: 'image_justification', type: 'dropdown', options: options.cover_justifications, defaultValue: config.image_justification },
                { label: 'Width', name: 'width', type: 'dropdown', options: options.cover_widths, defaultValue: config.width }
              ]
            }, {
              label: 'Caption Style',
              fields: [
                { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
                { label: 'Font Family', name: 'font_family', type: 'dropdown', options: options.font_families, defaultValue: config.font_family, format: FontFamilyToken },
                { type: 'fields', fields: [
                  { label: 'Font Size', name: 'font_size', type: 'dropdown', options: options.font_sizes, defaultValue: config.font_size },
                  { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color }
                ] },
                { type: 'fields', fields: [
                  { label: 'Format', name: 'format', type: FormatField, defaultValue: config.format },
                  { label: 'Alignment', name: 'text_align', type: AlignmentField, defaultValue: config.text_align }
                ] },
                { type: 'fields', fields: [
                  { label: 'Line Height', name: 'line_height', type: 'dropdown', options: options.line_heights, defaultValue: config.line_height },
                  { label: 'Letter Spacing', name: 'letter_spacing', type: 'dropdown', options: options.letter_spacing, defaultValue: config.letter_spacing }
                ] }

              ]
            }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      image: null,
      image_justification: 'center',
      position: 0,
      width: 1,
      caption: null,
      background_color: '#000000',
      font_family: null,
      font_size: null,
      color: '#FFFFFF',
      format: [],
      text_align: 'left',
      line_height: null,
      letter_spacing: null
    }
  }

  _handleChange(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

  _handleDone() {
    this.props.onPop()
  }

  _handleReset() {
    this.setState({
      config: this._getDefault()
    })
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.form_designer[props.cid].config.cover
})

export default connect(mapStateToProps)(Cover)
