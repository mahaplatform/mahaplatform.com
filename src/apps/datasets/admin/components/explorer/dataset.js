import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Type from './type'

class Dataset extends React.PureComponent {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    dataset: PropTypes.object,
    selected: PropTypes.object,
    onSelect: PropTypes.func
  }

  _handleSelect = this._handleSelect.bind(this)
  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { dataset } = this.props
    const expanded = this._getExpanded()
    return (
      <Fragment>
        <div className={ this._getClass() } onClick={ this._handleSelect }>
          <div className="datasets-explorer-item-toggle">
            <i className={`fa fa-${this._getIcon() }`} />
          </div>
          <div className="datasets-explorer-item-icon">
            <i className="fa fa-database" />
          </div>
          <div className="datasets-explorer-item-details">
            { dataset.title}
          </div>
          <div className="datasets-explorer-item-action" onClick={ this._handleTasks }>
            <i className="fa fa-ellipsis-v" />
          </div>
        </div>
        { expanded &&
          <Fragment>
            { dataset.types.length === 0 &&
              <div className="datasets-explorer-empty">
                no types
              </div>
            }
            { dataset.types.map((type, tindex) => (
              <Type { ...this._getType(type) } key={`type_${tindex}`} />
            )) }
          </Fragment>
        }
      </Fragment>
    )
  }

  _getClass() {
    const { dataset, selected } = this.props
    const { dataset_id, type_id, view } = selected
    const classes = ['datasets-explorer-item']
    if(dataset_id === dataset.id && !type_id && !view) classes.push('selected')
    return classes.join(' ')
  }

  _getExpanded() {
    const { dataset, selected } = this.props
    return dataset.id === selected.dataset_id
  }

  _getIcon() {
    const expanded = this._getExpanded()
    return expanded ? 'chevron-down' : 'chevron-right'
  }

  _getType(type) {
    const { dataset, selected, onSelect } = this.props
    return {
      dataset,
      selected,
      type,
      onSelect
    }
  }

  _handleSelect() {
    const { dataset } = this.props
    this.props.onSelect({
      dataset_id: dataset.id,
      type_id: null,
      view: null
    })
  }

  _handleTasks() {
    this.context.tasks.open({
      items: [
        { label: 'Add Type' },
        { label: 'Manage Access' },
        { label: 'Delete Dataset' }
      ]
    })
  }

}

export default Dataset
