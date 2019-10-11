import { Loader, Message, ModalPanel, TextField } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Chooser extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    address: PropTypes.object,
    chosen: PropTypes.number,
    numbers: PropTypes.array,
    status: PropTypes.string,
    onLookup: PropTypes.func,
    onChoose: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    const { numbers } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="numberfield">
          <div className="numberfield-header">
            <TextField { ...this._getAreacode() } />
          </div>
          <div className="numberfield-body">
            { status === 'loading' && <Loader /> }
            { numbers &&
              <div className="numberfield-list">
                { numbers.map((number, index) => (
                  <div className="numberfield-number" key={`number_${index}`} onClick={ this._handleChoose.bind(this, index) }>
                    <div className="numberfield-number-icon">
                      <i className="fa fa-mobile" />
                    </div>
                    <div className="numberfield-number-label">
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

  _getPanel() {
    return {
      title: 'Choose Phone Number',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getAreacode() {
    return {
      maxlength: 3,
      placeholder: 'Enter your area code',
      onChange: this._handleChange
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange(areacode) {
    if(areacode.length < 3) return
    this.props.onLookup(areacode)
  }

  _handleChoose(index) {
    this.props.onChoose(index)
    this.context.form.pop()
  }

}

const mapStateToProps = (state, props) => ({
  chosen: state.team.numberfield[props.cid].chosen,
  numbers: state.team.numberfield[props.cid].numbers
})

export default connect(mapStateToProps)(Chooser)
