import PropTypes from 'prop-types'
import React from 'react'
import AssetToken from '../../asset/token'
import Attachments from '../../attachments'

class AttachmentField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    assets: PropTypes.array,
    defaultValue: PropTypes.array,
    multiple: PropTypes.bool,
    prompt: PropTypes.string,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    multiple: false,
    onReady: () => {},
    prompt: 'Add Attachment'
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleClick = this._handleClick.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleSet = this._handleSet.bind(this)

  render() {
    const { assets, prompt } = this.props
    return (
      <div className="maha-attachmentfield">
        { assets.map((asset,index) => (
          <div className="maha-attachmentfield-asset" key={ `asset_${index}` }>
            <AssetToken { ...asset } download={ false } key={ `asset_${asset.id}` } />
            <div className="maha-attachmentfield-asset-remove" onClick={ this._handleRemove.bind(this, index) }>
              <i className="fa fa-fw fa-times" />
            </div>
          </div>
        )) }
        <div className="ui button" onClick={ this._handleClick }>
          { prompt }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onFetch, onReady } = this.props
    if(defaultValue) onFetch(defaultValue)
    onReady()
  }

  _getAttachments() {
    return {
      onCancel: this._handleCancel,
      onChooseAssets: this._handleSet,
      onDone: this._handleDone
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSet(assets) {
    const { multiple } = this.props
    this.props.onSet(assets)
    const value = multiple ? assets.map(asset => asset.id) : assets[0].id
    this.props.onChange(value)
  }

  _handleDone() {
    this.context.form.pop()
  }

  _handleClick() {
    this.context.form.push(<Attachments { ...this._getAttachments() } />)
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

export default AttachmentField
