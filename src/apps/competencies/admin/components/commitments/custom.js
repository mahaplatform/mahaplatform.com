import PropTypes from 'prop-types'
import React from 'react'

class Custom extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  input = null

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-header" onClick={ this._handleBack }>
          <div className="competencies-resources-panel-header-back">
            <i className="fa fa-chevron-left" />
          </div>
          <div className="competencies-resources-panel-header-label">
            Custom Commitment
          </div>
        </div>
        <div className="competencies-resources-panel-body">
          <div className="competencies-resources-custom">
            <div className="competencies-resources-custom-body">
              <textarea ref={ node => this.input = node } />
            </div>
            <div className="competencies-resources-custom-footer">
              <div className="ui fluid red button" onClick={ this._handleAdd }>
                Add Commitment
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleAdd() {
    this.props.onBack()
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(item) {
    this.props.onChoose(item)
  }


}

export default Custom
