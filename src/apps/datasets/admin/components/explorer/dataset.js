import NewType from '../../views/types/new'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Type from './type'

const views = [
  { icon: 'shield', label: 'Access', code: 'access', children: false },
  { icon: 'copy', label: 'Types', code: 'types', children: true }
]
class Dataset extends React.PureComponent {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    dataset: PropTypes.object,
    selected: PropTypes.object,
    onSelect: PropTypes.func
  }

  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { dataset, selected } = this.props
    const { dview } = selected
    const expanded = this._getExpanded()
    return (
      <Fragment>
        <div className={ this._getClass() } onClick={ this._handleSelect.bind(this, null) }>
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
            { views.map((view, index) => (
              <div className={ this._getViewClass(view.code) } key={`view_${index}`} onClick={ this._handleSelect.bind(this, view.code) }>
                <div className="datasets-explorer-item-padding" />
                { view.children ?
                  <div className="datasets-explorer-item-toggle">
                    <i className={`fa fa-${this._getViewIcon(view.code) }`} />
                  </div> :
                  <div className="datasets-explorer-item-padding" />
                }
                <div className="datasets-explorer-item-icon" >
                  <i className={`fa fa-${view.icon}`} />
                </div>
                <div className="datasets-explorer-item-details" >
                  { view.label}
                </div>
                <div className="datasets-explorer-item-action" onClick={ this._handleTasks }>
                  <i className="fa fa-ellipsis-v" />
                </div>
              </div>
            )) }
            { dview === 'types' &&
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
        }
      </Fragment>
    )
  }

  _getClass() {
    const { dataset, selected } = this.props
    const { dataset_id, dview, type_id, tview } = selected
    const classes = ['datasets-explorer-item']
    // if(dataset_id === dataset.id && !dview && !type_id && !tview) classes.push('selected')
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

  _getViewClass(code) {
    const { dataset, selected } = this.props
    const { dataset_id, dview, type_id, tview } = selected
    const classes = ['datasets-explorer-item']
    // if(dataset_id === dataset.id && dview === code && !type_id && !tview) classes.push('selected')
    return classes.join(' ')
  }

  _getViewIcon(code) {
    const { dview } = this.props.selected
    const expanded = code === dview && code === 'types'
    return expanded ? 'chevron-down' : 'chevron-right'

  }

  _handleSelect(code, e) {
    e.stopPropagation()
    const { dataset, selected } = this.props
    const { dataset_id, dview } = selected
    if(dataset_id === dataset.id && !code) {
      return this.props.onSelect({})
    }
    this.props.onSelect({
      dataset_id: dataset.id,
      dview: code !== dview ? code : null
    })
  }

  _handleTasks(e) {
    e.stopPropagation()
    const { dataset } = this.props
    this.context.tasks.open({
      items: [
        { label: 'Add Type', modal: <NewType dataset={ dataset } /> },
        { label: 'Manage Access' },
        { label: 'Delete Dataset' }
      ]
    })
  }

}

export default Dataset
