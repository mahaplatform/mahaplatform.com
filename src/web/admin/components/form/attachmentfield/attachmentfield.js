import AssetToken from '../../../tokens/asset'
import Attachments from '../../attachments'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class AttachmentField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    assets: PropTypes.array,
    defaultValue: PropTypes.array,
    formatter: PropTypes.func,
    images: PropTypes.array,
    multiple: PropTypes.bool,
    plains: PropTypes.array,
    prompt: PropTypes.string,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    formatter: (asset) => asset.id,
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
    const { images, plains, prompt } = this.props
    return (
      <div className="maha-attachmentfield">
        <div className="maha-attachmentfield-assets">
          { images.map((asset,index) => (
            <div className="maha-attachmentfield-image" key={ `image_${index}` }>
              <img src={`/imagecache/fit=cover&w=100&h=100${ asset.path }`} />
              <div className="maha-attachmentfield-remove" onClick={ this._handleRemove.bind(this, index) }>
                <i className="fa fa-fw fa-times" />
              </div>
            </div>
          )) }
          { plains.map((asset,index) => (
            <div className="maha-attachmentfield-asset" key={ `asset_${index}` }>
              <AssetToken { ...asset } download={ false } key={ `asset_${asset.id}` } />
              <div className="maha-attachmentfield-remove" onClick={ this._handleRemove.bind(this, index) }>
                <i className="fa fa-fw fa-times" />
              </div>
            </div>
          )) }
        </div>
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

  componentDidUpdate(prevProps) {
    const { assets } = this.props
    if(!_.isEqual(assets, prevProps.assets)) {
      this._handleChange()
    }
  }

  _getAttachments() {
    const { multiple } = this.props
    return {
      multiple,
      onCancel: this._handleCancel,
      onChooseAssets: this._handleSet,
      onDone: this._handleDone
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChange() {
    const { formatter, multiple } = this.props
    const assets = this.props.assets.map(formatter)
    const value = multiple ? assets : assets[0]
    this.props.onChange(value)
  }

  _handleSet(assets) {
    const { formatter, multiple } = this.props
    this.props.onSet(assets)
    const value = multiple ? assets.map(formatter) : assets[0].id
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
