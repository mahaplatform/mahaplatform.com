import PropTypes from 'prop-types'
import Designer from './designer'
import React from 'react'
import _ from 'lodash'

class Criteria extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    adding: PropTypes.bool,
    contacts: PropTypes.array,
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    onAdd: PropTypes.func,
    onBegin: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onEnd: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Design criteria'
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { contacts, criteria, placeholder, tabIndex } = this.props
    return (
      <div className="crm-criteria" tabIndex={ tabIndex } onClick={ this._handleBegin.bind(this) }>
        { criteria &&
          <div className="crm-criteria-label">
            <div className="crm-criteria-token">
              Your criteria currently matches { contacts ? contacts.length : 0 } contacts
            </div>
          </div>
        }
        { criteria &&
          <div className="crm-criteria-clear">
            <i className="fa fa-times" onClick={ this._handleClear.bind(this) } />
          </div>
        }
        { !criteria &&
          <div className="crm-criteria-prompt" onClick={ this._handleBegin.bind(this) }>
            { placeholder }
          </div>
        }
      </div>    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { form } = this.context
    const { active, criteria } = this.props
    if(!prevProps.active && active) {
      form.push(<Designer { ...this._getDesigner() } />)
    }
    if(!_.isEqual(criteria, prevProps.criteria)) {
      this.props.onChange(criteria)
    }
  }

  _getDesigner() {
    const { adding, criteria, fields, onAdd, onEnd, onRemove, onUpdate } = this.props
    return {
      adding,
      criteria,
      fields,
      onAdd,
      onEnd,
      onRemove,
      onUpdate
    }
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleClear(e) {
    e.stopPropagation()
    this.props.onClear()
  }


}

export default Criteria
