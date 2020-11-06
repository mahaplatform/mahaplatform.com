import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Profiles from './profiles'
import Photo from './photo'
import React from 'react'
import Edit from './edit'
import Cell from './cell'

class Account extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleCell = this._handleCell.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handlePhoto = this._handlePhoto.bind(this)
  _handleProfiles = this._handleProfiles.bind(this)


  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-security">
          <div className="maha-security-header">
            <i className="fa fa-fw fa-id-card" />
          </div>
          <div className="maha-security-body">
            <div className="maha-security-item" onClick={ this._handleEdit }>
              <div className="maha-security-item-label">
                <strong>Edit Account</strong><br />
                Edit your personal information
              </div>
              <div className="maha-security-item-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
            <div className="maha-security-item" onClick={ this._handleCell }>
              <div className="maha-security-item-label">
                <strong>Manage Cell Phone</strong><br />
                Manage your cell phone number
              </div>
              <div className="maha-security-item-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
            <div className="maha-security-item" onClick={ this._handlePhoto }>
              <div className="maha-security-item-label">
                <strong>Change Photo</strong><br />
                Change the photo we use to identify you
              </div>
              <div className="maha-security-item-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
            <div className="maha-security-item" onClick={ this._handleProfiles }>
              <div className="maha-security-item-label">
                <strong>Manage Profiles</strong><br />
                Configure access to third party profiles
              </div>
              <div className="maha-security-item-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      color: 'teal',
      title: 'Account',
      rightItems: [
        { label: 'Done', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleCell() {
    this.context.modal.push(<Cell />)
  }

  _handleEdit() {
    this.context.modal.push(<Edit />)
  }

  _handlePhoto() {
    this.context.modal.push(<Photo />)
  }

  _handleProfiles() {
    this.context.modal.push(<Profiles />)
  }

}

export default Account
