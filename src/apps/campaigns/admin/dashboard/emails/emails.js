import { Container, Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Results from './results'
import EmailCampaign from './email_campaign'

class Emails extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any,
    isExpanded: PropTypes.bool,
    program: PropTypes.object
  }

  render() {
    const { controls, program } = this.props

    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>EMAILS: { program.title }</h2>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getEmail(campaign) {
    const { config } = this.props
    return {
      config,
      campaign
    }
  }

  _getInfinite() {
    const { config } = this.props
    return {
      endpoint: '/api/admin/campaigns/email',
      filter: {
        program_id: {
          $eq: config.program_id
        }
      },
      layout: Results,
      props: {
        config
      }
    }
  }

  _handleEmail(campaign) {
    this.context.card.push(EmailCampaign, this._getEmail(campaign))
  }

}

const mapResources = (props, context) => ({
  program: `/api/admin/crm/programs/${props.config.program_id}`
})

export default Container(mapResources)(Emails)
