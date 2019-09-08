import { TextField } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Layout extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onAddSection: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAddSection = this._handleAddSection.bind(this)

  render() {
    const { config } = this.props
    return (
      <div className="designer-layout">
        { config.sections.map((section, index) => (
          <div key={`section_${index}`} className="designer-layout-section">
            <div className="designer-layout-section-handle">
              <i className="fa fa-bars" />
            </div>
            <div className="designer-layout-section-label">
              <TextField { ...this._getTextField(section, index) } />
            </div>
            <div className="designer-layout-section-action" onClick={ this._handleDelete.bind(this, index) }>
              <i className="fa fa-trash-o" />
            </div>
          </div>
        ))}
        <div className="designer-page-section-label" onClick={ this._handleAddSection }>
          <span className="link">Add Section</span>
        </div>
      </div>
    )
  }

  _getTextField(section, index) {
    return {
      defaultValue: section.label,
      placeholder: 'Enter a name',
      onChange: this._handleRename.bind(this, section, index)
    }
  }

  _getEdit(index) {
    const { onPop, onPush, onUpdate } = this.props
    return {
      index,
      onPop,
      onPush,
      onUpdate
    }
  }

  _handleAddSection() {
    this.props.onAddSection({
      label: null,
      background_color: null,
      background_image: null,
      border_top: null,
      border_bottom: null,
      padding_top: '10px',
      padding_bottom: '10px',
      font_family: null,
      font_size: null,
      color: null,
      text_align: null,
      line_height: null,
      link_color: null,
      link_bold: null,
      link_underline: null,
      blocks: []
    })
  }

  _handleDelete(index) {
    this.props.onDeleteSection(index)
  }

  _handleRename(section, index, label) {
    this.props.onUpdate(`sections[${index}]`, {
      section,
      label
    })
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer.config
})

export default connect(mapStateToProps)(Layout)
