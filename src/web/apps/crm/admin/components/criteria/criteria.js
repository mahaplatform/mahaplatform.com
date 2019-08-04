import { CSSTransition } from 'react-transition-group'
import Criterion from './criterion'
import PropTypes from 'prop-types'
import Item from './item'
import React from 'react'
import _ from 'lodash'

class Criteria extends React.Component {

  static contextTypes = {}

  static propTypes = {
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    panel: PropTypes.object,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onCreate: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    const { panel, criteria } = this.props
    return (
      <div className="crm-criteria">
        <div className="crm-criteria-items">
          { criteria && Object.keys(criteria).length > 0 &&
            <Item { ...this._getItem(criteria) } />
          }
        </div>
        <CSSTransition in={ panel !== null } classNames="expanded" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="crm-criteria-panel">
            { panel && <Criterion { ...this._getCriterion() } /> }
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { criteria } = this.props
    if(!_.isEqual(criteria, prevProps.criteria)) {
      this.props.onChange(criteria)
    }
  }

  _getCriterion() {
    const { fields, panel, onCancel } = this.props
    const { cindex, criterion, mode } = panel
    const onDone = mode === 'new' ? this._handleCreate : this._handleUpdate
    return {
      defaultValue: criterion,
      fields,
      onCancel,
      onDone: onDone.bind(this, cindex)
    }
  }

  _getItem(criteria) {
    const { onAdd, onEdit, onRemove } = this.props
    return {
      criteria,
      onAdd,
      onEdit,
      onRemove
    }
  }

  _handleCreate(cindex, value) {
    this.props.onCreate(cindex, value)
  }

  _handleUpdate(cindex, value) {
    this.props.onUpdate(cindex, value)
  }

}

export default Criteria
