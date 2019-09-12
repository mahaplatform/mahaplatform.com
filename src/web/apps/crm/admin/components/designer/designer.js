import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Preview from './preview'
import { types } from './types'
import Header from './header'
import React from 'react'
import _ from 'lodash'

class Designer extends React.Component {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    deviceIndex: PropTypes.number,
    editable: PropTypes.bool,
    orientationIndex: PropTypes.number,
    onAdd: PropTypes.func,
    onAddSection: PropTypes.func,
    onChange: PropTypes.func,
    onChangeViewport: PropTypes.func,
    onClone: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onEdit: PropTypes.func,
    onEditable: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleMessage = this._handleMessage.bind(this)

  render() {
    return (
      <div className="designer">
        <div className="designer-main">
          <Header { ...this._getHeader() } />
          <Preview { ...this._getPreview() } />
        </div>
        <Sidebar { ...this._getSidebar() } />
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue || this._getDefault()
    this.props.onSet(defaultValue)
    window.addEventListener('message', this._handleMessage, false)
  }

  componentDidUpdate(prevProps) {
    const { config } = this.props
    if(!_.isEqual(config, prevProps.config)) {
      this.props.onChange(config)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this._handleMessage, false)
  }

  _getDefault() {
    return {
      page: {
        background_color: null,
        border_top: null,
        email_background_color: null,
        email_border: null,
        h1_font_family: 'Arial, Helvetica, sans-serif',
        h1_font_size: '28px',
        h1_color: '#222222',
        h1_format: ['bold'],
        h1_text_align: false,
        h1_line_height: 1,
        h1_letter_spacing: '0px',
        h2_font_family: 'Arial, Helvetica, sans-serif',
        h2_font_size: '24px',
        h2_color: '#222222',
        h2_format: ['bold'],
        h2_text_align: false,
        h2_line_height: 1,
        h2_letter_spacing: '0px',
        h3_font_family: 'Arial, Helvetica, sans-serif',
        h3_font_size: '22px',
        h3_color: '#222222',
        h3_format: ['bold'],
        h3_text_align: false,
        h3_line_height: 1,
        h3_letter_spacing: '0px',
        h4_font_family: 'Arial, Helvetica, sans-serif',
        h4_font_size: '20px',
        h4_color: '#222222',
        h4_format: ['bold'],
        h4_text_align: false,
        h4_line_height: 1,
        h4_letter_spacing: '0px',
        p_font_family: 'Arial, Helvetica, sans-serif',
        p_font_size: '18px',
        p_color: '#222222',
        p_format: [],
        p_text_align: false,
        p_line_height: 1.5,
        p_letter_spacing: '0px'
      },
      sections: []
    }
  }

  _getHeader() {
    const { deviceIndex, orientationIndex, onChangeViewport } = this.props
    return {
      deviceIndex,
      orientationIndex,
      onChange: onChangeViewport
    }
  }

  _getPreview() {
    const { active, config, deviceIndex, editable, orientationIndex } = this.props
    return {
      active,
      config,
      deviceIndex,
      editable,
      orientationIndex
    }
  }

  _getSidebar() {
    const { active, config, onAddSection, onDeleteSection, onEdit, onUpdate } = this.props
    return {
      active,
      config,
      onAddSection,
      onDeleteSection,
      onEdit,
      onUpdate
    }
  }

  _handleMessage(e) {
    const message = e.data
    if(message.target !== 'designer') return
    if(message.action === 'add') this._handleAdd(message.data)
    if(message.action === 'clone') this._handleClone(message.data)
    if(message.action === 'edit') this._handleEdit(message.data)
    if(message.action === 'remove') this._handleRemove(message.data)
  }

  _handleAdd({ section, type, index }) {
    const content_type = _.find(types, { type })
    this.props.onAdd(section, index, {
      type: content_type.type,
      ...content_type.config
    })
  }

  _handleClone({ section, block }) {
    this.props.onClone(section, block)
  }

  _handleEdit({ section, block }) {
    this.props.onEdit(section, block)
  }

  _handleRemove({ section, block }) {
    this.props.onRemove(section, block)
  }

}

export default Designer
