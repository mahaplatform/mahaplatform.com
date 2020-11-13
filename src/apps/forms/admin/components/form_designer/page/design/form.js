import FontFamilyToken from '@apps/automation/admin/tokens/fontfamily'
import * as options from '../../variables'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class Body extends React.Component {

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
      this.props.onUpdate('body', config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Form',
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
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color }
          ]
        }, {
          label: 'Button',
          fields: [
            { label: 'Text', name: 'button_text', type: 'textfield', defaultValue: config.button_text }
          ]
        }, {
          label: 'Text Style',
          fields: [
            { label: 'Font Family', name: 'p_font_family', type: 'dropdown', options: options.font_families, defaultValue: config.p_font_family, format: FontFamilyToken },
            { type: 'fields', fields: [
              { label: 'Font Size', name: 'p_font_size', type: 'dropdown', options: options.font_sizes, defaultValue: config.p_font_size },
              { label: 'Color', name: 'p_color', type: 'colorfield', defaultValue: config.p_color }
            ] },
            { type: 'fields', fields: [
              { label: 'Format', name: 'p_format', type: 'formatfield', defaultValue: config.p_format },
              { label: 'Alignment', name: 'p_text_align', type: 'alignmentfield', defaultValue: config.p_text_align }
            ] },
            { type: 'fields', fields: [
              { label: 'Line Height', name: 'p_line_height', type: 'dropdown', options: options.line_heights, defaultValue: config.p_line_height },
              { label: 'Letter Spacing', name: 'p_letter_spacing', type: 'dropdown', options: options.letter_spacing, defaultValue: config.p_letter_spacing }
            ] }
          ]
        },
        {
          label: 'Link Style',
          fields: [
            { type: 'fields', fields: [
              { label: 'Color', name: 'a_color', type: 'colorfield', defaultValue: config.a_color },
              { label: 'Format', name: 'a_format', type: 'formatfield', defaultValue: config.a_format }
            ] }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      background_color: null,
      button_text: 'Submit',
      p_font_family: null,
      p_color: null,
      p_format: [],
      p_text_align: 'left',
      p_line_height: null,
      p_letter_spacing: null,
      a_color: null,
      a_format: []
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
  config: state.forms.form_designer[props.cid].config.body
})

export default connect(mapStateToProps)(Body)
