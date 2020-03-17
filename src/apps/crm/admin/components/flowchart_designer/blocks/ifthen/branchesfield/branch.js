import { Criteria, ModalPanel, TextField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Branch extends React.PureComponent {

  static propTypes = {
    branch: PropTypes.object,
    fields: PropTypes.array,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    branch: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-workflow-branchesfield-form">
          <div className="crm-workflow-branchesfield-form-header">
            Name<br />
            <TextField {...this._getTextField() } />
          </div>
          <div className="crm-workflow-branchesfield-form-body">
            <Criteria {...this._getCriteria() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.setState({
      branch: {
        ...this._getDefault(),
        ...this.props.branch || {}
      }
    })
  }

  _getDefault() {
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      name: '',
      criteria: null
    }
  }

  _getCriteria() {
    const { branch } = this.state
    const { fields } = this.props
    return {
      defaultValue: branch.criteria,
      fields,
      onChange: this._handleChange.bind(this, 'criteria')
    }
  }

  _getPanel() {
    return {
      title: 'Branch',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      buttons: [
        { label: 'Save', color: 'red', handler: this._handleDone }
      ]
    }
  }

  _getTextField() {
    const { branch } = this.state
    return {
      defaultValue: branch.name,
      placeholder: 'Enter a name for this branch',
      onChange: this._handleChange.bind(this, 'name')
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(key, value) {
    const { branch } = this.state
    this.setState({
      branch: {
        ...branch,
        [key]: value
      }
    })
  }

  _handleDone() {
    const { branch } = this.state
    this.props.onDone(branch)
  }

}

export default Branch
