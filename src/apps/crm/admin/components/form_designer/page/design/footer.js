import FontFamilyToken from '../../../../tokens/fontfamily'
import AlignmentField from '../../../alignmentfield'
import FormatField from '../../../formatfield'
import * as options from '../../variables'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Footer extends React.Component {

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
      this.props.onUpdate('footer', config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Footer',
      onCancel: this._handleDone,
      onChange: this._handleChange,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color },
            { label: 'Text', name: 'text', type: 'htmlfield', defaultValue: config.text }
          ]
        }, {
          label: 'Text Style',
          fields: [
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
  }

  _getDefault() {
    return {
      background_color: null,
      text: null,
      font_family: null,
      font_size: null,
      color: null,
      format: null,
      text_align: null,
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
  config: state.crm.form_designer[props.cid].config.footer
})

export default connect(mapStateToProps)(Footer)
