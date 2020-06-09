import { Audit, Comments, Container, List, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Button from '../button'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Voicemail extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    voicemail: PropTypes.object,
    onCall: PropTypes.func,
    onPop: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handlePlay = this._handlePlay.bind(this)

  render() {
    const buttons = this._getButtons()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-voicemail">
          <div className="maha-phone-voicemail-header">
            <div className="maha-phone-voicemail-player" onClick={ this._handlePlay }>
              <i className="fa fa-play" />
            </div>
            <div className="maha-phone-actions" >
              { buttons.map((button, index) => (
                <div className="maha-phone-action" key={`action_${index}`}>
                  <Button { ...button } />
                </div>
              ))}
            </div>
          </div>
          <div className="maha-phone-voicemail-body">
            <List { ...this._getList() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getButtons() {
    return [
      { icon: 'phone', label: 'call back', handler: this._handleCall },
      { icon: 'envelope-open', label: 'mark read', handler: () => {} },
      { icon: 'check', label: 'mark handled', handler: () => {} }
    ]
  }

  _getDuration(duration) {
    const pad = (value) => _.padStart(value, 2, 0)
    const minutes = Math.floor(duration / 60)
    const seconds = (duration  - (minutes * 60)) % 60
    const parts = [ pad(minutes), pad(seconds) ]
    return parts.join(':')
  }

  _getList() {
    const { voicemail } = this.props
    const audits = []
    return {
      items: [
        { label: 'Contact', content: voicemail.contact.display_name },
        { label: 'Date', content: this._getTimestamp(voicemail) },
        { label: 'Time', content: moment(voicemail.created_at).format('h:mmA') },
        { label: 'Duration', content: this._getDuration(voicemail.duration) },
        { component: <Audit entries={ audits } /> }
      ],
      footer: <Comments entity={`crm_workflow_recordings/${voicemail.id}`} />
    }
  }

  _getPanel() {
    return {
      title: 'Voicemail',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getTimestamp(call) {
    const today = moment().startOf('day')
    const yesterday = moment().subtract(1, 'day').startOf('day')
    const created_at = moment(call.created_at)
    if(today.format('YYMMDD') === created_at.format('YYMMDD')) return 'Today'
    if(yesterday.format('YYMMDD') === created_at.format('YYMMDD')) return 'Yesterday'
    if(today.diff(created_at, 'days') < 7) return created_at.format('dddd')
    return created_at.format('MM/DD/YY')
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleCall() {
    const { voicemail, program } = this.props
    this.props.onCall({
      program,
      phone_number: {
        id: voicemail.contact.phone_id
      },
      to: voicemail.contact.phone
    })
  }

  _handlePlay() {
    const { voicemail } = this.props
    const audio = new Audio(voicemail.asset.signed_url)
    audio.play()
  }

}

const mapResources = (props, context) => ({
  voicemail: `/api/admin/crm/programs/${props.program.id}/voicemails/${props.voicemail_id}`
})

export default Container(mapResources)(Voicemail)
