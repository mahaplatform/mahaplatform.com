import PropTypes from 'prop-types'
import { AssetIcon } from '@admin'
import React from 'react'
import _ from 'lodash'

class Items extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    records: PropTypes.array,
    onChangeFolder: PropTypes.func,
    onAddAsset: PropTypes.func,
    onRemoveAsset: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="drive-items">
        { records.map((item, index) => (
          <div className="drive-item" key={`item_${index}`}>
            <div className="drive-item-meta">
              <div className="drive-item-token">
                <div className="drive-item-token-icon" onClick={ this._handleClick.bind(this, item) }>
                  { item.type === 'folder' &&
                    <div className="maha-asset-icon">
                      <i className="fa fa-fw fa-folder" />
                    </div>
                  }
                  { item.type === 'file' && <AssetIcon content_type={ item.asset.content_type } /> }
                </div>
                <div className="drive-item-token-name" onClick={ this._handleClick.bind(this, item) }>
                  { item.label }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleClick(item) {
    const { onChangeFolder } = this.props
    if(item.type === 'folder') onChangeFolder(item)
  }

  _handleChooseAsset(asset) {
    const { files, onAddAsset, onRemoveAsset } = this.props
    const index = _.findIndex(files, { id: asset.id, network: 'maha' })
    if(index < 0) return onAddAsset(asset)
    onRemoveAsset(asset)
  }

}

export default Items
