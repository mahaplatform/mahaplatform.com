import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Field from './field'
import New from './new'
import _ from 'lodash'

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
    label: PropTypes.string,
    parent_type: PropTypes.string,
    parent_id: PropTypes.number,
    status: PropTypes.string,
    onFetch: PropTypes.func,
    onMove: PropTypes.func,
    onReorder: PropTypes.func
  }

  static defaultProps = {
    label: 'field'
  }

  state = {
    expanded: false
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleJoin = this._handleJoin.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleReorder = this._handleReorder.bind(this)
  _handleToggleDisabled = this._handleToggleDisabled.bind(this)

  render() {
    const { expanded } = this.state
    const { label } = this.props
    const active = this._getFields(true)
    const disabled = this._getFields(false)
    return (
      <div className="maha-fields">
        <div className="maha-fields-body">
          { active.map((field, index) => (
            <Field { ...this._getField(field, index) } key={`field_${field.id}`} />
          ))}
          { active.length === 0 &&
            <div className="maha-fields-empty">No { pluralize(label, 2) }</div>
          }
          { disabled.length > 0 &&
            <Fragment>
              <div className="maha-fields-disabled" onClick={ this._handleToggleDisabled }>
                <div className="maha-fields-disabled-icon">
                  <i className={`fa fa-chevron-${expanded ? 'down' : 'right'}`} />
                </div>
                <div className="maha-fields-disabled-label">
                  Disabled { pluralize(label, 2) }
                </div>
              </div>
              { expanded &&
                <Fragment>
                  { disabled.map((field, index) => (
                    <Field { ...this._getField(field, index) } key={`field_${field.id}`} />
                  ))}
                </Fragment>
              }
            </Fragment>
          }
        </div>
        <div className="maha-fields-footer">
          <div className="ui blue fluid button" onClick={ this._handleNew }>
            Add { _.capitalize(label) }
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

  _getFields(is_active) {
    const { fields } = this.props
    return fields.filter(field => {
      return field.is_active === is_active
    })
  }

  _getField(field, index) {
    const { endpoint, label, onMove } = this.props
    return {
      endpoint,
      field,
      index,
      label,
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

  _handleToggleDisabled() {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded
    })
  }

}

export default Fields
