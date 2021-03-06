import AssetThumbnail from '../../asset/thumbnail'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class List extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    records: PropTypes.array,
    onAdd: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { records } = this.props
    return (
      <div className="maha-attachments-list-items">
        { records.map((item, index) => (
          <div className={ this._getClass(item) } key={`item_${index}`} onClick={ this._handleClick.bind(this, item) }>
            <div className="maha-attachments-list-item-icon">
              { item.type === 'folder' ?
                <div className="maha-asset-icon">
                  <i className="fa fa-fw fa-folder" />
                </div> :
                <AssetThumbnail { ...item.asset } />
              }
            </div>
            <div className="maha-attachments-list-item-name">
              { item.label }
            </div>
            <div className="maha-attachments-list-item-action">
              <i className={ `fa fa-fw fa-${this._getIcon(item)}` } />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(item) {
    const classes = ['maha-attachments-list-item']
    if(this._getDisabled(item)) classes.push('disabled')
    return classes.join(' ')
  }


  _getContentType(content_type) {
    if(content_type === 'image') return ['jpg','jpeg','png','gif'].map(type => {
      return `image/${type}`
    })
    if(content_type === 'audio') return ['mpeg','mp3','wav','wave','x-wav','aiff','x-aifc','x-aiff','x-gsm','gsm','ulaw'].map(type => {
      return `audio/${type}`
    })
    return [content_type]
  }

  _getContentTypes(content_types) {
    if(!content_types) return null
    return content_types.reduce((content_types, content_type) => [
      ...content_types,
      ...this._getContentType(content_type)
    ], [])
  }

  _getDisabled(item) {
    const { allow } = this.props
    const { extensions } = allow
    const content_types = this._getContentTypes(allow.content_types)
    if(item.type === 'folder') return false
    if(!content_types && !extensions) return false
    const name = item.label || item.name
    const extension = name.split('.').pop().toLowerCase()
    const extension_allowed = _.includes(extensions, extension)
    const content_type = item.content_type || item.asset.content_type
    const content_type_allowed = _.includes(content_types, content_type)
    return !(extension_allowed || content_type_allowed)
  }

  _getIcon(item) {
    const { files } = this.props
    if(item.type === 'folder') return 'chevron-right'
    const file = _.find(files, { id: item.asset.id, service: 'maha' })
    return file ? 'check' : null
  }

  _handleClick(item) {
    const { onChangeFolder } = this.props
    if(this._getDisabled(item)) return
    if(item.type === 'folder') onChangeFolder(item)
    if(item.type === 'file') this._handleChooseAsset(item.asset)
  }

  _handleChooseAsset(asset) {
    const { files, onAdd, onRemove } = this.props
    const index = _.findIndex(files, { id: asset.id, service: 'maha' })
    if(index < 0) return onAdd(asset)
    onRemove(asset)
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(List)
