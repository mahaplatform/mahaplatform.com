import { Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Responses extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    form: PropTypes.object,
    isExpanded: PropTypes.bool
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    const { form } = this.props
    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header maha-dashboard-card-back" onClick={ this._handleBack }>
          <i className="fa fa-chevron-left" />
          <div className="maha-dashboard-card-header-details">
            <h2>{ form.title }</h2>
            <h3>Responses</h3>
          </div>
        </div>
        <div className="maha-dashboard-card-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { config, isExpanded } = this.props
    return {
      endpoint: `/api/admin/crm/forms/${config.form_id}/responses`,
      layout: Results,
      props: {
        config,
        isExpanded
      }
    }
  }

  _handleBack() {
    this.context.card.pop()
  }

}

export default Responses
