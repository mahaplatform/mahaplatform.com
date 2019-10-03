import { Star, AssetThumbnail } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import bytes from 'bytes'
import _ from 'lodash'

class Item extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    canDrop: PropTypes.bool,
    dragging: PropTypes.bool,
    isDragging: PropTypes.bool,
    isOver: PropTypes.bool,
    items: PropTypes.array,
    item: PropTypes.object,
    preview: PropTypes.object,
    selected: PropTypes.array,
    onChangeFolder: PropTypes.func,
    onClearSelected: PropTypes.func,
    onCreateFile: PropTypes.func,
    onMove: PropTypes.func,
    onPreview: PropTypes.func,
    onTasks: PropTypes.func,
    onUpdateFile: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)
  _handleDoubleClick = this._handleDoubleClick.bind(this)
  _handlePreview = this._handlePreview.bind(this)
  _handleTasks = this._handleTasks.bind(this)
  _handleView = this._handleView.bind(this)

  render() {
    const { item } = this.props
    return (
      <div { ...this._getItem(item) }>
        <div className="drive-item-meta drive-name">
          <div className="drive-item-token">
            <div className="drive-item-token-icon">
              { item.type === 'folder' ?
                <div className="maha-asset-icon">
                  <i className="fa fa-fw fa-folder" />
                </div> :
                <AssetThumbnail { ...item.asset } />
              }
            </div>
            <div className="drive-item-token-label">
              { item.label }
            </div>
          </div>
        </div>
        <div className="drive-item-meta drive-owner">
          { item.owned_by }
        </div>
        <div className="drive-item-meta drive-updated">
          { moment(item.updated_at).format('MMM DD, YYYY') }
        </div>
        <div className="drive-item-meta drive-size">
          { item.file_size ? bytes(item.file_size, { decimalPlaces: 0, unitSeparator: ' ' }) : '--' }
        </div>
        <div className="drive-item-meta drive-action">
          <Star { ...this._getStar(item) } />
        </div>
        <div className="drive-item-meta drive-action" onClick={ this._handleTasks }>
          <i className="fa fa-fw fa-ellipsis-v" />
        </div>
      </div>
    )
  }

  _getClass() {
    const { dragging, item, selected, isOver } = this.props
    const isSelected = _.find(selected, { code: item.code }) !== undefined
    const classes = ['drive-item']
    if(isSelected) classes.push('selected')
    if(isOver) classes.push('over')
    if(isSelected && dragging) classes.push('dragging')
    return classes.join(' ')
  }

  _getEmptyImage() {
    const emptyImage = new Image()
    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    return emptyImage
  }

  _getItem(item) {
    return {
      'data-type': item.type,
      'data-code': item.code,
      className: this._getClass(),
      onContextMenu: this._handleTasks,
      onClick: this._handleClick,
      onDoubleClick: this._handleDoubleClick
    }
  }

  _getStar() {
    const { item } = this.props
    return {
      table: item.type === 'folder' ? 'drive_folders' : 'drive_files',
      id: item.item_id,
      is_starred: item.is_starred
    }
  }

  _handleClick(e) {
    const { item, preview } = this.props
    e.stopPropagation()
    if(preview.code === item.code) return this._handleDoubleClick(e)
    if(document.body.clientWidth > 768) return this._handlePreview(item)
    this._handleDoubleClick(e)
  }

  _handleDoubleClick(e) {
    const { item } = this.props
    e.stopPropagation()
    this._handlePreview(item)
    if(item.type === 'file') this._handleView()
    if(item.type === 'folder') this._handleChangeFolder()
  }

  _handleView() {
    const { item } = this.props
    const { router } = this.context
    if(item.type === 'file') router.history.push(`/admin/drive/files/${item.code}`)
  }

  _handleTasks(e) {
    const { item, selected } = this.props
    e.stopPropagation()
    e.preventDefault()
    const items = selected.length > 1 ? selected : [item]
    this.props.onTasks(items, e)
  }

  _handleChangeFolder() {
    const { item } = this.props
    this.props.onChangeFolder(item)
  }

  _handlePreview() {
    const { item } = this.props
    this.props.onPreview(item)
  }

}

export default Item
