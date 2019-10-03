import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import Header from './header'
import React from 'react'
import _ from 'lodash'

class Designer extends React.Component {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.object,
    changes: PropTypes.number,
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    deviceIndex: PropTypes.number,
    scaleIndex: PropTypes.number,
    orientationIndex: PropTypes.number,
    onAdd: PropTypes.func,
    onAddSection: PropTypes.func,
    onChange: PropTypes.func,
    onChangeViewport: PropTypes.func,
    onClone: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onEdit: PropTypes.func,
    onMoveSection: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  pasteur = null

  render() {
    return (
      <div className="designer">
        <div className="designer-main">
          <Header { ...this._getHeader() } />
          <Canvas { ...this._getCanvas() } />
        </div>
        <Sidebar { ...this._getSidebar() } />
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue || this._getDefault()
    this.props.onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { config } = this.props
    if(!_.isEqual(config, prevProps.config)) {
      this.props.onChange(config)
    }
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
    const { deviceIndex, orientationIndex, scaleIndex, onChangeViewport } = this.props
    return {
      deviceIndex,
      orientationIndex,
      scaleIndex,
      onChange: onChangeViewport
    }
  }

  _getCanvas() {
    const { active, config, deviceIndex, orientationIndex, scaleIndex, onAdd, onClone, onEdit, onRemove, onUpdate } = this.props
    return {
      active,
      config,
      deviceIndex,
      orientationIndex,
      scaleIndex,
      onAdd,
      onClone,
      onEdit,
      onRemove,
      onUpdate
    }
  }

  _getSidebar() {
    const { active, config, onAddSection, onDeleteSection, onMoveSection, onEdit, onUpdate } = this.props
    return {
      active,
      config,
      onAddSection,
      onDeleteSection,
      onMoveSection,
      onEdit,
      onUpdate
    }
  }

}

export default Designer
