import AssetThumbnail from '../../asset/thumbnail'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Grid extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    files: PropTypes.array,
    records: PropTypes.array,
    source: PropTypes.object,
    onChangeFolder: PropTypes.func,
    onAdd: PropTypes.func,
    onBack: PropTypes.func,
    onList: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { records } = this.props
    return (
      <div className="maha-attachments-drive-grid">
        { records.map((item, index) => (
          <div className={ this._getClass(item) } key={`item_${index}`} onClick={ this._handleClick.bind(this, item) }>
            <div className="maha-attachments-drive-grid-item-preview">
              <div className="maha-attachments-drive-grid-item-icon">
                { item.type === 'folder' ?
                  <div className="maha-asset-icon">
                    <i className="fa fa-fw fa-folder" />
                  </div> :
                  <AssetThumbnail width={ 190 } { ...item } />
                }
              </div>
            </div>
            <div className="maha-attachments-drive-grid-item-name">
              { item.name }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getClass(item) {
    const classes = ['maha-attachments-drive-grid-item']
    if(this._getDisabled(item)) classes.push('disabled')
    return classes.join(' ')
  }

  _getDisabled(item) {
    const { allow } = this.props
    if(item.type === 'folder') return false
    if(!allow) return false
    const extension = item.name.split('.').pop().toLowerCase()
    const extension_allowed = _.includes(allow.extensions, extension)
    const content_type = item.content_type
    const content_type_allowed = _.includes(allow.content_types, content_type)
    return !(extension_allowed || content_type_allowed)
  }

  _handleClick(item) {
    const { onChangeFolder } = this.props
    if(this._getDisabled(item)) return
    if(item.type === 'folder') onChangeFolder(item)
    if(item.type === 'file') this._handleChooseFile(item)
  }

  _handleChooseFile(item) {
    const { source, files, onRemove } = this.props
    const index = _.findIndex(files, { id: item.id, service: source.service })
    if(index >= 0) return onRemove(index)
    this.props.onAdd({
      id: item.id,
      create: {
        endpoint: `/api/admin/profiles/${source.id}/files`,
        body: { id: item.id }
      },
      source_id: source.id,
      name: item.name,
      service: source.service,
      content_type: item.content_type,
      thumbnail: item.thumbnail,
      status: 'pending'
    })
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Grid)
