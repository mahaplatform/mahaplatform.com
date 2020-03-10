import { AssetToken, Button, PhoneField } from 'maha-admin'
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
    number: PropTypes.string,
    user: PropTypes.object,
    onCall: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRecord: PropTypes.func,
    onSet: PropTypes.func,
    onUpdateNumber: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleCall = this._handleCall.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleCreated = this._handleCreated.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { asset } = this.props
    if(asset) {
      return (
        <div className="crm-recordingfield-token">
          <AssetToken { ...asset } />
        </div>
      )
    }
    return (
      <div className="crm-recordingfield">
        <div className="crm-recordingfield-field">
          <PhoneField { ...this._getPhoneField() } />
        </div>
        <div className="crm-recordingfield-button">
          <Button { ...this._getRecordButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { asset, code } = this.props
    if(asset !== prevProps.asset && asset) {
      this._handleChange()
    }
    if(code !== prevProps.code && code) {
      this._handleJoin()
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

  _handleCall() {
    const { number } = this.props
    const code = _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    this.props.onCall(code, number)
  }

  _handleChange() {
    const { asset } = this.props
    this.props.onChange(asset.id)
  }

  _handleCreated({ asset }) {
    this.props.onSet(asset)
  }

  _handleJoin() {
    const { network } = this.context
    const { code } = this.props
    const channel = `/admin/crm/recordings/${code}`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'created', handler: this._handleCreated }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { code } = this.props
    const channel = `/admin/crm/recordings/${code}`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'created', handler: this._handleCreated }
    ])
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
