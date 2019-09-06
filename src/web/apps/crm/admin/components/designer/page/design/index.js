import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Section from './section'
import React from 'react'
import Page from './page'

class Style extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

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
    const { onPop, onPush, onUpdate } = this.props
    return {
      index,
      label,
      onPop,
      onPush,
      onUpdate
    }
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
