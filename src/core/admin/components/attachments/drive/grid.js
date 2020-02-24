import AssetThumbnail from '../../asset/thumbnail'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Grid extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    files: PropTypes.array,
    records: PropTypes.array,
    onAdd: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { records } = this.props
    return (
      <div className="maha-attachments-drive-grid">
        { records.map((item, index) => (
          <div className={ this._getClass(item) } key={`item_${index}`} onClick={ this._handleClick.bind(this, item) }>
            <div className="maha-attachments-drive-grid-item-preview">
              <div className="maha-attachments-drive-grid-item-icon">
                { item.type === 'folder' ?
                  <div className="maha-asset-icon">
                    <i className="fa fa-fw fa-folder" />
                  </div> :
                  <AssetThumbnail width={ 190 } { ...item.asset } />
                }
              </div>
            </div>
            <div className="maha-attachments-drive-grid-item-name">
              { item.label }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(item) {
    const classes = ['maha-attachments-drive-grid-item']
    if(this._getDisabled(item)) classes.push('disabled')
    return classes.join(' ')
  }

  _getDisabled(item) {
    const { allow } = this.props
    if(item.type === 'folder' || !item.asset) return false
    const extension = item.asset.original_file_name.split('.').pop()
    const extension_allowed = !allow.extensions || _.includes(allow.extensions, extension)
    const content_type = item.asset.content_type
    const content_type_allowed = !allow.content_types || _.includes(allow.content_types, content_type)
    return !extension_allowed && !content_type_allowed
  }

  _handleClick(item) {
    const { onChangeFolder } = this.props
    if(this._getDisabled(item)) return
    if(item.type === 'folder') onChangeFolder(item)
    if(item.type === 'file') this._handleChooseAsset(item.asset)
  }

  _handleChooseAsset(asset) {
    const { files, onAdd, onRemove } = this.props
    const index = _.findIndex(files, { id: asset.id, service: 'maha' })
    if(index < 0) return onAdd({
      ...asset,
      status: 'imported'
    })
    onRemove(asset)
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Grid)
