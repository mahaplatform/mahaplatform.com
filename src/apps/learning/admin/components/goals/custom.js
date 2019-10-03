import PropTypes from 'prop-types'
import React from 'react'

class Custom extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onAdd: PropTypes.func,
    onBack: PropTypes.func
  }

  input = null

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-header" onClick={ this._handleBack }>
          <div className="competencies-resources-panel-header-back">
            <i className="fa fa-chevron-left" />
          </div>
          <div className="competencies-resources-panel-header-label">
            Custom Goal
          </div>
        </div>
        <div className="competencies-resources-panel-body">
          <div className="competencies-resources-custom">
            <div className="competencies-resources-custom-body">
              <textarea ref={ node => this.input = node } />
            </div>
            <div className="competencies-resources-custom-footer">
              <div className="ui fluid red button" onClick={ this._handleAdd }>
                Add Goal
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleAdd() {
    this.props.onAdd({
      competency: null,
      description: this.input.value
    })
  }

  _handleBack() {
    this.props.onBack()
  }


}

export default Custom
