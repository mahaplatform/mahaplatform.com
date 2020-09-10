import { ModalPanel } from 'maha-admin'
import Changelog from './changelog'
import PropTypes from 'prop-types'
import Articles from './articles'
import React from 'react'

const sections = [
  { title: 'Articles', description: 'Step by step how-to instructions', component: Articles },
  { title: 'Changelog', description: 'History of updates to the platform', component: Changelog },
  { title: 'Uptime', description: 'Monitor of platform availability', link: 'https://status.mahaplatform.com' }
]

class Help extends React.Component {

  static contextTypes = {
    help: PropTypes.object,
    host: PropTypes.object
  }

  static propTypes = {}

  _handleClose = this._handleClose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-results">
          { sections.map((section, index) => (
            <div className="maha-result" key={`section_${index}`} onClick={ this._handleClick.bind(this, section) }>
              <div className="maha-result-details">
                <strong>{ section.title }</strong><br />
                <span>{ section.description }</span>
              </div>
              <div className="maha-result-proceed">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Help Center',
      color: 'green',
      leftItems: [
        { icon: 'remove', handler: this._handleClose }
      ]
    }
  }

  _handleClick(section) {
    if(section.link) return this.context.host.openWindow(section.link)
    this.context.help.push(section.component, {})
  }

  _handleClose() {
    this.context.help.toggle()
  }

}

export default Help
