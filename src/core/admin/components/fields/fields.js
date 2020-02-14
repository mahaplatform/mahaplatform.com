import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'
import New from './new'

class Fields extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    datasources: PropTypes.array,
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    parent_type: PropTypes.string,
    parent_id: PropTypes.number,
    status: PropTypes.string,
    onFetch: PropTypes.func,
    onMove: PropTypes.func,
    onReorder: PropTypes.func
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleJoin = this._handleJoin.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleReorder = this._handleReorder.bind(this)

  render() {
    const { fields } = this.props
    return (
      <div className="maha-fields">
        { fields.map((field, index) => (
          <Field { ...this._getField(field, index) } key={`field_${field.id}`} />
        ))}
        { fields.length === 0 &&
          <div className="maha-fields-empty">No fields</div>
        }
        <div className="maha-fields-footer">
          <div className="ui blue fluid button" onClick={ this._handleNew }>
            Add Field
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch()
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getEmpty() {
    const { parent_type, parent_id } = this.props
    return {
      icon: 'check-square-o',
      title: 'No fields',
      text: 'There are no fields for this content type',
      button: {
        label: 'Add Field',
        modal: () => <New parent_type={ parent_type } parent_id={ parent_id } />
      }
    }
  }

  _getField(field, index) {
    const { endpoint, onMove } = this.props
    return {
      field,
      index,
      endpoint,
      onMove,
      onReorder: this._handleReorder
    }
  }

  _handleFetch() {
    const { endpoint, onFetch } = this.props
    onFetch(endpoint)
  }

  _handleJoin() {
    const { network } = this.context
    const { endpoint } = this.props
    const target = endpoint.replace('/api', '')
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { endpoint } = this.props
    const target = endpoint.replace('/api', '')
    network.leave(target)
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleNew() {
    const { datasources, endpoint } = this.props
    this.context.modal.push(<New action={ endpoint } datasources={ datasources } />)
  }

  _handleReorder(from, to) {
    const { endpoint, onReorder } = this.props
    onReorder(endpoint, from, to)
  }

}

export default Fields
