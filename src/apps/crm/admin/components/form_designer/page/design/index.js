import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Footer from './footer'
import Header from './header'
import React from 'react'
import Page from './page'
import Body from './body'

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
    return [
      { label: 'Page', code: 'page', component: Page, props: this._getSection('page') },
      { label: 'Header', code: 'header', component: Header, props: this._getSection('header') },
      { label: 'Body', code: 'body', component: Body, props: this._getSection('body') },
      { label: 'Footer', code: 'footer', component: Footer, props: this._getSection('footer') }
    ]
  }

  _getSection(section) {
    const { cid, components, onPop, onPush, onUpdate } = this.props
    return {
      cid,
      components,
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
  config: state.crm.form_designer[props.cid].config
})

export default connect(mapStateToProps)(Design)