import { FolderItem, FileItem } from './item'
import PropTypes from 'prop-types'
import React from 'react'

class Items extends React.Component {

  static propTypes = {
    folder: PropTypes.object,
    records: PropTypes.array,
    onChangeFolder: PropTypes.func,
    onCreateFile: PropTypes.func,
    onMoveItem: PropTypes.func,
    onPreview: PropTypes.func,
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
    const { folder, onChangeFolder, onCreateFile, onMoveItem, onPreview, onTasks, onUpdateFile } = this.props
    return {
      folder,
      item,
      key: `item_${item.code}`,
      onChangeFolder,
      onCreateFile,
      onMoveItem,
      onPreview,
      onTasks,
      onUpdateFile
    }
  }

}

export default Items
