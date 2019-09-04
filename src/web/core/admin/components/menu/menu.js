import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Menu extends React.Component {

  static contextTypes = {
    stack: PropTypes.object
  }

  static propTypes = {
    chosen: PropTypes.number,
    items: PropTypes.array,
    onChoose: PropTypes.func
  }

  static defaultProps = {
    chosen: null,
    items: [],
    onChoose: (index) => {}
  }

  _swipe: Object = {}

  state = {
    visited: [],
    transitioning: false
  }

  render() {
    const { items } = this.props
    const numbers = ['zero','one','two','three']
    return (
      <div className="maha-menus">
        <div className="maha-menus-header">
          <div className="maha-menus-header-menu">
            <div className={`ui ${numbers[items.length]} item menu`}>
              { items.map((item, index) => (
                <a key={`menu_${index}`} className={ this._getItemClass(index) } onClick={ this._handleChoose.bind(this, index) }>
                  { item.label }
                </a>
              )) }
            </div>
          </div>
        </div>
        <div className="maha-menus-body">
          { items.map((item, index) => (
            <div key={`menu_body_${index}`} className={ this._getTabClass(index) }>
              <div className="maha-menus-menu-content">
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
    const classes = ['item']
    if(index === chosen) classes.push('active')
    return classes.join(' ')
  }

  _getTabClass(index) {
    const { transitioning } = this.state
    const { chosen } = this.props
    const classes = ['maha-menus-menu']
    if(transitioning) classes.push('transitioning')
    if(index > chosen) classes.push('right')
    if(index < chosen) classes.push('left')
    if(index === chosen) classes.push('active')
    return classes.join(' ')
  }

  _getComponent(index) {
    const { chosen } = this.props
    return {
      active: (index === chosen)
    }
  }

  _handleChoose(index: number): void {
    const { onChoose } = this.props
    const visited = _.uniq([ ...this.state.visited, index ])
    this.setState({ visited, transitioning: true })
    setTimeout(() => onChoose(index), 20)
    setTimeout(() => this.setState({ transitioning: false }), 500)
  }

}

export default Menu
