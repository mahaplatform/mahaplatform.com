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
    endpoint: PropTypes.string,
    format: PropTypes.any,
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
      <div className="maha-criteriafield" tabIndex={ tabIndex } onClick={ this._handleBegin.bind(this) }>
        { criteria &&
          <div className="maha-criteriafield-label" />
        }
        { criteria &&
          <div className="maha-criteriafield-clear">
            <i className="fa fa-times" onClick={ this._handleClear.bind(this) } />
          </div>
        }
        { !criteria &&
          <div className="maha-criteriafield-prompt">
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
    const { cid, criteria, endpoint, format, fields, onSet } = this.props
    return {
      cid,
      criteria,
      endpoint,
      format,
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
