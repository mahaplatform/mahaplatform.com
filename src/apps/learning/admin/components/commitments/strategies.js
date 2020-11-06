import { Message } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Strategies extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onChoose: PropTypes.func
  }

  strategies = [
    { label: 'Assign by goal', icon: 'trophy', code: 'goal' },
    { label: 'Assign by classification', icon: 'briefcase', code: 'classification' },
    { label: 'Assign by category', icon: 'tag', code: 'category' },
    { label: 'Assign by resource', icon: 'cube', code: 'resources' },
    { label: 'Add a custom commitment', icon: 'pencil', code: 'custom' }
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
      icon: 'handshake-o',
      title: 'Make Some Commitments',
      text: 'Based on your goals, make some commitments to your personal development'
    }
  }

  _handleChoose(strategy) {
    this.props.onChoose(strategy)
  }

}

export default Strategies
