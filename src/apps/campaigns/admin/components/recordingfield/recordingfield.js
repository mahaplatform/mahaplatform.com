import { AssetViewer, Attachments, Button } from '@admin'
import Microphone from './microphone'
import PropTypes from 'prop-types'
import Record from './record'
import React from 'react'
import _ from 'lodash'

class Recordingfield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    cid: PropTypes.string,
    code: PropTypes.string,
    defaultValue: PropTypes.number,
    number: PropTypes.string,
    status: PropTypes.string,
    onCall: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onFetch: PropTypes.func,
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

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { asset } = this.props
    return (
      <div className="crm-recordingfield">
        { asset ?
          <div className="crm-recordingfield-recording">
            <div className="crm-recordingfield-recording-asset">
              <AssetViewer asset={ asset } />
            </div>
            <div className="maha-input-clear" onClick={ this._handleClear }>
              <i className="fa fa-times" />
            </div>
          </div> :
          <Button { ...this._getChooseButton() } />
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
    const { asset } = this.props
    if(asset !== prevProps.asset && asset) {
      this._handleChange()
    }
  }

  _getChooseButton() {
    return {
      label: 'Choose or record an audio file',
      className: 'ui black button',
      handler: this._handleChoose
    }
  }

  _getAttachments() {
    return {
      allow: {
        types: ['files'],
        content_types: ['audio']
      },
      cancelText: <i className="fa fa-chevron-left" />,
      custom: [
        { icon: 'microphone', service: 'microphone', label: 'Microphone', panel: Microphone, props: this._getMicrophone() },
        { icon: 'phone', service: 'phone', label: 'Phone Call', panel: Record, props: this._getRecord() }
      ],
      multiple: false,
      title: 'Choose Audio Source',
      onCancel: this._handleCancel,
      onDone: this._handleDone
    }
  }

  _getMicrophone() {
    const { cid, onCall, onRecord, onSetStatus, onUpdateNumber } = this.props
    return {
      cid,
      onCall,
      onRecord,
      onSetStatus,
      onUpdateNumber
    }
  }

  _getRecord() {
    const { cid, onCall, onRecord, onSetStatus, onUpdateNumber } = this.props
    return {
      cid,
      onCall,
      onRecord,
      onSetStatus,
      onUpdateNumber
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChange() {
    const { asset } = this.props
    this.props.onChange(asset.id)
  }

  _handleChoose() {
    this.context.form.push(<Attachments { ...this._getAttachments() } />)
  }

  _handleClear() {
    this.props.onClear()
  }

  _handleDone(assets) {
    const asset = _.castArray(assets)[0]
    this.context.form.pop()
    this.props.onSet(asset)
  }

}

export default Recordingfield
