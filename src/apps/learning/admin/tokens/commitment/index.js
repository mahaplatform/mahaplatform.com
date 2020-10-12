import PropTypes from 'prop-types'
import React from 'react'

class CommitmentToken extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    commitment: PropTypes.object
  }

  link = null

  render() {
    const { commitment } = this.props
    return (
      <div className="commitment-token">
        { commitment.is_complete &&
          <span className="goal-token-complete">complete</span>
        }
        { commitment.resource !== null &&
          <div className="commitment-token-resource">
            <strong>{ commitment.resource.title }</strong>
            <div>{ commitment.resource.description }</div>
            { commitment.resource.url &&
              <div className="link" onClick={ this._handleView.bind(this, commitment.resource) }>View Resource</div>
            }
          </div>
        }
        { commitment.description &&
          <div className="commitment-token-description">
            { commitment.description }
          </div>
        }
        <a target="_blank" ref={ node => this.link = node} />
      </div>
    )
  }

  _handleView(resource, e) {
    const { router } = this.context
    e.stopPropagation()
    if(resource.asset_id) return router.history.push(`/assets/${resource.asset_id}`)
    if(resource.url) {
      const sanitized = resource.url.replace('https://mahaplatform.com', '')
      if(sanitized[0] === '/')return router.history.push(sanitized)
      this.link.href =sanitized
      this.link.click()
    }
  }

}

export default CommitmentToken
