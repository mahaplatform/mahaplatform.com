import { connect } from 'react-redux'
import { Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Goals extends React.Component {

  static propTypes = {
    selected: PropTypes.array,
    onBack: PropTypes.func,
    onChoose: PropTypes.func,
    onRemove: PropTypes.func
  }

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
              { selected.map((item, index) => (
                <div className="competencies-resources-item" key={`item_${index}`}>
                  <div className="competencies-resources-item-detail">
                    <strong>{ item.title }</strong>
                    <div>{ item.description }</div>
                    { item.url &&
                      <div className="link" onClick={ this._handleView.bind(this, item) }>View Resource</div>
                    }
                  </div>
                  <div className="competencies-resources-item-proceed" onClick={ this._handleRemove.bind(this, item) }>
                    <i className="fa fa-fw fa-remove" />
                  </div>
                </div>
              ))}
            </div> :
            <Message { ...this._getEmpty() } />
          }
        </div>
      </div>
    )
  }

  _getEmpty() {
    return {
      icon: 'trophy',
      title: 'No goals',
      text: 'There are no goals for this plan'
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleRemove(item) {
    this.props.onRemove(item)
  }

  _handleView(item, e) {
    e.stopPropagation()
  }

}

const mapStateToProps = (state, props) => ({
  selected: state.learning.goals.selected
})

export default connect(mapStateToProps)(Goals)
