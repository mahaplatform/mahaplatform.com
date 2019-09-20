import Infinite from '../../infinite'
import Message from '../../message'
import PropTypes from 'prop-types'
import React from 'react'
import Items from './items'

class Folder extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    folder: PropTypes.object,
    files: PropTypes.array,
    records: PropTypes.array,
    source: PropTypes.object,
    onAddAsset: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
    onUp: PropTypes.func
  }

  _handleUp = this._handleUp.bind(this)

  render() {
    const { folder } = this.props
    return (
      <div className="maha-attachments-drive-folder">
        <div className="maha-attachments-drive-header">
          <div className="maha-attachments-drive-header-breadcrumb" onClick={ this._handleUp }>
            <div className="maha-attachments-drive-header-back">
              { folder.id ?
                <i className="fa fa-fw fa-chevron-left" /> :
                <i className="fa fa-fw fa-home" />
              }
            </div>
            <div className="maha-attachments-drive-header-label">
              { folder.name }
            </div>
          </div>
        </div>
        <div className="maha-attachments-drive-results">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { allow, folder, source, onAddAsset, onChangeFolder, onCreate, onRemove } = this.props
    const $eq = folder.id || 'null'
    const filter = { folder_id: { $eq } }
    const empty = {
      icon: 'folder-open-o',
      title: 'Empty Folder',
      text: 'There are no items in this folder'
    }
    return {
      endpoint: `/api/admin/profiles/${source.id}/files`,
      filter,
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: Items,
      props: {
        allow,
        source,
        onAddAsset,
        onChangeFolder,
        onCreate,
        onRemove
      }
    }
  }

  _handleUp() {
    const { folder } = this.props
    if(!folder.id) return
    this.props.onUp()
  }

}

export default Folder
