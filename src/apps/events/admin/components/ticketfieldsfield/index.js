import { Button } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
import New from './new'
import _ from 'lodash'

const core = [
  { label: 'Gender', name: 'gender', type: 'radigroup' },
  { label: 'Age', name: 'age', type: 'dropdown' },
  { label: 'Race', name: 'race', type: 'checkboxes' },
  { label: 'Ethnicity', name: 'ethnicity', type: 'radiogroup' }
]

class TicketFieldsField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {}

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { fields } = this.state
    if(!fields) return null
    return (
      <div className="ticketfieldsfield">
        <div className="ticketfieldsfield-field">
          <div className="ticketfieldsfield-field-label">
            Name on Ticket <span>(textfield)</span>
          </div>
        </div>
        { core.map((field, index) => (
          <div className={ this._getClass(field.name) } key={`field_${index}`}>
            <div className="ticketfieldsfield-field-label">
              { field.label } <span>({ field.type })</span>
            </div>
            <div className="ticketfieldsfield-field-action" onClick={ this._handleToggle.bind(this, field.name)}>
              <i className={`fa fa-toggle-${ this._getIcon(field.name) }`} />
            </div>
          </div>
        ))}
        { fields.map((field, index) => (
          <div className="ticketfieldsfield-field" key={`field_${index}`}>
            <div className="ticketfieldsfield-field-label">
              { field.label } <span>({ field.type })</span>
            </div>
            <div className="ticketfieldsfield-field-action" onClick={ this._handleEdit.bind(this, field, index)}>
              <i className="fa fa-pencil" />
            </div>
            <div className="ticketfieldsfield-field-action" onClick={ this._handleRemove.bind(this, index)}>
              <i className="fa fa-times" />
            </div>
          </div>
        ))}
        <div className="ticketfieldsfield-add">
          <Button { ...this._getButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    this.setState(defaultValue || { hidden: [], fields: [] })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { fields, hidden } = this.state
    if(!_.isEqual(fields, prevState.fields)) {
      this._handleChange()
    }
    if(!_.isEqual(hidden, prevState.hidden)) {
      this._handleChange()
    }
  }

  _getButton() {
    return {
      label: 'Add field',
      className: 'link',
      handler: this._handleNew
    }
  }

  _getClass(name) {
    const { hidden } = this.state
    const classes = ['ticketfieldsfield-field']
    if(_.includes(hidden, name)) classes.push('hidden')
    return classes.join(' ')
  }

  _getEdit(field, index) {
    return {
      field,
      onBack: this._handleBack,
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _getIcon(name) {
    const { hidden } = this.state
    return _.includes(hidden, name) ? 'off' : 'on'
  }

  _getNew() {
    return {
      onBack: this._handleBack,
      onDone: this._handleAdd
    }
  }

  _handleAdd(field) {
    this.setState({
      fields: [
        ...this.state.fields,
        field
      ]
    })
    this.context.form.pop()
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange() {
    const { fields, hidden } = this.state
    this.props.onChange({ fields, hidden })
  }

  _handleEdit(field, index) {
    this.context.form.push(Edit, this._getEdit(field, index))
  }

  _handleNew() {
    this.context.form.push(New, this._getNew())
  }

  _handleRemove(index) {
    this.setState({
      fields: this.state.fields.filter((field, i) => {
        return i !== index
      })
    })
  }

  _handleUpdate(index, newfield) {
    this.setState({
      fields: this.state.fields.map((field, i) => {
        return i === index ? newfield : field
      })
    })
    this.context.form.pop()
  }

  _handleToggle(name) {
    const { hidden } = this.state
    this.setState({
      hidden: _.xor(hidden, [name])
    })
  }

}

export default TicketFieldsField
