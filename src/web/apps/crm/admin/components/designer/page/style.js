import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Section from './section'
import React from 'react'
import Page from './page'

class Style extends React.Component {

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
    const sections = this._getSections()
    return (
      <div className="designer-page-sections">
        { sections.map((section, index) => (
          <div key={`section_${index}`} className="designer-page-section" onClick={ this._handleChoose.bind(this, index) }>
            <div className="designer-page-section-label">
              { section.label }
            </div>
            <div className="designer-page-section-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
        <div className="designer-page-section-label" onClick={ this._handleAddSection }>
          <span className="link">Add Section</span>
        </div>
      </div>
    )
  }

  _getSections() {
    const { config } = this.props
    return [
      { label: 'Page', code: 'page', component: Page, props: this._getPage() },
      ...config.sections.map((section, index) => ({
        label: section.label,
        component: Section,
        props: this._getSection(section.label, index)
      }))
    ]
  }

  _getPage() {
    const { onPop, onPush, onUpdate } = this.props
    return {
      onPop,
      onPush,
      onUpdate
    }
  }

  _getSection(label, index) {
    const { onDeleteSection, onPop, onPush, onUpdate } = this.props
    return {
      index,
      label,
      onDeleteSection,
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

  _handleChoose(index) {
    const sections = this._getSections()
    const section = sections[index]
    this.props.onPush(section.component, section.props)
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer.config
})

export default connect(mapStateToProps)(Style)
