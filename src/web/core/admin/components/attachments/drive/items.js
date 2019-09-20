import AssetThumbnail from '../../asset/thumbnail'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Items extends React.Component {

  static propTypes = {
    extensions: PropTypes.array,
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
      <div className="maha-attachments-drive-items">
        { records.map((item, index) => (
          <div className={ this._getClass(item) } key={`item_${index}`} onClick={ this._handleClick.bind(this, item) }>
            <div className="maha-attachments-drive-item-icon">
              { item.type === 'folder' ?
                <div className="maha-asset-icon">
                  <i className="fa fa-fw fa-folder" />
                </div> :
                <AssetThumbnail { ...item.asset } />
              }
            </div>
            <div className="maha-attachments-drive-item-name">
              { item.label }
            </div>
            <div className="maha-attachments-drive-item-action">
              <i className={ `fa fa-fw fa-${this._getIcon(item)}` } />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(item) {
    const { extensions } = this.props
    const extension = item.asset ? item.asset.original_file_name.split('.').pop() : null
    const classes = ['maha-attachments-drive-item']
    if(extensions && item.type === 'file' && !_.includes(extensions, extension)) classes.push('disabled')
    return classes.join(' ')
  }

  _getIcon(item) {
    const { files } = this.props
    if(item.type === 'folder') return 'chevron-right'
    const file = _.find(files, { id: item.asset.id, service: 'maha' })
    return file ? 'check' : null
  }

  _handleClick(item) {
    const { onChangeFolder } = this.props
    if(item.type === 'folder') onChangeFolder(item)
    if(item.type === 'file') this._handleChooseAsset(item.asset)
  }

  _handleChooseAsset(asset) {
    const { files, onAdd, onRemove } = this.props
    const index = _.findIndex(files, { id: asset.id, service: 'maha' })
    if(index < 0) return onAdd(asset)
    onRemove(asset)
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Items)
