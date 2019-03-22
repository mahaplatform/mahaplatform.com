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
    fields: PropTypes.array,
    parent_type: PropTypes.string,
    parent_id: PropTypes.string,
    status: PropTypes.string,
    onFetch: PropTypes.func,
    onMove: PropTypes.func,
    onReorder: PropTypes.func
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleJoin = this._handleJoin.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleNew = this._handleNew.bind(this)

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
    const { parent_type, parent_id, onMove, onReorder } = this.props
    return {
      field,
      index,
      parent_type,
      parent_id,
      onMove,
      onReorder
    }
  }

  _handleFetch() {
    const { parent_type, parent_id, onFetch } = this.props
    onFetch(parent_type, parent_id)
  }

  _handleJoin() {
    const { network } = this.context
    const { parent_type, parent_id } = this.props
    network.join(`/admin/${parent_type}/${parent_id}/fields`)
    network.subscribe([
      { target: `/admin/${parent_type}/${parent_id}/fields`, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { parent_type, parent_id } = this.props
    network.leave(`/admin/${parent_type}/${parent_id}/fields`)
    network.unsubscribe([
      { target: `/admin/${parent_type}/${parent_id}/fields`, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleNew() {
    const { datasources, parent_type, parent_id } = this.props
    this.context.modal.push(<New parent_type={ parent_type } parent_id={ parent_id } datasources={ datasources } />)
  }

}

export default Fields
