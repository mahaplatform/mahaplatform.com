import OrganizerToken from '../../tokens/organizer'
import { ModalPanel, Search } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Chooser extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Search { ...this._getSearch() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Organizer',
      buttons: [
        { label: 'Add New', color: 'red', handler: this._handleNew }
      ],
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getSearch() {
    return {
      prompt: 'Search organizers',
      endpoint: '/api/admin/events/organizers',
      format: OrganizerToken,
      onChange: this._handleChoose
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(organizer) {
    this.props.onChoose(organizer)
  }

  _handleNew() {

  }

}

export default Chooser
