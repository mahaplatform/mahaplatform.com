import PropTypes from 'prop-types'
import React from 'react'

class Strategies extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onChoose: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-body">
          <div className="competencies-resources-strategies">
            <div className="competencies-resources-item" onClick={ this._handleChoose.bind(this, 'classification') }>
              <div className="competencies-resources-item-toggle">
                <i className="fa fa-fw fa-briefcase" />
              </div>
              <div className="competencies-resources-item-detail">
                Assign a resource (by classification)
              </div>
              <div className="competencies-resources-item-proceed">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
            <div className="competencies-resources-item" onClick={ this._handleChoose.bind(this, 'category') }>
              <div className="competencies-resources-item-toggle">
                <i className="fa fa-fw fa-tag" />
              </div>
              <div className="competencies-resources-item-detail">
                Assign a resource (by category)
              </div>
              <div className="competencies-resources-item-proceed">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
            <div className="competencies-resources-item" onClick={ this._handleChoose.bind(this, 'goal') }>
              <div className="competencies-resources-item-toggle">
                <i className="fa fa-fw fa-star" />
              </div>
              <div className="competencies-resources-item-detail">
                Assign a resource (by goal)
              </div>
              <div className="competencies-resources-item-proceed">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
            <div className="competencies-resources-item" onClick={ this._handleChoose.bind(this, 'custom') }>
              <div className="competencies-resources-item-toggle">
                <i className="fa fa-fw fa-pencil" />
              </div>
              <div className="competencies-resources-item-detail">
                Add a custom commitment
              </div>
              <div className="competencies-resources-item-proceed">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleChoose(strategy) {
    this.props.onChoose(strategy)
  }

}

export default Strategies
