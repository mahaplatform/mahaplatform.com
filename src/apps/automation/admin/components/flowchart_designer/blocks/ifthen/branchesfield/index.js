import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import Branch from './branch'
import React from 'react'
import _ from 'lodash'

class BranchesField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    defaultValue: PropTypes.array,
    fields: PropTypes.array,
    lists: PropTypes.array,
    originalValue: PropTypes.array,
    workflow: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    branches: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { branches } = this.state
    return (
      <div className="crm-workflow-branchesfield">
        { branches.map((branch, index) => (
          <div className="crm-workflow-branchesfield-branch" key={`branch_${index}`}>
            <div className="crm-workflow-branchesfield-branch-label">
              <input { ...this._getInput(branch, index) } />
            </div>
            <Button { ...this._getEditButton(branch) } />
            <Button { ...this._getRemoveButton(branch.code) } />
          </div>
        )) }
        <div className="crm-workflow-branchesfield-branch-add">
          <Button { ...this._getAddButton() } />
        </div>
      </div>
    )
  }

  _getInput(branch, index) {
    return {
      type: 'textfield',
      placeholder: 'Enter a name for this branch',
      value: branch.name,
      onChange: this._handleUpdateName.bind(this, index)
    }
  }

  _handleUpdateName(index, e) {
    const { branches } = this.state
    this.setState({
      branches: branches.map((branch, i) => {
        if(i !== index) return branch
        return {
          ...branch,
          name: e.target.value
        }
      })
    })
  }


  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      branches: defaultValue
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { branches } = this.state
    if(!_.isEqual(branches, prevState.branches)) {
      this.props.onChange(branches)
    }
  }

  _getAddButton() {
    return {
      label: 'Add Branch',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getBranch(branch) {
    const { fields } = this.props
    return {
      branch: branch || {},
      fields,
      onCancel: this._handleCancel,
      onDone: branch ? this._handleUpdate : this._handleCreate
    }
  }

  _getEditButton(branch) {
    return {
      icon: 'pencil',
      className: 'crm-workflow-branchesfield-branch-action',
      handler: this._handleEdit.bind(this, branch)
    }
  }

  _getRemoveButton(code) {
    return {
      icon: 'times',
      className: 'crm-workflow-branchesfield-branch-action',
      confirm: 'Are you sure you want to delete this branch? All steps within this branch will be deleted as well.',
      handler: this._handleRemove.bind(this, code)
    }
  }

  _handleAdd() {
    this.context.form.push(Branch, this._getBranch())
  }

  _handleCreate(branch) {
    const { branches } = this.state
    this.setState({
      branches: [
        ...branches,
        branch
      ]
    })
    this.context.form.pop()
  }

  _handleUpdate(config) {
    const { branches } = this.state
    this.setState({
      branches: [
        ...branches.map(branch => {
          return (branch.code === config.code) ? config : branch
        })
      ]
    })
    this.context.form.pop()
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleEdit(branch) {
    this.context.form.push(Branch, this._getBranch(branch))
  }

  _handleRemove(code) {
    const { branches } = this.state
    this.setState({
      branches: branches.filter(branch => {
        return branch.code !== code
      })
    })
  }

}

export default BranchesField
