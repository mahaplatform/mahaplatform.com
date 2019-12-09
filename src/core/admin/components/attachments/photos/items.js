import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Items extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    records: PropTypes.array,
    source: PropTypes.object,
    onRemove: PropTypes.func,
    onAdd: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-attachments-photos-items">
        { records.map((photo, index) => (
          <div className="maha-attachments-photo-item" key={`item_${index}`} onClick={ this._handleClick.bind(this, photo) } style={{backgroundImage:`url(${photo.image})`}}>
            <div className="maha-attachments-photo-image">
              <i className={ `fa fa-${this._getIcon(photo)}` } />
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getIcon(photo) {
    const { files, source } = this.props
    const file = _.find(files, { id: photo.id, service: source.service })
    return file ? 'check' : null
  }

  _handleClick(photo) {
    const { source, files, onRemove } = this.props
    const index = _.findIndex(files, { id: photo.id, service: source.service })
    if(index >= 0) return onRemove(index)
    this.props.onAdd({
      id: photo.id,
      create: {
        endpoint: `/api/admin/profiles/${source.id}/photos`,
        body: { id: photo.id }
      },
      source_id: source.id,
      name: `${photo.id}.jpg`,
      service: source.service,
      content_type: 'image/jpeg',
      thumbnail: photo.image,
      status: 'pending'
    })
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Items)
