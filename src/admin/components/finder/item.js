import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

class Item extends React.PureComponent {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.array,
    count: PropTypes.number,
    handler: PropTypes.func,
    icon: PropTypes.string,
    index: PropTypes.string,
    label: PropTypes.string,
    padding: PropTypes.number,
    selectable: PropTypes.bool,
    selected: PropTypes.string,
    tasks: PropTypes.array,
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
    const expanded = this._getExpanded()
    return (
      <Fragment>
        <div className={ this._getClass(expanded) } onClick={ this._handleSelect }>
          { padding > 0 &&
            <Fragment>
              { Array(padding).fill(0).map((i, index) => (
                <div className="maha-finder-item-padding" key={`padding_${index}`} />
              ))}
            </Fragment>
          }
          { children ?
            <div className="maha-finder-item-toggle">
              <i className={`fa fa-${this._getExpander(expanded) }`} />
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
        { expanded && children &&
          <Fragment>
            { children.map((child, index) => (
              <Item { ...this._getChild(child, index) } key={`item_${index}`} />
            )) }
          </Fragment>
        }
      </Fragment>
    )
  }

  _getClass(expanded) {
    const { handler, index, selected } = this.props
    const classes = ['maha-finder-item']
    if(expanded) classes.push('active')
    if(index === selected && handler) classes.push('selected')
    return classes.join(' ')
  }

  _getChild(child, cindex) {
    const { index, padding, selected, onSelect } = this.props
    return {
      ...child,
      index: `${index}.${cindex}`,
      padding: padding + 1,
      selected,
      onSelect
    }
  }

  _getExpanded() {
    const { index, selected } = this.props
    return index === selected.substr(0, index.length)
  }

  _getExpander(expanded) {
    return expanded ? 'chevron-down' : 'chevron-right'
  }

  _handleSelect(e) {
    e.stopPropagation()
    const { handler, index, selectable } = this.props
    if(!selectable) return
    this.props.onSelect(index)
    if(handler) handler()
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
