import { connect } from 'react-redux'
import Infinite from '../../infinite'
import Message from '../../message'
import PropTypes from 'prop-types'
import React from 'react'
import Grid from './grid'
import List from './list'

class Folder extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    folder: PropTypes.object,
    files: PropTypes.array,
    records: PropTypes.array,
    view: PropTypes.string,
    onAdd: PropTypes.func,
    onChangeFolder: PropTypes.func,
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
              { folder.item_id ?
                <i className="fa fa-fw fa-chevron-left" /> :
                <img src="/admin/images/services/maha.png" />
              }
            </div>
            <div className="maha-attachments-drive-header-label">
              { folder.label }
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
    const { allow, files, folder, view, onAdd, onChangeFolder, onRemove } = this.props
    const $eq = folder.item_id || 'null'
    const filter = { folder_id: { $eq } }
    const empty = {
      icon: 'folder-open-o',
      title: 'Empty Folder',
      text: 'There are no list in this folder'
    }
    return {
      endpoint: '/api/admin/drive/items',
      filter,
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: view === 'list' ? List : Grid,
      props: {
        allow,
        files,
        onAdd,
        onChangeFolder,
        onRemove
      }
    }
  }

  _handleUp() {
    const { folder } = this.props
    if(!folder.item_id) return
    this.props.onUp()
  }

}

const mapStateToProps = (state, props) => ({
  view: state.maha.attachments.view
})

export default connect(mapStateToProps)(Folder)
