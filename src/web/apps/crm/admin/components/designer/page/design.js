import PropTypes from 'prop-types'
import Preheader from './preheader'
import Footer from './footer'
import Header from './header'
import Body from './body'
import React from 'react'
import Page from './page'


class Design extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  sections = [
    { label: 'Page', code: 'page', component: Page, props: this._getSection() },
    { label: 'Preheader', code: 'preheader', component: Preheader, props: this._getSection()},
    { label: 'Header', code: 'header', component: Header, props: this._getSection() },
    { label: 'Body', code: 'body', component: Body, props: this._getSection() },
    { label: 'Footer', code: 'footer', component: Footer, props: this._getSection() }
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

  _getSection() {
    const { config, onPop, onPush, onUpdate } = this.props
    return {
      config,
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

export default Design
