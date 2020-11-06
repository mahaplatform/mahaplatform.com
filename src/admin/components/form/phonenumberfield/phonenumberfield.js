import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import _ from 'lodash'

class PhoneNumberField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    chosen: PropTypes.number,
    cid: PropTypes.string,
    numbers: PropTypes.array,
    number: PropTypes.object,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onClear: PropTypes.func,
    onLookup: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { number } = this.props
    return (
      <div className="maha-input">
        <div className="maha-input-field" onClick={ this._handleBegin }>
          { number ?
            <div className="maha-input-tokens">
              <div className="maha-input-token">
                { number.friendlyName }
              </div>
            </div> :
            <div className="maha-input-placeholder">
              Choose a number
            </div>
          }
        </div>
        { number &&
          <div className="maha-input-clear" onClick={ this._handleClear } >
            <i className="fa fa-times"/>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { number } = this.props
    if(!_.isEqual(number, prevProps.number) && number) {
      this._handleChange()
    }
  }

  _getChooser() {
    const { cid, onChoose, onLookup } = this.props
    return {
      cid,
      onChoose,
      onLookup
    }
  }

  _handleBegin() {
    this.context.form.push(Chooser, this._getChooser.bind(this))
  }

  _handleChange() {
    const { phoneNumber, locality, region } = this.props.number
    this.props.onChange({ phoneNumber, locality, region })
  }

  _handleClear(e) {
    e.stopPropagation()
    this.props.onClear()
  }

}

export default PhoneNumberField
