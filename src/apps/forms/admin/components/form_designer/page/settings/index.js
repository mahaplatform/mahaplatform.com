import Confirmation from './confirmation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Security from './security'
import Limits from './limits'
import Rules from './rules'
import React from 'react'
import SEO from './seo'

class Settings extends React.Component {

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
      { label: 'Confirmation Page', component: Confirmation, props: this._getSection() },
      { label: 'Limits', component: Limits, props: this._getSection() },
      { label: 'Rules', component: Rules, props: this._getSection() },
      { label: 'SEO', component: SEO, props: this._getSection() },
      { label: 'Security', component: Security, props: this._getSection() }
    ]
  }

  _getSection() {
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
  config: state.forms.form_designer[props.cid].config
})

export default connect(mapStateToProps)(Settings)
