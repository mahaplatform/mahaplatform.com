import Format from '../format'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Item extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    component: PropTypes.any,
    content: PropTypes.any,
    empty: PropTypes.string,
    extra: PropTypes.any,
    format: PropTypes.any,
    handler: PropTypes.func,
    icon: PropTypes.string,
    if: PropTypes.bool,
    label: PropTypes.string,
    link: PropTypes.string,
    route: PropTypes.string,
    tasks: PropTypes.object,
    units: PropTypes.string
  }

  _handleClick = this._handleClick.bind(this)
  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { alt, component, content, empty, extra, format, handler, icon, label, link, route, tasks, units } = this.props
    if(this.props.if === false) return null
    return (
      <div className={ this._getClass() } onClick={ this._handleClick }>
        { icon &&
          <div className="maha-list-item-icon">
            <i className={`fa fa-fw fa-${icon}`} />
          </div>
        }
        { component &&
          <div className="maha-list-item-component">
            { _.isFunction(component) ? React.createElement(component, content) : component }
          </div>
        }
        { !component &&
          <div className="maha-list-item-content">
            { label && <div className="maha-list-item-content-label">{ label }</div> }
            <div className="maha-list-item-content-value">
              { !_.isNil(content) && <Format { ...content } format={ format } value={ content } /> }
              { !_.isNil(content) && units && ` ${units}` }
              { _.isNil(content) && alt && <span>{ alt}</span> }
              { _.isNil(content) && empty && <span className="maha-list-item-content-empty">{ empty }</span>}
            </div>
          </div>
        }
        { extra &&
          <div className="maha-list-item-extra">
            { _.isFunction(extra) ? React.createElement(extra, content) : extra }
          </div>
        }
        { tasks &&
          <div className="maha-list-item-proceed" onClick={ this._handleTasks }>
            <i className="fa fa-fw fa-ellipsis-v" />
          </div>
        }
        { (handler || link || route) &&
          <div className="maha-list-item-proceed">
            <i className="fa fa-fw fa-chevron-right" />
          </div>
        }
      </div>
    )
  }

  _handleClick() {
    const { link, handler, route } = this.props
    if(link) this.context.router.history.push(link)
    if(route) this.context.router.history.push(route)
    if(handler) handler()
  }

  _getClass() {
    const { className, handler, link, route } = this.props
    const classes = ['maha-list-item']
    if(className) classes.push(className)
    if(link || handler || route) classes.push('maha-list-item-link')
    return classes.join(' ')
  }

  _handleTasks(e) {
    const { tasks } = this.props
    e.preventDefault()
    this.context.tasks.open({
      items: tasks
    })
  }

}

export default Item
