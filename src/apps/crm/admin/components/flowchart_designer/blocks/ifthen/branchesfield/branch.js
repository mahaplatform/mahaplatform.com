import { Criteria, ModalPanel, TextField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Branch extends React.PureComponent {

  static propTypes = {
    criteria: PropTypes.array,
    fields: PropTypes.array,
    name: PropTypes.string,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    name: null,
    criteria: []
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
    const { name, criteria } = this.props
    this.setState({ name, criteria })
  }

  _getCriteria() {
    const { criteria } = this.state
    const { fields } = this.props
    return {
      defaultValue: criteria,
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
    const { name } = this.state
    return {
      defaultValue: name,
      placeholder: 'Enter a name for this branch',
      onChange: this._handleChange.bind(this, 'name')
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  _handleDone() {
    this.props.onDone(this.state)
  }

}

export default Branch
