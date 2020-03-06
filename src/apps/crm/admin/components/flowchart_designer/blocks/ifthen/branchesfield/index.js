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
    defaultValue: PropTypes.object,
    lists: PropTypes.array,
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

  render() {
    const { branches } = this.state
    return (
      <div className="crm-workflow-branchesfield">
        { branches.map((branch, index) => (
          <div className="crm-workflow-branchesfield-branch" key={`branch_${index}`}>
            <div className="crm-workflow-branchesfield-branch-label">
              { branch.name }
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
    return {
      ...branch || {},
      onCancel: this._handleCancel,
      onDone: this._handleCreate
    }
  }

  _getCode() {
    return _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
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
        {
          code: this._getCode(),
          ...branch
        }
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
