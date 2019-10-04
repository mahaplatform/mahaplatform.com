import { Loader } from 'maha-admin'
import Designer from '../designer'
import PropTypes from 'prop-types'
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

  _handleSave = this._handleSave.bind(this)

  render() {
    const { status } = this.props
    if(status !== 'success') return <Loader />
    return <Designer { ...this._getDesigner() } / >
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
      onSave: this._handleSave
    }
  }

  _handleSave(config) {
    const { page } = this.props
    const { program_id, id } = page.params
    this.props.onSave(program_id, id, config)
  }

}

export default Template
