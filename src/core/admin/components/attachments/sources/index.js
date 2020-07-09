import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Source from './source'
import React from 'react'
import New from './new'
import _ from 'lodash'

class Sources extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    cancelText: PropTypes.any,
    counts: PropTypes.object,
    doneText: PropTypes.any,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    sources: PropTypes.array,
    title: PropTypes.string,
    onAdd: PropTypes.func,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onNext: PropTypes.func,
    onPush: PropTypes.func,
    onRemove: PropTypes.func,
    onToggleView: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleNext = this._handleNext.bind(this)

  render() {
    const services = this._getServices()
    const { sources } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-sources">
          { sources.map((source, index) => (
            <Source key={`source_${index}`} { ...this._getSource(source) } />
          ))}
          { services.length > 0 &&
            <div className="maha-attachments-source" onClick={ this._handleNew }>
              <div className="maha-attachments-source-logo">
                <i className="fa fa-fw fa-plus-circle" />
              </div>
              <div className="maha-attachments-source-text">
                Add a source
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

  _getSource(source) {
    const { counts, onAdd } = this.props
    return {
      count: counts[source.id],
      source,
      onAdd,
      onChoose: this._handleChoose.bind(this, source)
    }
  }

  _getNew() {
    const { allow, onBack } = this.props
    return {
      allow,
      services: this._getServices(),
      onBack
    }
  }

  _getPanel() {
    const { cancelText, files, title } = this.props
    return {
      title: title || 'Choose File Source',
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

  _getComponent(source) {
    const { allow, doneText, multiple, onAdd, onBack, onNext, onRemove, onToggleView } = this.props
    return {
      allow,
      doneText,
      multiple,
      source,
      ...source.props || {},
      onAdd,
      onBack,
      onNext,
      onRemove,
      onToggleView
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChoose(source) {
    this.props.onPush(source.panel, this._getComponent(source))
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
