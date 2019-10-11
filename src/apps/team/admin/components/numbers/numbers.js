import { Loader, ModalPanel, TextField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Numbers extends React.PureComponent {

  static childContextTypes = {
    form: PropTypes.object
  }

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    areacode: PropTypes.object,
    address: PropTypes.object,
    filters: PropTypes.object,
    numbers: PropTypes.array,
    status: PropTypes.string,
    onLookup: PropTypes.func,
    onSave: PropTypes.func,
    onSetFilter: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { numbers } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="numbers">
          <div className="numbers-header">
            <TextField { ...this._getAreacode() } />
          </div>
          <div className="numbers-body">
            { status === 'loading' && <Loader /> }
            { numbers &&
              <div className="numbers-list">
                { numbers.map((number, index) => (
                  <div className="numbers-number" key={`number_${index}`} onClick={ this._handleChoose.bind(this, number) }>
                    <div className="numbers-number-icon">
                      <i className="fa fa-mobile" />
                    </div>
                    <div className="numbers-number-label">
                      <strong>{ number.friendlyName }</strong><br />
                      { number.locality }, { number.region }
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { filters, status } = this.props
    if(!_.isEqual(filters, prevProps.filters)) {
      if(filters.areacode !== null) {
        this._handleLookup()
      }
    }
    if(status !== prevProps.status && status === 'saved') {
      this.context.modal.close()
    }
  }

  getChildContext() {
    return {
      form: this.context.modal
    }
  }

  _getPanel() {
    return {
      title: 'Provision Phone Number',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _getAreacode() {
    return {
      placeholder: 'Enter your area code',
      onChange: this._handleChange.bind(this, 'areacode')
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(key, value) {
    this.props.onSetFilter(key, value)
  }

  _handleChoose(number) {
    const { phoneNumber, locality, region } = number
    this.props.onSave(phoneNumber, locality, region)
  }

  _handleLookup() {
    const { filters, onLookup } = this.props
    const { areacode } = filters
    onLookup(areacode)
  }

}

export default Numbers
