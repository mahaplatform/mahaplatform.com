import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const views = [
  { icon: 'check-square', label: 'Fields', code: 'fields' },
  { icon: 'filter', label: 'Filters', code: 'filters' },
  { icon: 'table', label: 'Data', code: 'data' }
]

class Type extends React.PureComponent {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    dataset: PropTypes.object,
    selected: PropTypes.object,
    type: PropTypes.object,
    onSelect: PropTypes.func
  }

  _handleTasks = this._handleTasks.bind(this)

  render() {
    const expanded = this._getExpanded()
    const { type } = this.props
    return (
      <Fragment>
        <div className="datasets-explorer-item" onClick={ this._handleSelect.bind(this, null) }>
          <div className="datasets-explorer-item-padding" />
          <div className="datasets-explorer-item-padding" />
          <div className="datasets-explorer-item-toggle">
            <i className={`fa fa-${this._getIcon() }`} />
          </div>
          <div className="datasets-explorer-item-icon" >
            <i className="fa fa-file-o" />
          </div>
          <div className="datasets-explorer-item-details" >
            { type.title}
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
                <div className="datasets-explorer-item-padding" />
                <div className="datasets-explorer-item-padding" />
                <div className="datasets-explorer-item-padding" />
                <div className="datasets-explorer-item-icon" >
                  <i className={`fa fa-${view.icon}`} />
                </div>
                <div className="datasets-explorer-item-details" >
                  { view.label}
                </div>
              </div>
            )) }
          </Fragment>
        }
      </Fragment>
    )
  }

  _getExpanded() {
    const { dataset, type, selected } = this.props
    return dataset.id === selected.dataset_id && type.id === selected.type_id
  }

  _getIcon() {
    const expanded = this._getExpanded()
    return expanded ? 'chevron-down' : 'chevron-right'
  }

  _getViewClass(code) {
    const { tview } = this.props.selected
    const classes = ['datasets-explorer-item']
    if(code === tview  ) classes.push('selected')
    return classes.join(' ')
  }

  _handleSelect(code, e) {
    e.stopPropagation()
    const { dataset, type, selected } = this.props
    const { dataset_id, dview, type_id } = selected
    if(dataset_id === dataset.id && type_id === type.id && !code) {
      return this.props.onSelect({
        dataset_id,
        dview
      })
    }
    this.props.onSelect({
      dataset_id: dataset.id,
      dview: 'types',
      type_id: type.id,
      tview: code
    })
  }

  _handleTasks(e) {
    const { dataset, type } = this.props
    e.stopPropagation()
    this.context.tasks.open({
      items: [
        {
          label: 'Delete Type',
          confirm: `
            Are you sure you want to delete this type? It will also delete
            all related data.
          `,
          request: {
            endpoint: `/api/admin/datasets/datasets/${dataset.id}/types/${type.id}`,
            method: 'delete',
            onFailure: () => {},
            onSuccess: () => {}
          }
        }
      ]
    })
  }

}

export default Type
