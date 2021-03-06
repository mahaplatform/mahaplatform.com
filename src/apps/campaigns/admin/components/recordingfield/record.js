import { Button, ModalPanel, PhoneField } from '@admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Record extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    number: PropTypes.string,
    status: PropTypes.string,
    user: PropTypes.object,
    onAdd: PropTypes.func,
    onBack: PropTypes.func,
    onCall: PropTypes.func,
    onRecord: PropTypes.func,
    onSetStatus: PropTypes.func,
    onUpdateNumber: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleCreated = this._handleCreated.bind(this)
  _handleSetStatus = this._handleSetStatus.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-recordingfield-panel">
          { status === 'pending' &&
            <div className="crm-recordingfield-field">
              <div className="crm-recordingfield-field-phone">
                <PhoneField { ...this._getPhoneField() } />
              </div>
              <div className="crm-recordingfield-field-button">
                <Button { ...this._getRecordButton() } />
              </div>
            </div>
          }
          { status === 'calling' &&
            <div className="crm-recordingfield-status calling">
              Calling...
            </div>
          }
          { status === 'recording' &&
            <div className="crm-recordingfield-status recording">
              Recording...
            </div>
          }
          { status === 'reviewing' &&
            <div className="crm-recordingfield-status reviewing">
              Reviewing...
            </div>
          }
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { code } = this.props
    if(code !== prevProps.code && code) {
      this._handleJoin()
    }
  }

  _getPanel() {
    return {
      title: 'Record Message',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      instructions: `
        We can call you to record a message over the phone. Just enter your
        number below to initiate the call.
      `
    }
  }

  _getPhoneField() {
    const { user } = this.props
    return {
      defaultValue: user ? user.cell_phone : null,
      onChange: this._handleUpdate
    }
  }

  _getRecordButton() {
    const { number } = this.props
    return {
      label: 'Call',
      color: 'black',
      disabled: number === null,
      handler: this._handleCall
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleCall() {
    const { number } = this.props
    const code = _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    this.props.onCall(code, number)
  }

  _handleCreated(asset) {
    this._handleLeave()
    this.props.onAdd({
      id: asset.id,
      name: asset.original_file_name,
      service: 'record',
      content_type: asset.content_type,
      asset,
      thumbnail: asset.signed_url,
      status: 'imported'
    })
    this.props.onSetStatus('pending')
  }

  _handleJoin() {
    const { network } = this.context
    const { code } = this.props
    const target = `/admin/crm/recordings/${code}`
    network.join(target)
    network.subscribe([
      { target, action: 'created', handler: this._handleCreated },
      { target, action: 'status', handler: this._handleSetStatus }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { code } = this.props
    const target = `/admin/crm/recordings/${code}`
    network.leave(target)
    network.unsubscribe([
      { target, action: 'created', handler: this._handleCreated },
      { target, action: 'status', handler: this._handleSetStatus }
    ])
  }

  _handleSetStatus({ status }) {
    this.props.onSetStatus(status)
  }

  _handleUpdate(number) {
    const value = number.length > 0 ? number : null
    this.props.onUpdateNumber(value)
  }

}

const mapStateToProps = (state, props) => ({
  code: state.crm.recordingfield[props.cid].code,
  number: state.crm.recordingfield[props.cid].number,
  status: state.crm.recordingfield[props.cid].status,
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Record)
