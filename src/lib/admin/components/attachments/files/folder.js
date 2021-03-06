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
    source: PropTypes.object,
    view: PropTypes.string,
    onAddAsset: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onUp: PropTypes.func
  }

  _handleUp = this._handleUp.bind(this)

  render() {
    const { folder, source } = this.props
    return (
      <div className="maha-attachments-drive-folder">
        <div className="maha-attachments-drive-header">
          <div className="maha-attachments-drive-header-breadcrumb" onClick={ this._handleUp }>
            <div className="maha-attachments-drive-header-back">
              { folder.id ?
                <i className="fa fa-fw fa-chevron-left" /> :
                <img src={`/images/services/${source.service}.png`} />
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
    const { allow, folder, source, view, onAddAsset, onChangeFolder, onAdd, onRemove } = this.props
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
      layout: view === 'list' ? List : Grid,
      props: {
        allow,
        source,
        onAddAsset,
        onChangeFolder,
        onAdd,
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

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files,
  view: state.maha.attachments.view
})

export default connect(mapStateToProps)(Folder)
