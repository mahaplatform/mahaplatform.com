import { AssetViewer, Button, PhoneField } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Recordingfield extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    code: PropTypes.string,
    defaultValue: PropTypes.number,
    number: PropTypes.string,
    status: PropTypes.string,
    user: PropTypes.object,
    onCall: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRecord: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSet: PropTypes.func,
    onUpdateNumber: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleAsset = this._handleAsset.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleCreated = this._handleCreated.bind(this)
  _handleSetStatus = this._handleSetStatus.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { asset, status } = this.props
    return (
      <div className="crm-recordingfield">
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
        { status === 'processing' &&
          <div className="crm-recordingfield-status processing">
            Processing...
          </div>
        }
        { status === 'success' &&
          <AssetViewer asset={ asset } />
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.props.onFetch(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { asset, code } = this.props
    if(asset !== prevProps.asset && asset) {
      this._handleChange()
    }
    if(code !== prevProps.code && code) {
      this._handleJoinRecording()
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

  _handleAsset(asset) {
    this.props.onSet(asset)
    this._handleLeaveAsset(asset)
  }

  _handleCall() {
    const { number } = this.props
    const code = _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    this.props.onCall(code, number)
  }

  _handleChange() {
    const { asset } = this.props
    this.props.onChange(asset.id)
  }

  _handleCreated(asset) {
    this.props.onSetStatus('processing')
    this._handleLeaveRecording()
    this._handleJoinAsset(asset)
  }

  _handleJoinAsset(asset) {
    const { network } = this.context
    const channel = `/admin/assets/${asset.id}`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleAsset }
    ])
  }

  _handleJoinRecording() {
    const { network } = this.context
    const { code } = this.props
    const channel = `/admin/crm/recordings/${code}`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'created', handler: this._handleCreated },
      { target: channel, action: 'status', handler: this._handleSetStatus }
    ])
  }

  _handleLeaveAsset(asset) {
    const { network } = this.context
    const channel = `/admin/assets/${asset.id}`
    network.join(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleAsset }
    ])
  }

  _handleLeaveRecording() {
    const { network } = this.context
    const { code } = this.props
    const channel = `/admin/crm/recordings/${code}`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'created', handler: this._handleCreated },
      { target: channel, action: 'status', handler: this._handleSetStatus }
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
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Recordingfield)
