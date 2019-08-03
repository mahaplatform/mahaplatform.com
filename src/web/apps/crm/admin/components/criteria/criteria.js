import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Item from './item'
import React from 'react'
import New from './new'
import _ from 'lodash'

class Criteria extends React.Component {

  static contextTypes = {}

  static propTypes = {
    adding: PropTypes.bool,
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    onChange: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    const { adding, criteria } = this.props
    return (
      <div className="crm-criteria">
        <div className="crm-criteria-items">
          { criteria && Object.keys(criteria).length > 0 &&
            <Item { ...this._getItem(criteria) } />
          }
        </div>
        <CSSTransition in={ adding } classNames="expanded" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <New { ...this._getNew() } />
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

  _getNew() {
    const { fields } = this.props
    return {
      fields
    }
  }

  _getItem(criteria) {
    const { onCreate, onRemove, onUpdate } = this.props
    return {
      criteria,
      onCreate,
      onRemove,
      onUpdate
    }
  }

}

export default Criteria
