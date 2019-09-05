import { connect } from 'react-redux'
import { Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Commitments extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    selected: PropTypes.array,
    onBack: PropTypes.func,
    onChoose: PropTypes.func,
    onRemove: PropTypes.func
  }

  link = null

  _handleBack = this._handleBack.bind(this)

  render() {
    const { selected } = this.props
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-header" onClick={ this._handleBack }>
          <div className="competencies-resources-panel-header-close">
            Close
          </div>
        </div>
        <div className="competencies-resources-panel-body">
          { selected.length > 0 ?
            <div className="competencies-resources-items">
              { selected.map((commitment, index) => (
                <div className="competencies-resources-item" key={`item_${index}`}>
                  <div className="competencies-resources-item-detail">
                    { commitment.resource !== null &&
                      <div className="commitment-token-resource">
                        <strong>{ commitment.resource.title }</strong>
                        <div>{ commitment.resource.description }</div>
                        { (commitment.resource.url || commitment.resource.asset) &&
                          <div className="link" onClick={ this._handleView.bind(this, commitment.resource) }>View Resource</div>
                        }
                      </div>
                    }
                    { commitment.description }
                  </div>
                  <div className="competencies-resources-item-proceed" onClick={ this._handleRemove.bind(this, index) }>
                    <i className="fa fa-fw fa-remove" />
                  </div>
                </div>
              ))}
            </div> :
            <Message { ...this._getEmpty() } />
          }
        </div>
        <a target="_blank" ref={ node => this.link = node} />
      </div>
    )
  }

  _getEmpty() {
    return {
      icon: 'handshake-o',
      title: 'No commitments',
      text: 'There are no commitments for this plan'
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleRemove(item) {
    this.props.onRemove(item)
  }

  _handleView(resource, e) {
    const { router } = this.context
    e.stopPropagation()
    if(resource.asset_id) return router.history.push(`/admin/assets/${resource.asset_id}`)
    if(resource.url) {
      this.link.href = resource.url
      this.link.click()
    }
  }

}

const mapStateToProps = (state, props) => ({
  selected: state.learning.commitments.selected
})

export default connect(mapStateToProps)(Commitments)
