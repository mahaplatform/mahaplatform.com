import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import React from 'react'

class Program extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    channels: PropTypes.array,
    program: PropTypes.object
  }

  _handleChannels = this._handleChannels.bind(this)

  render() {
    const { program } = this.props
    return (
      <div className="crm-contact-properties-program">
        <div className="crm-contact-properties-header" onClick={ this._handleChannels }>
          <div className="crm-contact-properties-header-logo">
            <Logo team={ program } width="24" />
          </div>
          <div className="crm-contact-properties-header-title">
            { program.title }
          </div>
          <div className="crm-contact-properties-header-proceed">
            <i className="fa fa-chevron-right" />
          </div>
        </div>
      </div>
    )
  }

  _handleChannels() {
    const { contact, program } = this.props
    this.context.router.history.push(`/admin/crm/contacts/${contact.id}/channels/programs/${program.id}`)
  }

}

export default Program
