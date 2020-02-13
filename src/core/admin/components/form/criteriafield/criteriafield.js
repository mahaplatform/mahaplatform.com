import PropTypes from 'prop-types'
import Designer from './designer'
import pluralize from 'pluralize'
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
    entity: PropTypes.string,
    endpoint: PropTypes.string,
    format: PropTypes.any,
    fields: PropTypes.array,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Design criteria',
    entity: 'item'
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleEnd = this._handleEnd.bind(this)

  render() {
    const { criteria, entity, placeholder, tabIndex } = this.props
    return (
      <div className="maha-input" tabIndex={ tabIndex } onClick={ this._handleBegin }>
        <div className="maha-input-field">
          { criteria ?
            <div className="maha-input-tokens">
              <div className="maha-input-token">
                { pluralize(entity, 5, true) }
              </div>
            </div> :
            <div className="maha-input-placeholder">
              { placeholder }
            </div>
          }
        </div>
        { criteria &&
          <div className="maha-input-clear">
            <i className="fa fa-times" onClick={ this._handleClear } />
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
    const { criteria, endpoint, format, fields, title, onSet } = this.props
    return {
      criteria,
      endpoint,
      format,
      fields,
      title,
      onDone: onSet
    }
  }

  _handleBegin() {
    this.context.form.push(Designer, this._getDesigner.bind(this))
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
