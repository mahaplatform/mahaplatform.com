import PropTypes from 'prop-types'
import Chooser from './chooser'
import moment from 'moment'
import React from 'react'

class Datefield extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    month: PropTypes.number,
    placeholder: PropTypes.string,
    prompt: PropTypes.string,
    tabIndex: PropTypes.number,
    year: PropTypes.number,
    value: PropTypes.any,
    onBegin: PropTypes.func,
    onBusy: PropTypes.func,
    onClear: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    onReady: PropTypes.func,
    onSetCurrent: PropTypes.func,
    onSetValue: PropTypes.func
  }

  static defaultProps = {
    defaultValue: null,
    disabled: false,
    placeholder: 'Choose a date',
    tabIndex: 0,
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {},
    onSet: () => {}
  }

  render() {
    const { prompt, placeholder, value, tabIndex } = this.props
    return (
      <div className="maha-datefield">
        <div className="maha-datefield-input" tabIndex={ tabIndex }>
          <div className="maha-datefield-field" onClick={ this._handleBegin.bind(this) }>
            { value ?
              <div className="maha-datefield-token">{ value.format('dddd, MMMM DD, YYYY') }</div> :
              <span>{ prompt || placeholder }</span>
            }
          </div>
          { value  &&
            <div className="maha-datefield-remove" onClick={ this._handleClear.bind(this) }>
              <i className="fa fa-times" />
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady, onSetCurrent, onSetValue } = this.props
    if(defaultValue) onSetValue(moment(defaultValue))
    const current = defaultValue ? moment(defaultValue) : moment()
    onSetCurrent(parseInt(current.format('MM')) - 1, parseInt(current.format('YYYY')))
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { active, value, onChange } = this.props
    const { form } = this.context
    if(prevProps.value !== value) {
      if(value) {
        onChange(value.format('YYYY-MM-DD'))
      } else  {
        onChange(value)
      }
    }
    if(active !== prevProps.active) {
      if(active) {
        form.push(<Chooser { ...this._getChooser() } />)
      } else  {
        form.pop()
      }
    }
  }

  _getInput() {
    const { prompt, value } = this.props
    return {
      type: 'text',
      value,
      autoComplete: false,
      prompt
    }
  }

  _getChooser() {
    return this.props
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleClear() {
    this.props.onClear()
  }

}

export default Datefield
