import { DragSource, DropTarget } from 'react-dnd'
import { Star, AssetThumbnail } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Item extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    canDrop: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    isOver: PropTypes.bool,
    item: PropTypes.object,
    preview: PropTypes.object,
    onChangeFolder: PropTypes.func,
    onCreateFile: PropTypes.func,
    onMoveItem: PropTypes.func,
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
    const { connectDropTarget, connectDragSource, item } = this.props
    const view = (
      <div { ...this._getItem() }>
        <div className="drive-item-icon">
          { item.type === 'folder' ?
            <div className="maha-asset-icon">
              <i className="fa fa-fw fa-folder" />
            </div> :
            <AssetThumbnail { ...item.asset } />
          }
        </div>
        <div className="drive-item-name">
          { item.label }
        </div>
        <div className="drive-item-action">
          <Star { ...this._getStar(item) } />
        </div>
        <div className="drive-item-action" onClick={ this._handleTasks }>
          <i className="fa fa-fw fa-ellipsis-v" />
        </div>
      </div>
    )
    const draggable = connectDragSource(view)
    if(item.type === 'folder') return connectDropTarget(draggable)
    return draggable
  }

  componentDidMount() {
    this.props.connectDragPreview(this._getEmptyImage())
  }

  _getEmptyImage() {
    const emptyImage = new Image()
    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    return emptyImage
  }

  _getItem() {
    return {
      className: this._getClass(),
      onContextMenu: this._handleTasks,
      onClick: this._handleClick,
      onDoubleClick: this._handleDoubleClick
    }
  }

  _getClass() {
    const { item, preview, isOver, isDragging } = this.props
    const classes= ['drive-item']
    if(preview && preview.code === item.code) classes.push('selected')
    if(isOver) classes.push('over')
    if(isDragging) classes.push('dragging')
    return classes.join(' ')
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
    if(item.type === 'file') router.push(`/admin/drive/files/${item.code}`)
  }

  _handleTasks(e) {
    const { item } = this.props
    this.props.onTasks(item, e)
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

const source = {
  beginDrag: (props) => ({
    ...props.item,
    onMoveItem: props.onMoveItem
  }),
  endDrag: (props, monitor, component) => {
    const source = monitor.getItem()
    const target = monitor.getDropResult()
    if(target === null || target.code === source.code) return
    source.onMoveItem(source, target)
  }
}

const target = {
  drop: (props, monitor, component) => props.item
}

const sourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const targetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

const mapStateToProps = (state, props) => ({
  preview: state.drive.explorer.preview
})

Item = connect(mapStateToProps)(Item)

export const FileItem  = DragSource('ITEM', source, sourceCollector)(Item)

export const FolderItem = DropTarget('ITEM', target, targetCollector)(FileItem)
