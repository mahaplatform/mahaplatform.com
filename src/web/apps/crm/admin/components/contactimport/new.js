import { ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

const sources = [
  { label: 'Outlook 365', service: 'outlookcontacts' },
  { label: 'Gmail', service: 'googlecontacts' }
]

class New extends React.PureComponent {

  static contextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    token: PropTypes.string,
    onPop: PropTypes.func
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
    this.props.onPop()
  }

  _handleChooseSource(source) {
    const { token } = this.props
    this.context.host.openWindow(`/admin/${source.service}/authorize?token=${token}`)
    this.props.onPop()
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(New)
