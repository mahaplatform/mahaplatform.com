import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Tabs extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    header: PropTypes.any,
    items: PropTypes.array,
    onChoose: PropTypes.func
  }

  static defaultProps = {
    header: null,
    items: [],
    onChoose: (index) => {}
  }

  state = {
    chosen: null,
    visited: [],
    transitioning: false
  }

  render() {
    const { header } = this.props
    const items = this._getAllowed()
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
    this.setState({
      chosen: 0
    })
  }

  _getAllowed() {
    const { admin } = this.context
    const { items } = this.props
    return items.filter(item => {
      if(item.show !== undefined && !item.show) return false
      if(item.rights !== undefined && !_.includes(admin.rights, item.rights[0])) return false
      return true
    })
  }

  _getItemClass(index) {
    const { chosen } = this.state
    const classes = ['maha-tabs-item']
    if(index === chosen) classes.push('active')
    return classes.join(' ')
  }

  _getTabClass(index) {
    const { transitioning } = this.state
    const { chosen } = this.state
    const classes = ['maha-tab']
    if(transitioning) classes.push('transitioning')
    if(index > chosen) classes.push('right')
    if(index < chosen) classes.push('left')
    if(index === chosen) classes.push('active')
    return classes.join(' ')
  }

  _handleChoose(chosen) {
    const visited = _.uniq([ ...this.state.visited, chosen ])
    this.setState({ visited, transitioning: true })
    setTimeout(() => {
      this.setState({ chosen })
    }, 20)
    setTimeout(() => this.setState({ transitioning: false }), 520)
  }

}

export default Tabs
