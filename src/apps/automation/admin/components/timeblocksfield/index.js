import TimeBlock from './timeblock'
import { Button } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class TimeBlocksField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: PropTypes.array,
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    timeblocks: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCreate = this._handleCreate.bind(this)

  render() {
    const { timeblocks } = this.state
    return (
      <div className="crm-recipientsfield">
        <div className="crm-recipientsfield-recipients">
          { timeblocks.map((timeblock, index) => (
            <div className="crm-recipientsfield-recipient" key={`timeblock_${index}`}>
              <div className="crm-recipientsfield-recipient-label">
                <div>
                  { timeblock.name }<br />
                  <span>{ this._getDescription(timeblock) }</span>
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
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      timeblocks: defaultValue
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { timeblocks } = this.state
    if(!_.isEqual(timeblocks, prevState.timeblocks)) {
      this.props.onChange(timeblocks)
    }
  }

  _getDescription(timeblock) {
    const days = ['Su','M','T','W','Th','F','Sa']
    return [
      days.filter((day, index) => {
        return _.includes(timeblock.days, index)
      }).join('/'),
      ...timeblock.times.map(time => {
        return [
          moment(`2020-01-01 ${time.start_time}`).format('h:mmA'),
          moment(`2020-01-01 ${time.end_time}`).format('h:mmA')
        ].join('-')
      })
    ].join(', ')
  }

  _getAdd() {
    return {
      label: 'Add Time Block',
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
    this.context.form.push(TimeBlock, this._getTimeBlock())
  }

  _handleCreate(timeblock) {
    const { timeblocks } = this.state
    this.setState({
      timeblocks: [
        ...timeblocks,
        timeblock
      ]
    })
  }

  _handleRemove(remove) {
    const { timeblocks } = this.state
    this.setState({
      timeblocks: timeblocks.filter((timeblock, index) => {
        return index !== remove
      })
    })
  }

}

export default TimeBlocksField
