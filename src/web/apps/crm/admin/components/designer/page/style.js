import PropTypes from 'prop-types'
import Section from './section'
import Mobile from './mobile'
import React from 'react'
import Page from './page'

class Style extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  sections = [
    { label: 'Page', code: 'page', component: Page, props: this._getSection('page','Page') },
    { label: 'Preheader', code: 'preheader', component: Section, props: this._getSection('preheader','Preheader')},
    { label: 'Header', code: 'header', component: Section, props: this._getSection('header','Header') },
    { label: 'Body', code: 'body', component: Section, props: this._getSection('body','Body') },
    { label: 'Footer', code: 'footer', component: Section, props: this._getSection('footer','Footer') },
    { label: 'Mobile', code: 'mobile', component: Mobile, props: this._getSection('mobile','Mobile') }
  ]

  render() {
    return (
      <div className="designer-page-sections">
        { this.sections.map((section, index) => (
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

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  _getSection(section, label) {
    const { config, onPop, onPush, onUpdate } = this.props
    return {
      config: config.design[section],
      label,
      section,
      onPop,
      onPush,
      onUpdate
    }
  }

  _handleChoose(index) {
    const section = this.sections[index]
    this.props.onPush(section.component, section.props)
  }

}

export default Style
