import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

class Services extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    services: PropTypes.array,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { services } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="social-designer-services">
          { services.map((service, index) => (
            <div className="social-designer-service" key={`source_${index}`}>
              <div className="social-designer-service-logo">
                <img src={`/images/services/${service.service}.png`} />
              </div>
              <div className="social-designer-service-username">
                { service.username }
              </div>
              <div className="social-designer-service-proceed">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
          ))}
          <div className="social-designer-service-add" onClick={ this._handleNew }>
            <div className="social-designer-service-add-icon">
              <i className="fa fa-plus-circle" />
            </div>
            <div className="social-designer-service-add-label">
              Add Service
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getNew() {
    const { onPop } = this.props
    return {
      onPop
    }
  }

  _getPanel() {
    return {
      title: 'Services'
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleClick(source) {
    this.props.onPush(source.component, this._getSource(source))
  }

  _handleNew() {
    this.props.onPush(New, this._getNew())
  }
}

export default Services
