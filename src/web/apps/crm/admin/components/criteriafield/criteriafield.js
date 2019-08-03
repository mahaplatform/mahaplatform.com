import PropTypes from 'prop-types'
import Designer from './designer'
import React from 'react'
import _ from 'lodash'

class CriteriaField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    cid: PropTypes.string,
    contacts: PropTypes.array,
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    onBegin: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onEnd: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Design criteria'
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { contacts, criteria, placeholder, tabIndex } = this.props
    return (
      <div className="crm-criteriafield" tabIndex={ tabIndex } onClick={ this._handleBegin.bind(this) }>
        { criteria &&
          <div className="crm-criteriafield-label">
            <div className="crm-criteriafield-token">
              Your criteria currently matches { contacts ? contacts.length : 0 } contacts
            </div>
          </div>
        }
        { criteria &&
          <div className="crm-criteriafield-clear">
            <i className="fa fa-times" onClick={ this._handleClear.bind(this) } />
          </div>
        }
        { !criteria &&
          <div className="crm-criteriafield-prompt" onClick={ this._handleBegin.bind(this) }>
            { placeholder }
          </div>
        }
      </div>    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    console.log(defaultValue)
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
    const { cid, criteria, fields, onEnd } = this.props
    return {
      cid,
      criteria,
      fields,
      onEnd
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

export default CriteriaField
