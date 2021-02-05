import PropTypes from 'prop-types'
import { Button } from '@admin'
import Option from './option'
import React from 'react'
import _ from 'lodash'

class Optionsfield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    users: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: PropTypes.array,
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    options: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCreate = this._handleCreate.bind(this)

  render() {
    const { options } = this.state
    return (
      <div className="crm-recipientsfield">
        <div className="crm-recipientsfield-recipients">
          { options.map((option, index) => (
            <div className="crm-recipientsfield-recipient" key={`option_${index}`}>
              <div className="crm-recipientsfield-recipient-label">
                <span className="crm-recipientsfield-recipient-extension">
                  { option.number }
                </span>
                { option.name }
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
      options: defaultValue
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { options } = this.state
    if(!_.isEqual(options, prevState.options)) {
      this.props.onChange(options)
    }
  }

  _getAdd() {
    return {
      label: 'Add Option',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getOption() {
    const { users } = this.props
    return {
      users,
      onDone: this._handleCreate
    }
  }

  _handleAdd() {
    this.context.form.push(Option, this._getOption())
  }

  _handleCreate(option) {
    const { options } = this.state
    this.setState({
      options: [
        ...options,
        option
      ]
    })
  }

  _handleRemove(remove) {
    const { options } = this.state
    this.setState({
      options: options.filter((option, index) => {
        return index !== remove
      })
    })
  }

}

export default Optionsfield
