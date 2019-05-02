import { Format, Loader, Message, ModalPanel, Searchbox } from 'reframe'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Unassigned from './unassigned'
import PropTypes from 'prop-types'
import Token from './token'
import React from 'react'

class Assignment extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    adding: PropTypes.bool,
    assigned: PropTypes.object,
    assignedEndpoint: PropTypes.string,
    assignedFormat: PropTypes.any,
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    empty: PropTypes.object,
    footer: PropTypes.any,
    ids: PropTypes.array,
    item: PropTypes.object,
    label: PropTypes.string,
    name: PropTypes.string,
    method: PropTypes.string,
    q: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    types: PropTypes.object,
    typesName: PropTypes.string,
    typesEndpoint: PropTypes.string,
    typesOptions: PropTypes.array,
    typesFormat: PropTypes.any,
    unassigned: PropTypes.object,
    unassignedEndpoint: PropTypes.string,
    unassignedFormat: PropTypes.any,
    value: PropTypes.string,
    valus: PropTypes.array,
    afterSave: PropTypes.func,
    onAdd: PropTypes.func,
    onBeginAdd: PropTypes.func,
    onChangeType: PropTypes.func,
    onFetchAssigned: PropTypes.func,
    onFetchUnassigned: PropTypes.func,
    onQuery: PropTypes.func,
    onRemove: PropTypes.func,
    onSetAssigned: PropTypes.func,
    onSetTypes: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    assignedFormat: Token,
    method: 'PATCH',
    text: 'title',
    typesFormat: Token,
    unassignedFormat: Token,
    value: 'id'
  }

  list = null

  _handleAdd = this._handleAdd.bind(this)
  _handleBeginAdd = this._handleBeginAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleChangeType = this._handleChangeType.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    const { assigned, assignedFormat, empty, footer, label, name, text, types, typesFormat, unassigned} = this.props
    return (
      <ModalPanel { ...this._getModalPanel() } >
        <div className={ this._getClass() }>
          <div className="maha-assignment-body">
            { assigned.status === 'loading' && <Loader /> }
            { assigned.status !== 'loading' &&
              <div className="maha-assignment-assigned">
                <div className="maha-assignment-add" onClick={ this._handleBeginAdd }>
                  Assign a { label }...
                </div>
                { assigned.records.length === 0 && <Message { ...empty } /> }
                { assigned.records.length > 0 &&
                  <div className="maha-assignment-list" ref={ node => this.list = node}>
                    <TransitionGroup>
                      { assigned.records.map((assignment, index) => (
                        <CSSTransition classNames="expanded" timeout={ 1000 } exit={ false } key={`assigned_${assignment[name].id}`}>
                          <div className="maha-assignment-item" >
                            <div className="maha-assignment-item-token">
                              <Format { ...assignment } format={ assignedFormat } text={ text } value={ assignment } />
                            </div>
                            { types.records.length > 0 &&
                              <div className="maha-assignment-item-extra" onClick={ this._handleChangeType.bind(this, index) }>
                                <Format { ...assignment } format={ typesFormat } text={ text } value={ assignment } />
                              </div>
                            }
                            <div className="maha-assignment-item-icon" onClick={ this._handleRemove.bind(this, index) }>
                              <i className="fa fa-fw fa-times" />
                            </div>
                          </div>
                        </CSSTransition>
                      ))}
                    </TransitionGroup>
                  </div>
                }
              </div>
            }
            <div className="maha-assignment-unassigned">
              <div className="maha-assignment-unassigned-header">
                <Searchbox { ...this._getSearchbox() } />
              </div>
              <div className="maha-assignment-unassigned-body">
                { unassigned.status === 'loading' && <Loader /> }
                { unassigned.status === 'success' &&
                  <Unassigned { ...this._getUnassigned() } />
                }
              </div>
            </div>
          </div>
          { footer &&
            <div className="maha-assignment-footer">
              { footer }
            </div>
          }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { assignedEndpoint, defaultValue, typesOptions, unassignedEndpoint, onFetchAssigned, onFetchUnassigned, onSetAssigned, onSetTypes } = this.props
    if(typesOptions) onSetTypes(typesOptions)
    onFetchUnassigned(unassignedEndpoint)
    if(defaultValue) onSetAssigned(defaultValue)
    if(!defaultValue) onFetchAssigned(assignedEndpoint)
  }

  componentDidUpdate(prevProps) {
    const { assigned } = this.props
    const { modal } = this.context
    if(assigned.records.length > prevProps.assigned.records.length) {
      if(assigned.status === prevProps.assigned.status) {
        this.list.scrollTop = this.list.scrollHeight
      }
    }
    if(assigned.status !== prevProps.assigned.status && assigned.status === 'saved') {
      modal.close()
    }
  }

  _getModalPanel() {
    const { title } = this.props
    return {
      title,
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Save', handler: this._handleSave }
      ]
    }
  }

  _getClass() {
    const { adding } = this.props
    const classes = ['maha-assignment']
    if(adding) classes.push('adding')
    return classes.join(' ')
  }

  _getSearchbox() {
    const { label } = this.props
    return {
      prompt: `Find a ${label}`,
      onChange: this.props.onQuery
    }
  }

  _getUnassigned() {
    const { text, unassigned, unassignedFormat, value } = this.props
    return {
      text,
      unassigned,
      value,
      format: unassignedFormat,
      onChoose: this._handleAdd
    }
  }

  _handleAdd(item) {
    const { name, types, typesName } = this.props
    const assignment = types.records.length > 0 ? {
      [name]: item,
      [typesName]: types.records[0].value
    } : {
      user: item
    }
    this.props.onAdd(assignment)
  }

  _handleBeginAdd() {
    this.props.onBeginAdd()
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeType(index) {
    const { typesName } = this.props
    this.props.onChangeType(typesName, index)
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleSave() {
    const { action, values, onSave } = this.props
    onSave(action, values)
  }

}

export default Assignment
