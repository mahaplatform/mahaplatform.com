import { FolderItem, FileItem } from './item'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Items extends React.Component {

  static propTypes = {
    dragging: PropTypes.bool,
    folder: PropTypes.object,
    preview: PropTypes.object,
    records: PropTypes.array,
    selected: PropTypes.array,
    onAddSelected: PropTypes.func,
    onBeginDrag: PropTypes.func,
    onClearSelected: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onCreateFile: PropTypes.func,
    onEndDrag: PropTypes.func,
    onMoveItem: PropTypes.func,
    onPreview: PropTypes.func,
    onReplaceSelected: PropTypes.func,
    onTasks: PropTypes.func,
    onUpdateFile: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="drive-items">
        <div className="drive-head">
          <div className="drive-head-item drive-name">
            Name
          </div>
          <div className="drive-head-item drive-owner">
            Owner
          </div>
          <div className="drive-head-item drive-updated">
            Updated
          </div>
          <div className="drive-head-item drive-size">
            Size
          </div>
          <div className="drive-head-item drive-action" />
          <div className="drive-head-item drive-action" />
        </div>
        { records.map((item, index) => {
          if(item.type === 'folder') return <FolderItem { ...this._getItem(item) } />
          if(item.type === 'file') return <FileItem { ...this._getItem(item) } />
        })}
      </div>
    )
  }

  _getItem(item) {
    const { dragging, folder, preview, records, selected, onAddSelected, onBeginDrag, onChangeFolder, onClearSelected, onCreateFile, onEndDrag, onMoveItem, onPreview, onReplaceSelected, onTasks, onUpdateFile } = this.props
    return {
      dragging,
      folder,
      items: records,
      item,
      key: `item_${item.code}`,
      preview,
      selected,
      onAddSelected,
      onBeginDrag,
      onChangeFolder,
      onClearSelected,
      onCreateFile,
      onEndDrag,
      onMoveItem,
      onPreview,
      onReplaceSelected,
      onTasks,
      onUpdateFile
    }
  }

}

const mapStateToProps = (state, props) => ({
  dragging: state.drive.explorer.dragging,
  preview: state.drive.explorer.preview,
  selected: state.drive.explorer.selected
})

Items = connect(mapStateToProps)(Items)

export default Items
