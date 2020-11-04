import { Format } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static contextTypes = {
    card: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    records: PropTypes.array,
    isExpanded: PropTypes.bool
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-list">
        { records.map((response, index) => (
          <div className="maha-list-item maha-list-item-link" key={`response_${index}`} onClick={ this._handleRegistration.bind(this, response) }>
            <div className="maha-list-item-label">
              { response.contact.display_name }
            </div>
            <div className="maha-list-item-data">
              <Format value={ response.created_at } format='datetime' />
            </div>
            <div className="maha-list-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleRegistration(response) {
    const { config } = this.props
    this.context.router.history.push(`/forms/forms/${config.form_id}/responses/${response.id}`)
  }
}

export default Results
