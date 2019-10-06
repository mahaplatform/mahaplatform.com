import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'
import _ from 'lodash'

class Sources extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    cancelText: PropTypes.any,
    counts: PropTypes.object,
    files: PropTypes.array,
    sources: PropTypes.array,
    onAdd: PropTypes.func,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onNext: PropTypes.func,
    onPush: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleNext = this._handleNext.bind(this)

  render() {
    const { counts, sources } = this.props
    const services = this._getServices()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-sources">
          { sources.map((source, index) => (
            <div className="maha-attachments-source" key={`source_${index}`} onClick={ this._handleChooseSource.bind(this, source)}>
              <div className="maha-attachments-source-logo">
                <div className={`maha-attachments-source-favicon ${source.service}`}>
                  <img src={ `/admin/images/services/${source.service}.png` } />
                </div>
              </div>
              <div className="maha-attachments-source-text">
                { source.username || source.service }
              </div>
              { counts[source.id] &&
                <div className="maha-attachments-source-count">
                  <div className="maha-attachments-source-count-badge">
                    { counts[source.id] }
                  </div>
                </div>
              }
              <div className="maha-attachments-source-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          ))}
          { services.length > 0 &&
            <div className="maha-attachments-source" onClick={ this._handleNew }>
              <div className="maha-attachments-source-logo">
                <i className="fa fa-fw fa-plus-circle" />
              </div>
              <div className="maha-attachments-source-text">
                Add a new source
              </div>
              <div className="maha-attachments-source-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          }
        </div>
      </ModalPanel>
    )
  }

  _getNew() {
    const { allow } = this.props
    return {
      allow,
      services: this._getServices(),
      onBack: this._handleBack
    }
  }

  _getPanel() {
    const { cancelText, files } = this.props
    return {
      title: 'Choose Source',
      leftItems: [
        { label: cancelText, handler: this._handleCancel }
      ],
      rightItems: files.length > 0 ? [
        { label: 'Next', handler: this._handleNext }
      ] : []
    }
  }

  _getServices() {
    const { allow } = this.props
    return [
      { label: 'Google Drive', name: 'googledrive', type: 'files' },
      { label: 'Google Photos', name: 'googlephotos', type: 'photos' },
      { label: 'Microsoft OneDrive', name: 'onedrive', type: 'files' },
      { label: 'Facebook', name: 'facebook', type: 'photos' },
      { label: 'Instagram', name: 'instagram', type: 'photos' },
      { label: 'Dropbox', name: 'dropbox', type: 'files' },
      { label: 'Box', name: 'box', type: 'files' }
    ].filter(service => {
      const service_allowed = !allow.services || _.includes(allow.services, service.name)
      const type_allowed = !allow.types || !service.type || _.includes(allow.types, service.type)
      return service_allowed && type_allowed
    })
  }

  _getSource(source) {
    const { allow, onAdd, onRemove } = this.props
    return {
      allow,
      source,
      onAdd,
      onRemove,
      onBack: this._handleBack,
      onNext: this._handleNext
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChooseSource(source) {
    this.props.onPush(source.component, this._getSource(source))
  }

  _handleNew() {
    this.props.onPush(New, this._getNew())
  }

  _handleNext() {
    this.props.onNext()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Sources)
