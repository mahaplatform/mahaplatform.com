import AlignmentField from '../../alignmentfield'
import FormatField from '../../formatfield'
import * as options from '../variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Text extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

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
      this.props.onUpdate(config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Text Block',
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      tabs: [
        {
          label: 'Content',
          sections: [
            {
              fields: [
                ...new Array(config.columns).fill(0).map((i, index) => {
                  return { name: `content_${index}`, type: 'htmlfield', defaultValue: config[`content_${index}`] }
                })
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              label: 'Text Style',
              fields: [
                { label: 'Font Family', name: 'font_family', type: 'fontfamilyfield', defaultValue: config.font_family },
                { type: 'fields', fields: [
                  { label: 'Font Size', name: 'font_size', type: 'lookup', options: options.font_size, defaultValue: config.font_size },
                  { label: 'Color', name: 'color', type: 'colorfield', defaultValue: config.color }
                ] },
                { type: 'fields', fields: [
                  { label: 'Format', name: 'format', type: FormatField, defaultValue: config.format },
                  { label: 'Alignment', name: 'text_align', type: AlignmentField, defaultValue: config.alignment }
                ] },
                { type: 'fields', fields: [
                  { label: 'Line Height', name: 'line_height', type: 'lookup', options: options.line_heights, defaultValue: config.line_height },
                  { label: 'Letter Spacing', name: 'letter_spacing', type: 'lookup', options: options.letter_spacing, defaultValue: config.letter_spacing }
                ] }
              ]
            }
          ]
        }, {
          label: 'Settings',
          sections: [
            {
              fields: [
                { label: 'Number of Columns', name: 'columns', type: 'lookup', options: options.columns, defaultValue: config.columns },
                { label: 'Column Split', name: 'split', type: 'lookup', options: options.splits, defaultValue: config.split }
              ]
            }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      columns: 1,
      split: [6,6],
      content_0: '<p>Messenger bag portland adaptogen food truck pabst, la croix pug vinyl mumblecore chartreuse. Art party schlitz portland, try-hard semiotics tumblr green juice gentrify letterpress tilde gochujang whatever helvetica tote bag. Locavore quinoa man braid cred selvage chambray. Post-ironic everyday carry kale chips umami woke polaroid, meggings organic pork belly air plant.</p>',
      content_1: '<p>Messenger bag portland adaptogen food truck pabst, la croix pug vinyl mumblecore chartreuse. Art party schlitz portland, try-hard semiotics tumblr green juice gentrify letterpress tilde gochujang whatever helvetica tote bag. Locavore quinoa man braid cred selvage chambray. Post-ironic everyday carry kale chips umami woke polaroid, meggings organic pork belly air plant.</p>',
      font_family: null,
      font_size: null,
      color: null,
      format: null,
      alignment: null,
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
    this.props.onDone()
  }

}

export default Text
