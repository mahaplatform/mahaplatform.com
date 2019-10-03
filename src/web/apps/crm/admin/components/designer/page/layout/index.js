import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Section from './section'
import React from 'react'

class Layout extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onAddSection: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onMoveSection: PropTypes.func,
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
          <Section key={`section_${index}`} { ...this._getSection(section, index) } />
        ))}
        <div className="designer-layout-section-add" onClick={ this._handleAddSection }>
          <div className="designer-layout-section-add-icon">
            <i className="fa fa-plus" />
          </div>
          <div className="designer-layout-section-add-label">
            Add Section
          </div>
        </div>
      </div>
    )
  }

  _getSection(section, index) {
    const { onDeleteSection, onMoveSection, onUpdate } = this.props
    return {
      index,
      section,
      onDeleteSection,
      onMoveSection,
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
      padding_top: 10,
      padding_bottom: 10,
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

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer.config
})

export default connect(mapStateToProps)(Layout)
