import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

import Explorer from '../explorer'

class Drivebar extends React.Component {

  static contextTypes = {
    portal: PropTypes.object
  }

  static propTypes = {
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() } >
        <Explorer />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Drive',
      leftItems: [
        { icon: 'remove', handler: this._handleClose }
      ]
    }
  }

  _handleClose() {
    this.context.portal.closeSidebar()
  }

}

export default Drivebar
