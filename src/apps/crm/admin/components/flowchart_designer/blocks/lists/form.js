import { Container, ModalPanel, RadioGroup, Search } from 'maha-admin'
import { actions } from './variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Lists extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    lists: PropTypes.array,
    workflow: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleAction = this._handleAction.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  constructor(props) {
    super(props)
    const { config } = props
    this.state = {
      action: config ? config.action : null,
      list: config ? config.list : null
    }
  }

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="flowchart-designer-form">
          <div className="flowchart-designer-form-header">
            <RadioGroup { ...this._getRadioGroup() } />
          </div>
          <div className="flowchart-designer-form-body">
            <Search { ...this._getSearch() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { action, list } = this.state
    if(action !== prevState.action) {
      this._handleChange()
    }
    if(!_.isEqual(list, prevState.list)) {
      this._handleChange()
    }
  }

  _getPanel() {
    return {
      title: 'Update Lists',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleDone }
      ],
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ]
    }
  }

  _getRadioGroup() {
    const { action } = this.state
    return {
      defaultValue: action || actions[0].value,
      options: actions,
      onChange: this._handleAction
    }
  }

  _getSearch() {
    const { lists } = this.props
    const { list } = this.state
    return {
      options: lists,
      multiple: false,
      text: 'title',
      search: false,
      value: 'id',
      defaultValue: list ? list.id : null,
      onChange: this._handleUpdate
    }
  }

  _handleChange(config) {
    const { action, list } = this.state
    const value = list ? { action, list } : {}
    this.props.onChange(value)
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleAction(action) {
    this.setState({ action })
  }

  _handleUpdate(id) {
    const { lists } = this.props
    if(!id) return this.setState({ list: null })
    const list = _.find(lists, { id })
    this.setState({
      list: {
        id: list.id,
        title: list.title
      }
    })
  }

}

const mapResources = (props, context) => ({
  lists: `/api/admin/crm/programs/${props.workflow.program.id}/lists`
})

export default Container(mapResources)(Lists)
