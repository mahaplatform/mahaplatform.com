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
