import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

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
              { section.label }
            </div>
            <div className="designer-layout-section-action" onClick={ this._handleEdit.bind(this, index) }>
              <i className="fa fa-pencil" />
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
    const { config } = this.props
    this.props.onAddSection({
      label: `Section ${config.sections.length + 1}`,
      background_color: null,
      background_image: null,
      border_top: null,
      border_bottom: null,
      padding_top: '10px',
      padding_bottom: '10px',
      text_font_family: null,
      text_font_size: null,
      text_color: null,
      text_text_align: null,
      text_line_height: null,
      link_color: null,
      link_bold: null,
      link_underline: null,
      blocks: []
    })
  }

  _handleDelete(index) {
    this.props.onDeleteSection(index)
  }

  _handleEdit(index) {
    this.props.onPush(Edit, this._getEdit(index))
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer.config
})

export default connect(mapStateToProps)(Layout)
