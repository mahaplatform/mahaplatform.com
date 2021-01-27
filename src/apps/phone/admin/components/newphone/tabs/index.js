import PropTypes from 'prop-types'
import Programs from './programs'
import React from 'react'

class Tabs extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    tabs: PropTypes.array,
    onProgram: PropTypes.func
  }

  state = {
    selected: 0
  }

  render() {
    const { selected } = this.state
    const { tabs } = this.props
    const tab = tabs[selected]
    return (
      <div className="maha-phone-client">
        <div className="maha-phone-client-header">
          <Programs { ...this._getPrograms() } />
        </div>
        <div className="maha-phone-client-body">
          <tab.component { ...this._getProps() } />
        </div>
        <div className="maha-phone-client-footer">
          { tabs.map((tab, index) =>(
            <div { ...this._getTab(index) } key={`tab_${index}`}>
              { tab.icon &&
                <i className={`fa fa-${ tab.icon }`} />
              }
              { (tab.count !== undefined && tab.count > 0) &&
                <div className="maha-phone-client-footer-item-count">
                  { tab.count }
                </div>
              }
              <span>{ tab.label }</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  _getTab(index) {
    const { selected } = this.state
    const classes = ['maha-phone-client-footer-item']
    if(index === selected) classes.push('selected')
    return {
      className: classes.join(' '),
      onClick: this._handleSelect.bind(this, index)
    }
  }

  _getProps(index) {
    const { selected } = this.state
    const { props } = this.props.tabs[selected]
    if(_.isFunction(props)) return props()
    if(_.isPlainObject(props)) return props
    return {}
  }

  _getPrograms() {
    const { program, onProgram } = this.props
    return {
      program,
      onChange: onProgram
    }
  }

  _handleSelect(selected) {
    return this.setState({ selected })
  }

}

export default Tabs
