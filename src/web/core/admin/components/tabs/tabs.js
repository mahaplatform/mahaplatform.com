import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Tabs extends React.Component {

  static contextTypes = {
    stack: PropTypes.object
  }

  static propTypes = {
    chosen: PropTypes.number,
    header: PropTypes.any,
    items: PropTypes.array,
    onChoose: PropTypes.func
  }

  static defaultProps = {
    chosen: null,
    header: null,
    items: [],
    onChoose: (index) => {}
  }

  state = {
    visited: [],
    transitioning: false
  }

  render() {
    const { header, items } = this.props
    return (
      <div className="maha-tabs">
        <div className="maha-tabs-header">
          { header &&
            <div className="maha-tabs-header-content">
              { _.isFunction() ? React.createElement(header) : header }
            </div>
          }
          <div className="maha-tabs-items">
            { items.length > 1 && items.map((item, index) => (
              <div key={`tab_${index}`} className={ this._getItemClass(index) } onClick={ this._handleChoose.bind(this, index) }>
                { item.label }
              </div>
            )) }
          </div>
        </div>
        <div className="maha-tabs-body">
          { items.map((item, index) => (
            <div key={`tab_body_${index}`} className={ this._getTabClass(index) }>
              <div className="maha-tab-content">
                { _.isFunction() ? React.createElement(item.component) : item.component }
              </div>
            </div>
          )) }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onChoose(0)
  }

  _getItemClass(index) {
    const { chosen } = this.props
    const classes = ['maha-tabs-item']
    if(index === chosen) classes.push('active')
    return classes.join(' ')
  }

  _getTabClass(index) {
    const { transitioning } = this.state
    const { chosen } = this.props
    const classes = ['maha-tab']
    if(transitioning) classes.push('transitioning')
    if(index > chosen) classes.push('right')
    if(index < chosen) classes.push('left')
    if(index === chosen) classes.push('active')
    return classes.join(' ')
  }

  _handleChoose(index) {
    const { onChoose } = this.props
    const visited = _.uniq([ ...this.state.visited, index ])
    this.setState({ visited, transitioning: true })
    setTimeout(() => onChoose(index), 20)
    setTimeout(() => this.setState({ transitioning: false }), 520)
  }

}

export default Tabs
