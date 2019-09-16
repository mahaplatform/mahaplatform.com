import ModalPanel from '../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

const sources = [
  { label: 'Google Drive', network: 'googledrive' },
  { label: 'Google Photos', network: 'googlephotos' },
  { label: 'Microsoft OneDrive', network: 'onedrive' },
  { label: 'Facebook', network: 'facebook' },
  { label: 'Instagram', network: 'instagram' },
  { label: 'Dropbox', network: 'dropbox' },
  { label: 'Box', network: 'box' }
]

class New extends React.PureComponent {

  static contextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    token: PropTypes.string,
    onBack: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-sources">
          { sources.map((source, index) => (
            <div className="maha-attachments-source" key={`source_${index}`} onClick={ this._handleChooseSource.bind(this, source)}>
              <div className="maha-attachments-source-logo">
                <div className="maha-attachments-source-favicon">
                  <img src={ `/admin/images/services/${source.network}.png` } />
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
    this.context.host.openWindow(`/admin/${source.network}/authorize?token=${token}`)
    this.props.onBack()
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(New)
