import { DragSource, DropTarget } from 'react-dnd'
import { Star, AssetThumbnail } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

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
    dragging: PropTypes.bool,
    isDragging: PropTypes.bool,
    isOver: PropTypes.bool,
    items: PropTypes.array,
    item: PropTypes.object,
    preview: PropTypes.object,
    selected: PropTypes.array,
    onAddSelected: PropTypes.func,
    onBeginDrag: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onClearSelected: PropTypes.func,
    onCreateFile: PropTypes.func,
    onEndDrag: PropTypes.func,
    onMoveItem: PropTypes.func,
    onPreview: PropTypes.func,
    onReplaceSelected: PropTypes.func,
    onTasks: PropTypes.func,
    onUpdateFile: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)
  _handleDoubleClick = this._handleDoubleClick.bind(this)
  _handleMouseDown = this._handleMouseDown.bind(this)
  _handlePreview = this._handlePreview.bind(this)
  _handleSelect = this._handleSelect.bind(this)
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

  componentDidUpdate(prevProps) {
    const { isDragging, onBeginDrag, onEndDrag } = this.props
    if(isDragging !== prevProps.isDragging) {
      if(isDragging) onBeginDrag()
      if(!isDragging) onEndDrag()
    }
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
      onMouseDown: this._handleMouseDown,
      onClick: this._handleClick,
      onDoubleClick: this._handleDoubleClick
    }
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

  _getStar() {
    const { item } = this.props
    return {
      table: item.type === 'folder' ? 'drive_folders' : 'drive_files',
      id: item.item_id,
      is_starred: item.is_starred
    }
  }

  _handleMouseDown(e) {
    const { item } = this.props
    e.stopPropagation()
    const { shiftKey, metaKey, ctrlKey } = e
    setTimeout(() => {
      this._handleSelect(item, shiftKey, metaKey, ctrlKey)
    }, 100)
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

  _handleSelect(item, shiftKey, metaKey, ctrlKey) {
    const { items, selected, onAddSelected, onReplaceSelected } = this.props
    if(shiftKey && selected.length > 0) {
      const item_index = _.findIndex(items, { code: item.code })
      const first_index = _.findIndex(items, { code: selected.slice(0,1)[0].code })
      const last_index = _.findIndex(items, { code: selected.slice(-1)[0].code })
      const all = items.filter((item, index) => {
        if(item_index <= first_index && index >= item_index && index <= last_index) return true
        if(item_index >= last_index && index >= first_index && index <= item_index) return true
        return false
      })
      return onReplaceSelected(all)
    }
    if(metaKey || ctrlKey) return onAddSelected(item)
    const isSelected = _.findIndex(selected, { code: item.code }) >= 0
    if(isSelected && selected.length > 1) return
    onReplaceSelected([item])
  }

  _handleView() {
    const { item } = this.props
    const { router } = this.context
    if(item.type === 'file') router.push(`/admin/drive/files/${item.code}`)
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

const source = {
  beginDrag: (props, monitor, component) => ({
    ...props.item,
    selected: props.selected,
    onEndDrag: props.onEndDrag,
    onMoveItem: props.onMoveItem
  }),
  endDrag: (props, monitor, component) => {
    const source = monitor.getItem()
    const target = monitor.getDropResult()
    if(target === null || target.code === source.code) return
    source.onMoveItem(target)
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

export const FileItem  = DragSource('ITEM', source, sourceCollector)(Item)

export const FolderItem = DropTarget('ITEM', target, targetCollector)(FileItem)
