import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Section from './section'
import React from 'react'
import Page from './page'

class Design extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    components: PropTypes.object,
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
              { section.label || `Section ${ index }`}
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
    return [
      { label: 'Page', component: Page, props: this._getPage() },
      { label: 'Header', component: Section, props: this._getSection('header', 'Header') },
      { label: 'Body', component: Section, props: this._getSection('body', 'Body') },
      { label: 'Footer', component: Section, props: this._getSection('footer', 'Footer') }
    ]
  }

  _getPage() {
    const { cid, components, onPop, onPush, onUpdate } = this.props
    return {
      cid,
      components,
      onPop,
      onPush,
      onUpdate
    }
  }

  _getSection(code, label) {
    const { cid, components, onPop, onPush, onUpdate } = this.props
    return {
      cid,
      code,
      components,
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
  config: state.maha.designer[props.cid].config
})

export default connect(mapStateToProps)(Design)
