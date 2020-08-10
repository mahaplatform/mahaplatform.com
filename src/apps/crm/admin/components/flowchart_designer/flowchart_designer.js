import ImportToken from '../../../../maha/admin/tokens/import'
import ListCriteria from '../listcriteria'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import blocks from './blocks'
import React from 'react'
import _ from 'lodash'

class FlowchartDesigner extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    blocks: PropTypes.array,
    campaign: PropTypes.object,
    changes: PropTypes.number,
    cid: PropTypes.string,
    config: PropTypes.array,
    defaultValue: PropTypes.array,
    editable: PropTypes.bool,
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    hovering: PropTypes.object,
    program: PropTypes.object,
    properties: PropTypes.array,
    status: PropTypes.string,
    steps: PropTypes.array,
    step: PropTypes.object,
    stepTokens: PropTypes.array,
    tokens: PropTypes.array,
    workflow: PropTypes.object,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onHover: PropTypes.func,
    onNewStep: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    editable: true,
    fields: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleHover = _.throttle(this._handleHover.bind(this), 100)
  _handleNew = this._handleNew.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    const { editable } = this.props
    return (
      <div className="flowchart-designer">
        <div className="flowchart-designer-main">
          <div className="flowchart-designer-canvas">
            <Canvas { ...this._getCanvas() } />
          </div>
        </div>
        { editable &&
          <div className="flowchart-designer-sidebar">
            <Sidebar { ...this._getSidebar() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onSet(this.props.defaultValue)
  }

  _getBlocks() {
    const { program } = this.props
    return this.props.blocks.map(block => ({
      ...block,
      ...blocks[block.action]
    })).filter(({ action, type }) => {
      if(type === 'communication' && action === 'sms') return program.phone_number !== null
      return true
    })
  }

  _getCanvas() {
    const { active, config, editable, fields, hovering, onEdit, onRemove } = this.props
    return {
      active,
      blocks: this._getBlocks(),
      boxes: config,
      editable,
      fields,
      hovering,
      onAdd: this._handleAdd,
      onEdit,
      onHover: this._handleHover,
      onNew: this._handleNew,
      onRemove
    }
  }

  _getFields() {
    const { fields, program, workflow } = this.props
    return [
      { label: 'Contact', fields: [
        { name: 'First Name', key: 'contact.first_name', type: 'textfield' },
        { name: 'Last Name', key: 'contact.last_name', type: 'textfield' },
        { name: 'Email', key: 'contact.email', type: 'emailfield' },
        { name: 'Phone', key: 'contact.phone', type: 'phonefield' },
        { name: 'Address', key: 'contact.address', type: 'addressfield' },
        { name: 'Birthday', key: 'contact.birthday', type: 'textfield' },
        { name: 'Spouse', key: 'contact.spouse', type: 'textfield' }
      ] },
      ...fields ? fields : [],
      { label: 'Classifications', fields: [
        { name: 'List', key: 'contact.list_ids', type: ListCriteria, endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
          { value: '$ct', text: 'is subscribed to' },
          { value: '$nct', text: 'is not subscribed to' }
        ] },
        { name: 'Oraganizations', key: 'contact.organization_ids', type: 'textfield' },
        { name: 'Topic', key: 'contact.topic_ids', type: ListCriteria, endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
          { value: '$ct', text: 'is interested in' },
          { value: '$nct', text: 'is not interested in' }
        ] }
      ] },
      { label: 'Activities', fields: [
        { name: 'Email Campaigns', key: 'contact.email_campaigns', type: 'select', endpoint: '/api/admin/crm/campaigns/email', filter:  { program_id: { $eq: program.id } }, text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
          { text: 'was sent the email', value: '$se' },
          { text: 'was not sent the email', value: '$nse' },
          { text: 'received the email', value: '$de' },
          { text: 'did not received the email', value: '$nde' },
          { text: 'opened the email', value: '$op' },
          { text: 'did not open the email', value: '$nop' },
          { text: 'clicked the email', value: '$ck' },
          { text: 'did not click the email', value: '$nck' }
        ] },
        { name: 'Event', key: 'contact.event_ids', type: ListCriteria, endpoint: '/api/admin/events/events', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
          { value: '$ct', text: 'registered for' },
          { value: '$nct', text: 'did not registered for' }
        ] },
        { name: 'Form', key: 'contact.form_ids', type: ListCriteria, endpoint: '/api/admin/crm/forms', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
          { value: '$ct', text: 'filled out' },
          { value: '$nct', text: 'did not fill out' }
        ] },
        { name: 'Import', key: 'contact.import_ids', type: 'select', endpoint: '/api/admin/crm/imports', filter:  { stage: { $eq: 'complete' } }, text: 'description', value: 'id', multiple: false, subject: false, format: ImportToken, comparisons: [
          { value: '$ct', text: 'was included in import' },
          { value: '$nct', text: 'was not included in import' }
        ] },
        { name: 'Workflow Emails', key: 'contact.workflow_emails', type: 'select', endpoint: `/api/admin/crm/workflows/${workflow.id}/emails`, text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
          { text: 'was sent the email', value: '$se' },
          { text: 'was not sent the email', value: '$nse' },
          { text: 'received the email', value: '$de' },
          { text: 'did not received the email', value: '$nde' },
          { text: 'opened the email', value: '$op' },
          { text: 'did not open the email', value: '$nop' },
          { text: 'clicked the email', value: '$ck' },
          { text: 'did not click the email', value: '$nck' }
        ] }
      ] },
      { label: 'Environment', fields: [
        { name: 'Day', key: 'environment.day', type: 'date' },
        // { name: 'Time', key: 'environment.time', type: 'time' }
      ] }
    ]
  }

  _getProperties() {
    const { properties } = this.props
    return [
      { label: 'Contact', fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield' },
        { label: 'Last Name', name: 'last_name', type: 'textfield' },
        { label: 'Email', name: 'email', type: 'emailfield' },
        { label: 'Phone', name: 'phone', type: 'phonefield' },
        { label: 'Address', name: 'address', type: 'addressfield' },
        { label: 'Birthday', name: 'birthday', type: 'textfield' },
        { label: 'Spouse', name: 'spouse', type: 'textfield' }
      ] },
      ...properties ? properties : []
    ]
  }

  _getSidebar() {
    const { active, campaign, changes, cid, program } = this.props
    const { status, steps, step, workflow, onEdit, onUpdate } = this.props
    return {
      active,
      blocks: this._getBlocks(),
      campaign,
      changes,
      cid,
      fields: this._getFields(),
      program,
      properties: this._getProperties(),
      status,
      steps,
      step,
      tokens: this._getTokens(),
      workflow,
      onAdd: this._handleAdd,
      onEdit,
      onNew: this._handleNew,
      onSave: this._handleSave,
      onUpdate
    }
  }

  _getStatus() {
    const { status } = this.props
    if(status === 'draft') {
      return 'This workflow is in draft mode'
    } else if(status === 'scheduled') {
      return 'This workflow is scheduled'
    } else if(status === 'sent') {
      return 'This workflow has been executed'
    } else if(status === 'active') {
      return 'This workflow is active'
    } else if(status === 'inactive') {
      return 'This workflow has been deactivated'
    }
  }

  _getTokens() {
    const { tokens } = this.props
    return [
      { title: 'Contact', tokens: [
        { name: 'Full Name', token: 'contact.full_name' },
        { name: 'First Name', token: 'contact.first_name' },
        { name: 'Last Name', token: 'contact.last_name' },
        { name: 'Primary Email', token: 'contact.email' },
        { name: 'Primary Phone', token: 'contact.phone' },
        { name: 'Primary Address', token: 'contact.address' },
        { name: 'Birthday', token: 'contact.birthday' },
        { name: 'Spouse', token: 'contact.spouse' },
        { name: 'Maha URL', token: 'contact.maha_url' }
      ] },
      ...tokens ? tokens : []
    ]
  }

  _handleNew(parent, answer, delta) {
    this.props.onNewStep(parent, answer, delta)
  }

  _handleAdd(type, action, parent, answer, delta, config) {
    const { onAdd } = this.props
    const search = action ? { type, action } : { type }
    const blocks = this._getBlocks()
    const block = _.find(blocks, search)
    onAdd({
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      type: block.type,
      action: block.action,
      delta: parent ? delta : delta - 1,
      parent,
      answer,
      config
    })
  }

  _handleHover(hovering) {
    this.props.onHover(hovering)
  }

  _handleSave() {
    const { endpoint, steps, onSave } = this.props
    onSave(endpoint, steps)
  }

}

export default FlowchartDesigner
