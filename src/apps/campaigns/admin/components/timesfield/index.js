import { Button } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import Time from './time'
import React from 'react'
import _ from 'lodash'

class TimesField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: PropTypes.array,
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    times: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCreate = this._handleCreate.bind(this)

  render() {
    const { times } = this.state
    return (
      <div className="crm-recipientsfield">
        <div className="crm-recipientsfield-recipients">
          { times.map((time, index) => (
            <div className="crm-recipientsfield-recipient" key={`timeblock_${index}`}>
              <div className="crm-recipientsfield-recipient-label">
                <div>
                  <span>{ this._getDescription(time) }</span>
                </div>
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleRemove.bind(this, index)}>
                <i className="fa fa-pencil" />
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleRemove.bind(this, index)}>
                <i className="fa fa-times" />
              </div>
            </div>
          ))}
          <div className="crm-recipientsfield-recipients-add">
            <Button { ...this._getAdd() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // const { defaultValue } = this.props
    // if(defaultValue) this.setState({
    //   timeblocks: defaultValue
    // })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { times } = this.state
    if(!_.isEqual(times, prevState.times)) {
      this.props.onChange(times)
    }
  }

  _getDescription(time) {
    return [
      moment(`2020-01-01 ${time.start_time}`).format('h:mmA'),
      moment(`2020-01-01 ${time.end_time}`).format('h:mmA')
    ].join('-')
  }

  _getAdd() {
    return {
      label: 'Add Time',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getTimeBlock() {
    return {
      onDone: this._handleCreate
    }
  }

  _handleAdd() {
    this.context.form.push(Time, this._getTimeBlock())
  }

  _handleCreate(time) {
    const { times } = this.state
    this.setState({
      times: [
        ...times,
        time
      ]
    })
  }

  _handleRemove(remove) {
    const { times } = this.state
    this.setState({
      times: times.filter((time, index) => {
        return index !== remove
      })
    })
  }

}

export default TimesField
