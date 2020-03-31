import TicketTypeToken from '../../tokens/ticket_type'
import { Button } from 'maha-admin'
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
  _handleNew = this._handleNew.bind(this)

  render() {
    const { ticket_types } = this.state
    return (
      <div className="tickettypesfield">
        <div className="tickettypesfield-tickettypes">
          { ticket_types.map((ticket_type, index) => (
            <div className="tickettypesfield-tickettype" key={`ticket_type_${index}`}>
              <div className="tickettypesfield-tickettype-token">
                <TicketTypeToken { ...ticket_type } />
              </div>
              <div className="tickettypesfield-tickettype-action" onClick={ this._handleEdit.bind(this, ticket_type, index )}>
                <i className="fa fa-pencil" />
              </div>
              <div className="tickettypesfield-tickettype-action" onClick={ this._handleRemove.bind(this, index )}>
                <i className="fa fa-times" />
              </div>
            </div>
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

  _handleNew() {
    this.context.form.push(<New { ...this._getNew() } />)
  }

  _handleRemove(index) {
    this.setState({
      ticket_types: [
        ...this.state.ticket_types.filter((ticket_type, i) => {
          return i !== index
        })
      ]
    })
  }

  _handleUpdate(index, newtickettype) {
    this.setState({
      ticket_types: [
        ...this.state.ticket_types.map((ticket_type, i) => {
          return i === index ? newtickettype : ticket_type
        })
      ]
    })
    this.context.form.pop()
  }

}


export default TicketTypesField
