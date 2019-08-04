import PropTypes from 'prop-types'
import Designer from './designer'
import React from 'react'
import _ from 'lodash'

class CriteriaField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    cid: PropTypes.string,
    contacts: PropTypes.array,
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Design criteria'
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleEnd = this._handleEnd.bind(this)

  render() {
    const { criteria, placeholder, tabIndex } = this.props
    return (
      <div className="crm-criteriafield" tabIndex={ tabIndex } onClick={ this._handleBegin.bind(this) }>
        { criteria &&
          <div className="crm-criteriafield-label" />
        }
        { criteria &&
          <div className="crm-criteriafield-clear">
            <i className="fa fa-times" onClick={ this._handleClear.bind(this) } />
          </div>
        }
        { !criteria &&
          <div className="crm-criteriafield-prompt">
            { placeholder }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { criteria } = this.props
    if(!_.isEqual(criteria, prevProps.criteria)) {
      this.props.onChange(criteria)
    }
  }

  _getDesigner() {
    const { cid, criteria, fields, onSet } = this.props
    return {
      cid,
      criteria,
      fields,
      onChange: onSet,
      onEnd: this._handleEnd
    }
  }

  _handleBegin() {
    this.context.form.push(<Designer { ...this._getDesigner() } />)
  }

  _handleClear(e) {
    e.stopPropagation()
    this.props.onClear()
  }

  _handleEnd() {
    this.context.form.pop()
  }

}

export default CriteriaField
