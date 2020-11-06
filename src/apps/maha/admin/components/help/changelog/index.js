import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Releases from './releases'
import React from 'react'

class Changelog extends React.Component {

  static contextTypes = {
    help: PropTypes.object
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Releases />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Changelog',
      color: 'green',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.context.help.pop()
  }

}

export default Changelog
