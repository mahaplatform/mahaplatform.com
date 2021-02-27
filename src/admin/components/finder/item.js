import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Item extends React.PureComponent {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.array,
    count: PropTypes.number,
    expanded: PropTypes.array,
    handler: PropTypes.func,
    icon: PropTypes.string,
    index: PropTypes.string,
    label: PropTypes.string,
    padding: PropTypes.number,
    selectable: PropTypes.bool,
    selected: PropTypes.string,
    tasks: PropTypes.array,
    onExpand: PropTypes.func,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    count: 0,
    padding: 0,
    selectable: true
  }

  _handleSelect = this._handleSelect.bind(this)
  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { children, count, icon, label, padding, tasks } = this.props
    const is_expanded = this._getIsExpanded()
    return (
      <Fragment>
        <div className={ this._getClass(is_expanded) } onClick={ this._handleSelect }>
          { padding > 0 &&
            <Fragment>
              { Array(padding).fill(0).map((i, index) => (
                <div className="maha-finder-item-padding" key={`padding_${index}`} />
              ))}
            </Fragment>
          }
          { children ?
            <div className="maha-finder-item-toggle">
              <i className={`fa fa-${this._getExpander(is_expanded) }`} />
            </div> :
            <div className="maha-finder-item-padding" />
          }
          { icon &&
            <div className="maha-finder-item-icon">
              <i className={`fa fa-${icon}`} />
              { count > 0 &&
                <i className="fa fa-circle" />
              }
            </div>
          }
          <div className="maha-finder-item-details">
            { label }
          </div>
          { tasks &&
            <div className="maha-finder-item-action" onClick={ this._handleTasks }>
              <i className="fa fa-ellipsis-v" />
            </div>
          }
        </div>
        { is_expanded && children &&
          <Fragment>
            { children.map((child, index) => (
              <Item { ...this._getChild(child, index) } key={`item_${index}`} />
            )) }
          </Fragment>
        }
      </Fragment>
    )
  }

  _getClass(is_expanded) {
    const { handler, index, selected } = this.props
    const classes = ['maha-finder-item']
    if(is_expanded) classes.push('active')
    if(index === selected && handler) classes.push('selected')
    return classes.join(' ')
  }

  _getChild(child, cindex) {
    const { expanded, index, padding, selected, onExpand, onSelect } = this.props
    return {
      ...child,
      expanded,
      index: `${index}.${cindex}`,
      padding: padding + 1,
      selected,
      onExpand,
      onSelect
    }
  }

  _getIsExpanded() {
    const { index, expanded } = this.props
    return _.includes(expanded, index)
  }

  _getExpander(is_expanded) {
    return is_expanded ? 'chevron-down' : 'chevron-right'
  }

  _handleSelect(e) {
    e.stopPropagation()
    const { children, handler, index, selectable, selected } = this.props
    if(!selectable) return
    if(children) this.props.onExpand(index)
    if(!handler || index === selected) return
    this.props.onSelect(index)
    handler()
  }

  _handleTasks(e) {
    e.stopPropagation()
    const { tasks } = this.props
    this.context.tasks.open({
      items: tasks
    })
  }

}

export default Item
