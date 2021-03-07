import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Times extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    onDone: PropTypes.func
  }

  state = {
    value: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { value } = this.state
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-times">
          { [...Array(48)].map((i, index) => {
            const time = moment().startOf('hour').add(((index + 1) / 2) - 0.5, 'hours')
            return (
              <div className="maha-time" key={`time_${index}`} onClick={ this._handleChoose.bind(this, time.format('H:mm')) }>
                { time.format('h:mm A') }
                { value === time.format('H:mm') && <i className="fa fa-fw fa-check" /> }
              </div>
            )
          }) }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount(){
    const { defaultValue } = this.props
    this.setState({
      value: defaultValue
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value && prevState.value !== null) {
      this._handleDone()
    }
  }

  _getPanel() {
    const { type } = this.props
    return {
      title: `Change ${type} time`,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChoose(value) {
    this.setState({
      value
    })
  }

  _handleDone() {
    const { value } = this.state
    const { type } = this.props
    this.props.onDone(type, value)
    this.context.form.pop()
  }
}

export default Times
