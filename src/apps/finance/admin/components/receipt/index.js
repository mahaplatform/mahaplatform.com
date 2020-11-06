import { AssetToken, Image } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Receipt = ({ value, preview }) => (
  <ReceiptView {...value } preview={ preview } />
)

Receipt.propTypes = {
  value: PropTypes.object,
  preview: PropTypes.bool
}

class ReceiptView extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    asset_id: PropTypes.number,
    content_type: PropTypes.string,
    file_name: PropTypes.string,
    file_size: PropTypes.number,
    icon: PropTypes.string,
    id: PropTypes.number,
    has_preview: PropTypes.bool,
    original_file_name: PropTypes.string,
    preview: PropTypes.bool,
    signed_url: PropTypes.string,
    source: PropTypes.string,
    source_url: PropTypes.string
  }

  static defaultProps = {
    preview: true
  }

  render() {
    const { asset_id, file_name, has_preview, preview } = this.props
    if(preview) {
      const src = has_preview ? `/assets/${asset_id}/preview.jpg` : `/assets/${asset_id}/${file_name}`
      return (
        <div className="receipt-thumbnail" onClick={ this._handleImage.bind(this, src) }>
          <Image src={ src } title={ file_name } transforms={{ h: 360 }} /> :
        </div>
      )
    }
    return <AssetToken { ...this._getAsset() } />
  }

  _getAsset() {
    const { asset_id, file_name, file_size, original_file_name, content_type, icon, source, source_url, signed_url } = this.props
    return {
      id: asset_id,
      original_file_name,
      file_name,
      file_size,
      content_type,
      icon,
      source,
      source_url,
      signed_url
    }
  }

  _handleImage(src) {
    const { id } = this.props
    this.context.router.history.push(`/finance/receipts/${id}`)
  }

}

export default Receipt
