import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import OmniSearch from '../components/omnisearch'
import React from 'react'

class SearchPanel extends React.Component {

  static contextTypes = {
    portal: PropTypes.object
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <OmniSearch { ...this.props }/>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Search',
      leftItems: [
        { icon: 'remove', handler: this._handleClose }
      ]
    }
  }

  _handleClose() {
    this.context.portal.closeSidebar()
  }

}

export default SearchPanel
