import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const sources = [
  { label: 'Google Drive', service: 'googledrive', types: ['files','photos'] },
  { label: 'Google Photos', service: 'googlephotos', types: ['photos'] },
  { label: 'Microsoft OneDrive', service: 'onedrive', types: ['files','photos'] },
  { label: 'Facebook', service: 'facebook', types: ['photos'] },
  { label: 'Instagram', service: 'instagram', types: ['photos'] },
  { label: 'Dropbox', service: 'dropbox', types: ['files','photos'] },
  { label: 'Box', service: 'box', types: ['files','photos'] }
]

class New extends React.PureComponent {

  static contextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    token: PropTypes.string,
    types: PropTypes.array,
    onBack: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)

  render() {
    const { types } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-sources">
          { sources.filter(source => {
            return _.intersection(source.types, types).length > 0
          }).map((source, index) => (
            <div className="maha-attachments-source" key={`source_${index}`} onClick={ this._handleChooseSource.bind(this, source)}>
              <div className="maha-attachments-source-logo">
                <div className={`maha-attachments-source-favicon ${source.service}`}>
                  <img src={ `/admin/images/services/${source.service}.png` } />
                </div>
              </div>
              <div className="maha-attachments-source-text">
                { source.label }
              </div>
            </div>
          ))}
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Service',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChooseSource(source) {
    const { token } = this.props
    this.context.host.openWindow(`/admin/${source.service}/authorize?token=${token}`)
    this.props.onBack()
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(New)
