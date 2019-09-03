import { Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Strategies extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onChoose: PropTypes.func
  }

  strategies = [
    { label: 'Assign by Classification', icon: 'briefcase', code: 'classification' },
    { label: 'Assign by Category', icon: 'tag', code: 'category' },
    { label: 'Assign by Competency', icon: 'cube', code: 'competencies' }
  ]

  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-body">
          <div className="competencies-resources-strategies">
            <div className="competencies-resources-strategies-header">
              <Message { ...this._getOverview() } />
            </div>
            <div className="competencies-resources-strategies-body">
              { this.strategies.map((strategy, index) => (
                <div className="competencies-resources-item" key={`strategy_${index}`} onClick={ this._handleChoose.bind(this, strategy.code) }>
                  <div className="competencies-resources-item-toggle">
                    <i className={`fa fa-fw fa-${ strategy.icon }`} />
                  </div>
                  <div className="competencies-resources-item-detail">
                    { strategy.label }
                  </div>
                  <div className="competencies-resources-item-proceed">
                    <i className="fa fa-chevron-right" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getOverview() {
    return {
      backgroundColor: 'red',
      icon: 'trophy',
      title: 'Set Your Goals',
      text: 'Choose one or two competencies that you\'d like to develop or improve'
    }
  }

  _handleChoose(strategy) {
    this.props.onChoose(strategy)
  }

}

export default Strategies
