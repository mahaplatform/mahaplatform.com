import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Filters from '../filters'
import Export from './export'
import Button from '../button'
import React from 'react'
import _ from 'lodash'

class Tasks extends React.Component {

  static propTypes = {
    export: PropTypes.array,
    filters: PropTypes.array,
    open: PropTypes.bool,
    panel: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    tasks: PropTypes.array,
    onClearPanel: PropTypes.func,
    onAddPanel: PropTypes.func,
    onRemovePanel: PropTypes.func,
    onToggleTasks: PropTypes.func
  }

  render() {
    const { filters, open, panel, tasks } = this.props
    return (
      <div className="maha-collection-tasks">
        <div className="maha-collection-tasks-inner">
          <div className="maha-collection-tasks-panel-container">
            <div className="maha-collection-tasks-panel">
              <div className="maha-collection-tasks-panel-header mobile">
                <div className="maha-collection-tasks-panel-header-icon" />
                <div className="maha-collection-tasks-panel-header-title">
                  Tasks
                </div>
                <div className="maha-collection-tasks-panel-header-icon " onClick={ this._handleToggleTasks.bind(this) }>
                  Done
                </div>
              </div>
              <div className="maha-collection-tasks-panel-body">
                { filters &&
                  <div className="maha-collection-tasks-panel-item mobile" onClick={ this._handleFilter.bind(this) }>
                    <i className="fa fa-fw fa-filter" />Filter Records
                  </div>
                }
                { this.props.export &&
                  <div className="maha-collection-tasks-panel-item" onClick={ this._handleExport.bind(this) }>
                    <i className="fa fa-fw fa-download" />Export Records
                  </div>
                }
                { tasks && tasks.map((task, index) => (
                  <Button key={`task_${index}`} { ...this._getTask(task) } />
                )) }
              </div>
            </div>
          </div>
          <CSSTransition in={ open } classNames="cover" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="maha-collection-tasks-panel-container">
              { _.isFunction(panel) ? React.createElement(panel, this.props) : panel }
            </div>
          </CSSTransition>
        </div>
      </div>

    )
  }

  componentDidUpdate(prevProps) {
    const { open, onClearPanel } = this.props
    if(open !== prevProps.open && !open) {
      setTimeout(onClearPanel, 500)
    }
  }

  _getTask(task) {
    return {
      className: 'maha-collection-tasks-panel-item',
      label: task.label,
      mobile: task.mobile,
      icon: task.icon,
      rights: task.rights,
      ...this._getTaskAction(task)
    }
  }

  _getTaskAction(task) {
    if(task.panel) {
      return {
        handler: () => this.props.onAddPanel(task.panel)
      }
    }
    if(task.handler) {
      return {
        handler: () => task.handler(this.props)
      }
    }
    if(task.request) {
      return {
        request: () => task.request(this.props)
      }
    }
  }

  _handleToggleTasks() {
    this.props.onToggleTasks()
  }

  _handleFilter() {
    this.props.onAddPanel((props) => {
      const { entity, filters, filter, onSetFilter } = props
      const article = _.includes(['a','e','i','o'], entity[0]) ? 'an' : 'a'
      return React.createElement(Filters, {
        filters,
        values: filter,
        prompt: `Find ${article} ${entity}`,
        onUpdate: onSetFilter,
        onDone: () => this.props.onRemovePanel()
      })
    })
  }

  _handleExport() {
    this.props.onAddPanel((props) => {
      const { endpoint, entity, filter, sort, token } = props
      return React.createElement(Export, {
        defaultValue: this.props.export,
        endpoint,
        entity,
        filter,
        sort: sort.key ? (sort.order === 'desc' ? '-' : '') + sort.key : null,
        token,
        onDone: () => this.props.onRemovePanel()
      })
    })
  }


}

export default Tasks
