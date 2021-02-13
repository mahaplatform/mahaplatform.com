import ListCriteria from '@apps/crm/admin/components/listcriteria'
import ImportToken from '@apps/maha/admin/tokens/import'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import blocks from './blocks'
import React from 'react'
import _ from 'lodash'

class FlowchartDesigner extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

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
    entity: PropTypes.string,
    expanded: PropTypes.array,
    fields: PropTypes.array,
    hovering: PropTypes.object,
    program: PropTypes.object,
    properties: PropTypes.array,
    status: PropTypes.string,
    steps: PropTypes.array,
    step: PropTypes.object,
    stepTokens: PropTypes.array,
    tokens: PropTypes.array,
    version: PropTypes.object,
    versions: PropTypes.array,
    workflow: PropTypes.object,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onExpand: PropTypes.func,
    onFetch: PropTypes.func,
    onHover: PropTypes.func,
    onNewStep: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onSetVersion: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    editable: true,
    fields: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleHover = _.throttle(this._handleHover.bind(this), 100)
  _handleNew = this._handleNew.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    const { editable, version } = this.props
    if(!version) return null
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
    this._handleFetch()
    this._handleJoin()
  }

  componentDidUpdate(prevProps) {
    const { changes } = this.props
    if(changes > prevProps.changes) {
      this._handleSave()
    }
  }

  componentWillUnmount() {
    this._handleLeave()
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
    const { active, config, editable, entity, expanded, fields, hovering, version, onEdit, onExpand, onRemove } = this.props
    return {
      active,
      blocks: this._getBlocks(),
      boxes: config,
      editable,
      entity,
      expanded,
      fields,
      hovering,
      version,
      onAdd: this._handleAdd,
      onEdit,
      onExpand,
      onHover: this._handleHover,
      onNew: this._handleNew,
      onRemove
    }
  }

  _getFields() {
    const { fields, program } = this.props
    return [
      { label: 'Contact', fields: [
        { name: 'First Name', key: 'contact.first_name', type: 'textfield' },
        { name: 'Last Name', key: 'contact.last_name', type: 'textfield' },
        { name: 'Email', key: 'contact.email', type: 'emailfield' },
        { name: 'Phone', key: 'contact.phone', type: 'phonefield' },
        { name: 'Address', key: 'contact.address', type: 'addressfield' },
        { name: 'Organization', key: 'contact.organization', type: 'textfield' },
        { name: 'Position', key: 'contact.position', type: 'textfield' },
        { name: 'Birthday', key: 'contact.birthday', type: 'textfield' },
        { name: 'Spouse', key: 'contact.spouse', type: 'textfield' }
      ] },
      ...fields ? fields : [],
      { label: 'Classifications', fields: [
        { name: 'List', key: 'contact.list_ids', type: ListCriteria, endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
          { value: '$ct', text: 'is subscribed to' },
          { value: '$nct', text: 'is not subscribed to' }
        ] },
        { name: 'Topic', key: 'contact.topic_ids', type: ListCriteria, endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
          { value: '$ct', text: 'is interested in' },
          { value: '$nct', text: 'is not interested in' }
        ] }
      ] },
      { label: 'Activities', fields: [
        { name: 'Email Campaigns', key: 'contact.email_campaigns', type: 'select', endpoint: '/api/admin/campaigns/email', filter:  { program_id: { $eq: program.id } }, text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
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
        { name: 'Form', key: 'contact.form_ids', type: ListCriteria, endpoint: '/api/admin/forms/forms', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
          { value: '$ct', text: 'filled out' },
          { value: '$nct', text: 'did not fill out' }
        ] },
        { name: 'Import', key: 'contact.import_ids', type: 'select', endpoint: '/api/admin/crm/imports', filter:  { stage: { $eq: 'complete' } }, text: 'description', value: 'id', multiple: false, subject: false, format: ImportToken, comparisons: [
          { value: '$ct', text: 'was included in import' },
          { value: '$nct', text: 'was not included in import' }
        ] },
        { name: 'Workflow Emails', key: 'contact.workflow_emails', type: 'select', endpoint: this._getWorkflowEmailsEndpoint(), text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
          { text: 'was sent the email', value: '$se' },
          { text: 'was not sent the email', value: '$nse' },
          { text: 'received the email', value: '$de' },
          { text: 'did not received the email', value: '$nde' },
          { text: 'opened the email', value: '$op' },
          { text: 'did not open the email', value: '$nop' },
          { text: 'clicked the email', value: '$ck' },
          { text: 'did not click the email', value: '$nck' }
        ] }
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
    const { active, campaign, changes, cid, entity, program } = this.props
    const { status, steps, step, versions, version, workflow, onEdit, onSetVersion, onUpdate } = this.props
    return {
      active,
      blocks: this._getBlocks(),
      campaign,
      changes,
      cid,
      entity,
      fields: this._getFields(),
      program,
      properties: this._getProperties(),
      status,
      steps,
      step,
      tokens: this._getTokens(),
      version,
      versions,
      workflow,
      onAdd: this._handleAdd,
      onEdit,
      onNew: this._handleNew,
      onSetVersion,
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

  _getWorkflowEmailsEndpoint() {
    const { campaign, workflow } = this.props
    if(campaign) return `/api/admin/campaigns/${campaign.type}/${campaign.id}/emails`
    if(workflow) return `/api/admin/automation/workflows/${workflow.id}/emails`
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

  _handleFetch() {
    const { entity } = this.props
    this.props.onFetch(entity)
  }

  _handleHover(hovering) {
    this.props.onHover(hovering)
  }

  _handleJoin() {
    const { network } = this.context
    const { entity } = this.props
    const target = `/admin/${entity}/config/versions`
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { entity } = this.props
    const target = `/admin/${entity}/config/versions`
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleSave() {
    const { entity, version } = this.props
    this.props.onSave(entity, version.value.steps)
  }

}

export default FlowchartDesigner
