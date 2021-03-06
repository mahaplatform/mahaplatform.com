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
    type: PropTypes.string,
    onChoose: PropTypes.func
  }

  static defaultProps = {
    chosen: null,
    items: [],
    type: 'item',
    onChoose: (index) => {}
  }

  state = {
    visited: [],
    transitioning: false
  }

  render() {
    const { items, type } = this.props
    return (
      <div className={`maha-menus maha-menus-${type}`}>
        <div className="maha-menus-header">
          <div className="maha-menus-header-menu">
            <div className={ this._getClass() }>
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

  _getClass() {
    const { items, type } = this.props
    const numbers = ['zero','one','two','three','four','five','six','seven','eight']
    const classes = ['ui',numbers[items.length],'item']
    if(type === 'pointing') classes.push('secondary pointing')
    classes.push('menu')
    return classes.join(' ')
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

  _handleChoose(index) {
    const { onChoose } = this.props
    const visited = _.uniq([ ...this.state.visited, index ])
    this.setState({ visited, transitioning: true })
    setTimeout(() => onChoose(index), 20)
    setTimeout(() => this.setState({ transitioning: false }), 500)
  }

}

export default Menu
