import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class New extends React.PureComponent {

  static contextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    services: PropTypes.array,
    token: PropTypes.string,
    onBack: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)

  render() {
    const { services } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-services">
          { services.map((service, index) => (
            <div className="maha-attachments-source" key={`source_${index}`} onClick={ this._handleChooseService.bind(this, service)}>
              <div className="maha-attachments-source-logo">
                <div className={`maha-attachments-source-favicon ${service.name}`}>
                  <img src={ `/admin/images/services/${service.name}.png` } />
                </div>
              </div>
              <div className="maha-attachments-source-text">
                { service.label }
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

  _getType(service) {
    if(_.includes(['googlephotos','facebook','instagram'], service)) return 'photos'
    return 'files'
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChooseService(service) {
    const { host } = this.context
    const { token } = this.props
    const type = this._getType(service.name)
    const timestamp = moment().format('x')
    host.openWindow(`/admin/${service.name}/authorize?type=${type}&timestamp=${timestamp}&token=${token}`)
    this.props.onBack()
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(New)
