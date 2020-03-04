import { Container, ModalPanel, Search } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class EnrollInWorkflow extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    workflows: PropTypes.array,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  state = {
    workflow: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  constructor(props) {
    super(props)
    const { config } = props
    this.state = {
      workflow: config ? config.workflow : null
    }
  }

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="flowchart-designer-form">
          <div className="flowchart-designer-form-body">
            <Search { ...this._getSearch() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { workflow } = this.state
    if(!_.isEqual(workflow, prevState.workflow)) {
      this._handleChange()
    }
  }

  _getPanel() {
    return {
      title: 'Enroll in Manual Workflow',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleDone }
      ],
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ]
    }
  }

  _getSearch() {
    const { workflows } = this.props
    const { workflow } = this.state
    return {
      options: workflows,
      multiple: false,
      text: 'title',
      search: false,
      value: 'id',
      defaultValue: workflow ? workflow.id : null,
      onChange: this._handleUpdate
    }
  }

  _handleChange(config) {
    const { workflow } = this.state
    const value = workflow ? { workflow } : {}
    this.props.onChange(value)
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleUpdate(id) {
    const { workflows } = this.props
    if(!id) return this.setState({ workflow: null })
    const workflow = _.find(workflows, { id })
    this.setState({
      workflow: {
        id: workflow.id,
        title: workflow.title
      }
    })
  }

}

const mapResources = (props, context) => ({
  workflows: {
    endpoint: '/api/admin/crm/workflows',
    filter: {
      $and: [
        { program_id: { $eq: props.workflow.program.id } },
        { trigger_type: { $eq: 'manual' } },
        { id: { $neq: props.workflow.id } }
      ]
    }
  }
})

export default Container(mapResources)(EnrollInWorkflow)
