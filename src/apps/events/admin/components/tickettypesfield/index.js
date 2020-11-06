import TicketType from './ticket_type'
import { Button } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
import New from './new'
import _ from 'lodash'

class TicketTypesField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    ticket_types: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleMove = this._handleMove.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { ticket_types } = this.state
    return (
      <div className="tickettypesfield">
        <div className="tickettypesfield-tickettypes">
          { ticket_types.sort((a,b) => {
            return a.delta > b.delta ? 1 : -1
          }).map((ticket_type, index) => (
            <TicketType { ...this._getTicketType(ticket_type, index) } key={`ticket_type_${index}`} />
          )) }
        </div>
        <div className="tickettypesfield-add">
          <Button { ...this._getAddButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) {
      this.setState({
        ticket_types: defaultValue
      })
    }
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { ticket_types } = this.state
    if(!_.isEqual(ticket_types, prevState.ticket_types)) {
      this.props.onChange(ticket_types)
    }
  }

  _getAddButton() {
    return {
      label: 'Add a ticket type',
      className: 'link',
      handler: this._handleNew
    }
  }

  _getEdit(ticket_type, index) {
    return {
      ticket_type,
      onBack: this._handleBack,
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _getNew() {
    return {
      onBack: this._handleBack,
      onDone: this._handleAdd
    }
  }

  _getTicketType(ticket_type, index) {
    return {
      index,
      ticket_type,
      onEdit: this._handleEdit.bind(this, ticket_type, index),
      onMove: this._handleMove,
      onRemove: this._handleRemove.bind(this, ticket_type, index)
    }
  }

  _handleAdd(ticket_type) {
    this.setState({
      ticket_types: [
        ...this.state.ticket_types,
        ticket_type
      ]
    })
    this.context.form.pop()
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleEdit(ticket_type, index) {
    this.context.form.push(<Edit { ...this._getEdit(ticket_type, index) } />)
  }

  _handleMove(from, to) {
    const { ticket_types } = this.state
    this.setState({
      ticket_types: ((from < to) ? [
        ...ticket_types.slice(0, from),
        ...ticket_types.slice(from + 1, to + 1),
        ticket_types[from],
        ...ticket_types.slice(to + 1)
      ] : [
        ...ticket_types.slice(0, to),
        ticket_types[from],
        ...ticket_types.slice(to, from),
        ...ticket_types.slice(from + 1)
      ]).map((question, index) => ({
        ...question,
        delta: index
      }))
    })
  }

  _handleNew() {
    this.context.form.push(<New { ...this._getNew() } />)
  }

  _handleRemove(ticket_type, index) {
    const ticket_types = ticket_type.id ? this.state.ticket_types.map((ticket_type, i) => ({
      ...ticket_type,
      is_active: i === index ? !ticket_type.is_active : ticket_type.is_active
    })) : this.state.ticket_types.filter((ticket_type, i) => {
      return i !== index
    })
    this.setState({
      ticket_types: ticket_types.map((question, index) => ({
        ...question,
        delta: index
      }))
    })
  }

  _handleUpdate(index, newtickettype) {
    this.setState({
      ticket_types: ([
        ...this.state.ticket_types.map((ticket_type, i) => {
          return i === index ? newtickettype : ticket_type
        })
      ]).map((question, index) => ({
        ...question,
        delta: index
      }))
    })
    this.context.form.pop()
  }

}

export default TicketTypesField
