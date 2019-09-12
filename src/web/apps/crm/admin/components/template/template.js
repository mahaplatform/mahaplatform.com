import { Button, Loader } from 'maha-admin'
import Designer from '../designer'
import PropTypes from 'prop-types'
import Preview from './preview'
import React from 'react'

class Template extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    page: PropTypes.object,
    status: PropTypes.string,
    onFetch: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleChange = this._handleChange.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    const { status } = this.props
    if(status !== 'success') return <Loader />
    return (
      <div className="template">
        <div className="template-body">
          <Designer { ...this._getDesigner() } / >
        </div>
        <div className="template-footer">
          <Button { ...this._getPreview() } />
          <Button { ...this._getSave() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { page } = this.props
    const { program_id, id } = page.params
    this.props.onFetch(program_id, id)
  }

  _getDesigner() {
    const { config } = this.props
    return {
      defaultValue: config,
      onChange: this._handleChange
    }
  }

  _getPreview() {
    const { config, page } = this.props
    const { program_id, id } = page.params
    return {
      label: 'Preview',
      className: 'ui button',
      modal: <Preview program_id={ program_id } id={ id } config={ config } />
    }
  }

  _getSave() {
    return {
      label: 'Save',
      handler: this._handleSave,
      className: 'ui red button'
    }
  }

  _handleChange(config) {
    this.props.onUpdate(config)
  }

  _handleSave() {
    const { config, page } = this.props
    const { program_id, id } = page.params
    this.props.onSave(program_id, id, config)
  }

}

export default Template
