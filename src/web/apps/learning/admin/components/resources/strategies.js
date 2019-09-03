import PropTypes from 'prop-types'
import React from 'react'

class Strategies extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onChoose: PropTypes.func
  }

  strategies = [
    { label: 'Browse by Classification', icon: 'briefcase', code: 'classification' },
    { label: 'Browse by Category', icon: 'tag', code: 'category' },
    { label: 'Browse all', icon: 'cube', code: 'resources' }
  ]

  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-body">
          <div className="competencies-resources-strategies">
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
    )
  }

  _handleChoose(strategy) {
    this.props.onChoose(strategy)
  }

}

export default Strategies
