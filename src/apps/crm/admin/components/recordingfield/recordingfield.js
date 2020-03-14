import { AssetViewer, Button } from 'maha-admin'
import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'

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
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onRecord: PropTypes.func,
    onRemove: PropTypes.func,
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
  _handleDone = this._handleDone.bind(this)

  render() {
    const { asset } = this.props
    return (
      <div className="crm-recordingfield">
        { asset ?
          <AssetViewer asset={ asset } /> :
          <Button { ...this._getChooseButton() } />
        }
        { asset &&
          <Button { ...this._getRemoveButton() } />
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
      label: 'Choose file',
      className: 'ui button',
      handler: this._handleChoose
    }
  }

  _getRemoveButton() {
    const { onRemove } = this.props
    return {
      label: 'choose another file',
      className: 'link',
      handler: onRemove
    }
  }

  _getChooser() {
    const { cid, onCall, onRecord, onSetStatus, onUpdateNumber } = this.props
    return {
      cid,
      onCall,
      onCancel: this._handleCancel,
      onRecord,
      onSetStatus,
      onDone: this._handleDone,
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
    this.context.form.push(<Chooser { ...this._getChooser() } />)
  }

  _handleDone(asset) {
    this.context.form.pop()
    this.props.onSet(asset)
  }

}

export default Recordingfield
