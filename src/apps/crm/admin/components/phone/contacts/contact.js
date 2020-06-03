import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Contact extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    contact: PropTypes.object,
    onPop: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    const { contact } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-contact">
          { contact.display_name }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Contact',
      color: 'violet',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onPop()
  }

}

export default Contact
