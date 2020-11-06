import { Message, TextArea } from '@admin'
import { connect } from 'react-redux'
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
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
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
          <div className="ui form">
            { selected.length > 0 ?
              <div className="competencies-resources-items">
                { selected.map((commitment, index) => (
                  <div className="competencies-resources-item" key={`item_${index}`}>
                    <div className="competencies-resources-item-detail">
                      { commitment.resource == null ?
                        <div className="commitment-token-resource">
                          <strong>Custom Commitment</strong>
                        </div> :
                        <div className="commitment-token-resource">
                          <strong>{ commitment.resource.title }</strong>
                          <div>{ commitment.resource.description }</div>
                        </div>
                      }
                      <div className="ui field">
                        <TextArea { ...this._getTextArea(commitment, index) } />
                      </div>
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

  _getTextArea(commitment, index) {
    return {
      placeholder: 'Add instructions',
      rows: 1,
      onChange: this._handleUpdate.bind(this, index),
      defaultValue: commitment.description
    }
  }

  _handleUpdate(index, description) {
    this.props.onUpdate(index, description)
  }

  _handleView(resource, e) {
    const { router } = this.context
    e.stopPropagation()
    if(resource.asset_id) return router.history.push(`/assets/${resource.asset_id}`)
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
